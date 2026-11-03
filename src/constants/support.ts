import { CONFIG } from "../config";

/**
 * Support Developer Section Constants
 * Centralized data structures for donation and sponsorship channels.
 */

export interface SupportChannel {
	id: string;
	title: string;
	type: string;
	methods: string;
	qrImage: string;
	qrAlt: string;
	instruction: string;
	actionUrl?: string;
	actionLabel?: string;
}

export const SUPPORT_CHANNELS: SupportChannel[] = [
	{
		id: "bmc",
		title: "Buy Me a Coffee",
		type: "Global / International",
		methods: "Cards • Apple Pay • Google Pay",
		qrImage: "/images/qrcode-bmc.png",
		qrAlt: "Buy Me A Coffee QR Code",
		instruction: "Scan with camera or click below",
		actionUrl: CONFIG.BMC_URL,
		actionLabel: "Open buymeacoffee.com",
	},
	{
		id: "gcash",
		title: "GCash / QR Ph",
		type: "Direct Instant Transfer",
		methods: "GCash • Maya • InstaPay Banking",
		qrImage: "/images/qrcode-gcash.JPG",
		qrAlt: "GCash QR Code",
		instruction: "Scan with any PH banking app",
	},
];
