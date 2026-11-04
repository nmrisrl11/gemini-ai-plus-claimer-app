/**
 * Google AI Plus Portal — WebGL Bayer Dither Canvas
 * Inspired by dithercn.dev: creates an ambient retro-futuristic ordered halftone
 * dither halo effect with 60fps performance and zero external dependencies.
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
		// Gracefully degrade: canvas remains clear while background and text render normally
		return;
	}

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

		// 4x4 Bayer Dither Matrix
		float getBayer(vec2 p) {
			vec2 coord = floor(mod(p, 4.0));
			float x = coord.x;
			float y = coord.y;
			float b = 0.0;
			if (y == 0.0) {
				b = (x == 0.0) ? 0.0 : (x == 1.0) ? 8.0 : (x == 2.0) ? 2.0 : 10.0;
			} else if (y == 1.0) {
				b = (x == 0.0) ? 12.0 : (x == 1.0) ? 4.0 : (x == 2.0) ? 14.0 : 6.0;
			} else if (y == 2.0) {
				b = (x == 0.0) ? 3.0 : (x == 1.0) ? 11.0 : (x == 2.0) ? 1.0 : 9.0;
			} else {
				b = (x == 0.0) ? 15.0 : (x == 1.0) ? 7.0 : (x == 2.0) ? 13.0 : 5.0;
			}
			return b / 16.0;
		}

		void main() {
			vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.x, u_resolution.y);

			float d = length(uv);
			float breathe = 1.0 + 0.06 * sin(u_time * 0.8);

			// Layered harmonic fields: focal core bloom + ambient wave ripple
			float wave = sin(uv.x * 5.0 + u_time * 0.4) * cos(uv.y * 4.0 - u_time * 0.3) * 0.06;
			float core = exp(-d * d * 3.8);
			float halo = exp(-d * 2.2) * (1.0 - smoothstep(0.4, 1.1, d));

			float field = clamp((core * 0.65 + halo * 0.35 + wave) * breathe, 0.0, 1.0);

			// Edge fade (top & bottom boundaries fade smoothly to brand dark slate #090d16)
			float edgeFade = smoothstep(0.0, 0.15, gl_FragCoord.y / u_resolution.y) *
			                 smoothstep(1.0, 0.85, gl_FragCoord.y / u_resolution.y);
			field *= edgeFade;

			// 2px crisp physical pixel dither grid
			float threshold = getBayer(gl_FragCoord.xy / 2.0);

			vec3 paper = vec3(9.0 / 255.0, 13.0 / 255.0, 22.0 / 255.0); // Slate-950 (#090d16)
			vec3 ink = vec3(56.0 / 255.0, 189.0 / 255.0, 248.0 / 255.0);  // Sky-400 (#38bdf8)

			float isInk = step(threshold, field);
			gl_FragColor = vec4(mix(paper, ink, isInk * 0.8), 1.0);
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
