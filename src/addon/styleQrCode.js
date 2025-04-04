import QRCodeStyling from "qr-code-styling";

export async function styleQrCode(data) {
  
  const qrCode = new QRCodeStyling({
    width: 300,      // Reduced size for faster rendering.
    height: 300,
    type: "svg",
    data: data,      // Use the provided UPI string.
    dotsOptions: {
      color: "#4267b2",
      type: "rounded"
    },
    backgroundOptions: {
      color: "#e9ebee"
    },
    // image: "data:image/svg+xml;base64,...", 
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 20
    }
  });

  // Append to a temporary container in our simulated DOM.
  const container = document.createElement("div");
  document.body.appendChild(container);
  qrCode.append(container);

  // Retrieve the raw SVG data.
  const rawData = await qrCode.getRawData("svg");
  if (rawData instanceof Blob) {
    const buffer = Buffer.from(await rawData.arrayBuffer());
    return buffer.toString("utf-8");
  } else {
    return rawData;
  }
}
