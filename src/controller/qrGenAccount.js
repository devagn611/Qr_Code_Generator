// Set up a minimal DOM using jsdom so that qr-code-styling can work in Node.js.
import { JSDOM } from "jsdom";
const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
global.window = dom.window;
global.document = dom.window.document;

import { styleQrCode } from "../addon/styleQrCode.js";

export async function createUpiCodeAccount(req, res) {
  const { acn, ifsc, name } = req.query;
  try {
    // Build the UPI string.
    const upiACstring = `upi://pay?pa=${acn}@${ifsc}.ifsc.npci&pn=${name}&cu=INR`;
    console.log("Generated UPI string:", upiACstring);
    
    // Generate the styled QR code SVG using the UPI string.
    const finalQr = await styleQrCode(upiACstring);
    
    // Set response headers for an SVG response.
    res.setHeader("Content-Type", "image/svg+xml");
    res.send(finalQr);
    console.log("UPI QR code created successfully");
  } catch (error) {
    console.error("Error generating UPI QR code:", error);
    res.status(500).send({ message: "Error generating QR code", error: error.message });
  }
}
