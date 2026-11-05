/**
 * Google AI Plus Portal — WebGL Bayer-8 Dither Glow Canvas
 * Implements the authentic dithercn.dev "dither-glow" background shader with dynamic
 * position ("top", "bottom", "center"), radius, and intensity props.
 * Zero external dependencies, 60fps performance, 0% idle CPU via IntersectionObserver.
 */

export function initDitherCanvas(): void {
	const canvas = document.getElementById("dither-canvas") as HTMLCanvasElement | null;
	if (!canvas) return;

	const gl = (canvas.getContext("webgl", {
		alpha: false,
		antialias: false,
		powerPreference: "low-power",
	}) ||
		canvas.getContext("experimental-webgl", {
			alpha: false,
			antialias: false,
		})) as WebGLRenderingContext | null;

	if (!gl) {
		// Fallback: graceful degradation, canvas stays transparent
		return;
	}

	// Read configurable options from canvas dataset
	const posStr = (canvas.dataset.position || "top").toLowerCase();
	const radius = Number.parseFloat(canvas.dataset.radius || "0.68") || 0.68;
	const intensity = Number.parseFloat(canvas.dataset.intensity || "0.75") || 0.75;

	// Coordinate mapping matching dithercn.dev POSITIONS
	let glowCenterX = 0.5;
	let glowCenterY = -0.05; // "top" default

	if (posStr === "bottom") {
		glowCenterY = 1.05;
	} else if (posStr === "center") {
		glowCenterY = 0.5;
	} else if (posStr.includes(",")) {
		const parts = posStr.split(",").map((p) => Number.parseFloat(p.trim()));
		if (parts.length === 2 && !Number.isNaN(parts[0]) && !Number.isNaN(parts[1])) {
			glowCenterX = parts[0];
			glowCenterY = parts[1];
		}
	}

	// Generate 8x8 Bayer matrix threshold texture (bayer8 rank algorithm)
	const size = 8;
	const ranks = new Uint8Array(size * size);
	for (let y = 0; y < size; y += 1) {
		for (let x = 0; x < size; x += 1) {
			let rank = 0;
			for (let bit = 1; bit < size; bit *= 2) {
				const xBit = Math.floor(x / bit) % 2;
				const yBit = Math.floor(y / bit) % 2;
				rank = rank * 4 + 2 * ((xBit + yBit) % 2) + yBit;
			}
			ranks[y * size + x] = Math.round(((rank + 0.5) / 64) * 255);
		}
	}

	const thresholdTex = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, thresholdTex);
	gl.texImage2D(
		gl.TEXTURE_2D,
		0,
		gl.LUMINANCE,
		size,
		size,
		0,
		gl.LUMINANCE,
		gl.UNSIGNED_BYTE,
		ranks
	);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);

	const vsSource = `
		attribute vec2 position;
		void main() {
			gl_Position = vec4(position, 0.0, 1.0);
		}
	`;

	const fsSource = `
		precision highp float;
		uniform vec2 u_resolution;
		uniform float u_time;
		uniform sampler2D u_thresholds;
		uniform vec2 u_glowCenter;
		uniform float u_radius;
		uniform float u_intensity;

		vec3 dither_permute(vec3 x) {
			return mod(((x * 34.0) + 1.0) * x, 289.0);
		}

		float snoise(vec2 v) {
			const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
			vec2 i = floor(v + dot(v, C.yy));
			vec2 x0 = v - i + dot(i, C.xx);
			vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
			vec4 x12 = x0.xyxy + C.xxzz;
			x12.xy -= i1;
			i = mod(i, 289.0);
			vec3 p = dither_permute(dither_permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
			vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
			m = m * m;
			m = m * m;
			vec3 x = 2.0 * fract(p * C.www) - 1.0;
			vec3 h = abs(x) - 0.5;
			vec3 ox = floor(x + 0.5);
			vec3 a0 = x - ox;
			m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
			vec3 g;
			g.x = a0.x * x0.x + h.x * x0.y;
			g.yz = a0.yz * x12.xz + h.yz * x12.yw;
			return 130.0 * dot(m, g);
		}

		float fbm(vec2 p) {
			float sum = 0.0;
			float amp = 0.5;
			mat2 rotate = mat2(0.8, -0.6, 0.6, 0.8);
			for (int i = 0; i < 4; i++) {
				sum += amp * snoise(p);
				p = rotate * p * 2.02 + vec2(11.3, 4.7);
				amp *= 0.5;
			}
			return clamp(0.5 + 0.5 * sum / 0.9375, 0.0, 1.0);
		}

		// Exact dithercn dither-glow field equation
		float field(vec2 uv, vec2 res, float t) {
			float aspect = res.x / res.y;
			vec2 p = vec2(uv.x * aspect, uv.y);
			vec2 c = vec2(u_glowCenter.x * aspect, 1.0 - u_glowCenter.y);
			vec2 far = vec2(max(c.x, aspect - c.x), max(c.y, 1.0 - c.y));

			float reach = length(far) * u_radius;
			float breathe = 1.0 + 0.045 * sin(t * 0.32);
			float warp = fbm(p * 1.6 + vec2(t * 0.035, -t * 0.025)) - 0.5;
			float d = length(p - c) / (reach * breathe) + warp * 0.22;
			d = max(d, 0.0);

			float core = exp(-d * d * 4.5);
			float halo = exp(-d * 2.6) * (1.0 - smoothstep(0.55, 1.25, d));
			return u_intensity * (core * 0.6 + halo * 0.4);
		}

		void main() {
			vec2 cell = floor(gl_FragCoord.xy);
			vec2 uv = (cell + 0.5) / u_resolution;
			float tone = clamp(field(uv, u_resolution, u_time), 0.0, 1.0);

			// 2px dither cell size: 8 * 2 = 16.0
			float threshold = texture2D(u_thresholds, gl_FragCoord.xy / 16.0).r;

			vec3 paper = vec3(9.0 / 255.0, 13.0 / 255.0, 22.0 / 255.0); // Slate-950 (#090d16)
			vec3 ink = vec3(56.0 / 255.0, 189.0 / 255.0, 248.0 / 255.0);  // Sky-400 (#38bdf8)

			float isInk = step(threshold, tone);
			gl_FragColor = vec4(mix(paper, ink, isInk), 1.0);
		}
	`;

	function createShader(source: string, type: number): WebGLShader | null {
		if (!gl) return null;
		const shader = gl.createShader(type);
		if (!shader) return null;
		gl.shaderSource(shader, source);
		gl.compileShader(shader);
		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			gl.deleteShader(shader);
			return null;
		}
		return shader;
	}

	const vs = createShader(vsSource, gl.VERTEX_SHADER);
	const fs = createShader(fsSource, gl.FRAGMENT_SHADER);
	if (!vs || !fs) return;

	const program = gl.createProgram();
	if (!program) return;
	gl.attachShader(program, vs);
	gl.attachShader(program, fs);
	gl.linkProgram(program);

	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		gl.deleteProgram(program);
		return;
	}
	gl.useProgram(program);

	const buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.bufferData(
		gl.ARRAY_BUFFER,
		new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
		gl.STATIC_DRAW
	);

	const posAttr = gl.getAttribLocation(program, "position");
	gl.enableVertexAttribArray(posAttr);
	gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

	const uRes = gl.getUniformLocation(program, "u_resolution");
	const uTime = gl.getUniformLocation(program, "u_time");
	const uThresholds = gl.getUniformLocation(program, "u_thresholds");
	const uGlowCenter = gl.getUniformLocation(program, "u_glowCenter");
	const uRadius = gl.getUniformLocation(program, "u_radius");
	const uIntensity = gl.getUniformLocation(program, "u_intensity");

	gl.uniform1i(uThresholds, 0);
	gl.uniform2f(uGlowCenter, glowCenterX, glowCenterY);
	gl.uniform1f(uRadius, radius);
	gl.uniform1f(uIntensity, intensity);

	function resize(): void {
		if (!canvas || !gl) return;
		const dpr = Math.min(window.devicePixelRatio || 1, 2);
		const displayWidth = Math.round(canvas.clientWidth * dpr);
		const displayHeight = Math.round(canvas.clientHeight * dpr);
		if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
			canvas.width = displayWidth;
			canvas.height = displayHeight;
			gl.viewport(0, 0, canvas.width, canvas.height);
		}
	}

	const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
	let prefersReducedMotion = motionQuery.matches;

	motionQuery.addEventListener("change", (e) => {
		prefersReducedMotion = e.matches;
		if (prefersReducedMotion && animId !== null) {
			cancelAnimationFrame(animId);
			animId = null;
			renderFrame(0);
		} else if (!prefersReducedMotion && isVisible && animId === null) {
			animId = requestAnimationFrame(loop);
		}
	});

	function renderFrame(t: number): void {
		if (!gl || !uRes || !uTime || !canvas) return;
		gl.uniform2f(uRes, canvas.width, canvas.height);
		gl.uniform1f(uTime, t);
		gl.uniform2f(uGlowCenter, glowCenterX, glowCenterY);
		gl.uniform1f(uRadius, radius);
		gl.uniform1f(uIntensity, intensity);
		gl.drawArrays(gl.TRIANGLES, 0, 6);
	}

	let animId: number | null = null;
	let isVisible = false;
	const startTime = performance.now();

	function loop(): void {
		if (!isVisible || prefersReducedMotion) {
			animId = null;
			return;
		}
		const t = (performance.now() - startTime) * 0.001;
		renderFrame(t);
		animId = requestAnimationFrame(loop);
	}

	// Initial render
	resize();
	renderFrame(0);

	window.addEventListener("resize", resize, { passive: true });

	// IntersectionObserver: 0% CPU consumption when section is offscreen
	if (typeof IntersectionObserver !== "undefined") {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					isVisible = entry.isIntersecting;
					if (isVisible && !prefersReducedMotion && animId === null) {
						animId = requestAnimationFrame(loop);
					} else if (!isVisible && animId !== null) {
						cancelAnimationFrame(animId);
						animId = null;
					}
				}
			},
			{ threshold: 0.05 }
		);
		observer.observe(canvas);
	} else if (!prefersReducedMotion) {
		isVisible = true;
		animId = requestAnimationFrame(loop);
	}
}

// Auto-initialize when loaded or DOM ready
if (typeof document !== "undefined") {
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", initDitherCanvas);
	} else {
		initDitherCanvas();
	}
}
