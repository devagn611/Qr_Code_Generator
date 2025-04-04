import QRCode from "qrcode";

// ======================
// Server-side QR code generation
// ======================
export async function qrGen(req, res) {

  console.log("API triggered with query parameters:", req.query);
  const { data, url, name, phoneNum, org, address } = req.query;

  try {
    let qrData;
    if (data) {
      qrData = `${data}`;
    } else if (url) {
      qrData = `${url}`;
    } else if (name || phoneNum || address || org) {
      qrData = `BEGIN:VCARD
VERSION:3.0
FN:${name || ''}
TEL:${phoneNum || ''}
ADR:${address || ''}
ORG:${org || ''}
END:VCARD`;
    } else {
      return res.status(400).send("Missing required data");
    }

    const qrCodeBuffer = await QRCode.toBuffer(qrData);
    res.type("png").send(qrCodeBuffer);
  } catch (error) {
    console.error("Error generating QR code:", error);
    res.status(500).send("Error generating QR code");
  }
}

// ======================
// Client-side QR code & UI functions
// (Intended to run in a browser environment)
// ======================

// If not defined elsewhere, simple stubs for loader functions:
export function showLoader() {
  // Implement your loader display logic (e.g. show a spinner)
  console.log("Loader shown");
}

export function hideLoader() {
  // Implement your loader hide logic
  console.log("Loader hidden");
}

export function showInputFields(dataType) {
    
  const inputGroups = document.getElementsByClassName("input-group");
  for (let i = 0; i < inputGroups.length; i++) {
    inputGroups[i].style.display = "none";
  }
  if (dataType !== "") {
    const groupEl = document.getElementById(dataType + "Group");
    if (groupEl) {
      groupEl.style.display = "block";
    }
  }
}

export function generateQRCode(dataType) {
  const qrCodeElement = document.getElementById("qrCode");
  if (!qrCodeElement) return;
  qrCodeElement.innerHTML = ""; // Clear existing QR code

  if (dataType === "custom") {
    generateUPIQRCode();
  } else if (dataType === "url") {
    generateUPIIDQRCode();
  }
}

export function generateUPIIDQRCode(urldata) {
  const outputLink = urldata;
  generateQRCodeFromData(outputLink);
  const printQRBtn = document.getElementById("printQRBtn");
  const downloadQRBtn = document.getElementById("downloadQRBtn");
  if (printQRBtn) printQRBtn.style.display = "block";
  if (downloadQRBtn) downloadQRBtn.style.display = "block";
}

export function generateUPIQRCode(data) {
  const outputLink = data;
  generateQRCodeFromData(outputLink);
  const printQRBtn = document.getElementById("printQRBtn");
  const downloadQRBtn = document.getElementById("downloadQRBtn");
  if (printQRBtn) printQRBtn.style.display = "block";
  if (downloadQRBtn) downloadQRBtn.style.display = "block";
  const upiLinkEl = document.getElementById("upilinkapp");
  // Assumes 'upiLink' is defined in the global scope if needed
  if (upiLinkEl && typeof upiLink !== "undefined") {
    upiLinkEl.setAttribute("href", upiLink);
  }
}

export function generateQRCodeFromData(data) {
  showLoader();
  // Assume a client-side QRCode library is available as a global variable "qrcode"
  if (window.qrcode) {
    window.qrcode.clear();
  }
  window.qrcode = new QRCode(document.getElementById("qrCode"), {
    width: 200,
    height: 200,
  });
  window.qrcode.makeCode(data);
  hideLoader();
}

export function downloadQRCode(dataType, name, id) {
  const printContents = document.getElementsByClassName("qr-code-preview")[0].innerHTML;
  let selectedName = (dataType === "upiid" || dataType === "upi") ? name : "Unknown";

  const nameElement = document.createElement("h4");
  nameElement.textContent = "Name: " + selectedName;
  const wrapperElement = document.createElement("div");
  wrapperElement.appendChild(nameElement);
  wrapperElement.innerHTML += printContents;
  wrapperElement.style.maxWidth = "250px";
  wrapperElement.style.margin = "0 auto";
  wrapperElement.style.padding = "20px";
  wrapperElement.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
  wrapperElement.style.borderRadius = "5px";
  wrapperElement.style.border = "1px solid #000";
  wrapperElement.style.boxShadow = "0 0 4px rgba(0, 0, 0, 0.4)";
  document.body.appendChild(wrapperElement);
  html2canvas(wrapperElement).then(function(canvas) {
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "qrcode.png";
    link.click();
    location.reload();
  });
}

export function printQRCode(dataType, name, id) {
  const printContents = document.getElementsByClassName("qr-code-preview")[0].innerHTML;
  let selectedName = (dataType === "upiid" || dataType === "upi") ? name : "Unknown";

  const nameElement = document.createElement("h4");
  nameElement.textContent = "Name: " + selectedName;
  const wrapperElement = document.createElement("div");
  wrapperElement.appendChild(nameElement);
  wrapperElement.innerHTML += printContents;
  wrapperElement.style.maxWidth = "250px";
  wrapperElement.style.margin = "0 auto";
  wrapperElement.style.padding = "20px";
  wrapperElement.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
  wrapperElement.style.borderRadius = "5px";
  wrapperElement.style.border = "1px solid #000";
  wrapperElement.style.boxShadow = "0 0 4px rgba(0, 0, 0, 0.4)";
  document.body.innerHTML = "";
  document.body.appendChild(wrapperElement);
  window.print();
  location.reload();
}
