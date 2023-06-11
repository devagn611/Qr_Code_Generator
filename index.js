var qrcode = null;
var darkMode = false;

function showInputFields() {
  var dataType = document.getElementById("dataType").value;

  document.getElementById("vcardGroup").style.display = "none";
  document.getElementById("urlGroup").style.display = "none";
  document.getElementById("freeTextGroup").style.display = "none";
  document.getElementById("emailGroup").style.display = "none";

  if (dataType === "vcard") {
    document.getElementById("vcardGroup").style.display = "block";
  } else if (dataType === "url") {
    document.getElementById("urlGroup").style.display = "block";
  } else if (dataType === "freeText") {
    document.getElementById("freeTextGroup").style.display = "block";
  } else if (dataType === "email") {
    document.getElementById("emailGroup").style.display = "block";
  }
}

function generateQRCode() {
  var dataType = document.getElementById("dataType").value;
  var oldQRCode = document.getElementById("qrCode");
  while (oldQRCode.firstChild) {
    oldQRCode.removeChild(oldQRCode.firstChild);
  }
  if (dataType === "vcard") {
    generateVCardQRCode();
  } else if (dataType === "url") {
    generateGenericQRCode("url");
  } else if (dataType === "freeText") {
    generateGenericQRCode("freeText");
  } else if (dataType === "email") {
    generateEmailQRCode();
  }
}

function generateVCardQRCode() {
  var fullName = document.getElementById("fullName").value;
  var email = document.getElementById("email").value;
  var phone = document.getElementById("phone").value;
  var address = document.getElementById("address").value;
  var organization = document.getElementById("organization").value;

  var vCardData = "BEGIN:VCARD\nVERSION:3.0\n";
  vCardData += "N:" + fullName + "\n";
  vCardData += "EMAIL:" + email + "\n";
  vCardData += "TEL:" + phone + "\n";
  vCardData += "ADR:" + address + "\n";
  vCardData += "ORG:" + organization + "\n";
  vCardData += "END:VCARD";

  generateQRCodeFromData(vCardData);
}

function generateGenericQRCode(dataType) {
  var data = "";

  if (dataType === "url") {
    data = document.getElementById("url").value;
  } else if (dataType === "freeText") {
    data = document.getElementById("freeText").value;
  }

  generateQRCodeFromData(data);
}

function generateEmailQRCode() {
  var emailAddress = document.getElementById("emailAddress").value;
  var emailSubject = document.getElementById("emailSubject").value;
  var emailMessage = document.getElementById("emailMessage").value;

  var emailData = "mailto:" + encodeURIComponent(emailAddress);

  if (emailSubject) {
    emailData += "?subject=" + encodeURIComponent(emailSubject);
  }

  if (emailMessage) {
    emailData += "&body=" + encodeURIComponent(emailMessage);
  }

  generateQRCodeFromData(emailData);
}

function generateQRCodeFromData(data) {
  if (qrcode) {
    qrcode.clear();
  }

  qrcode = new QRCode(document.getElementById("qrCode"), {
    width: 200,
    height: 200,
  });

  qrcode.makeCode(data);
}

function downloadQRCode() {
  var canvas = document.querySelector("#qrCode canvas");
  var image = canvas
    .toDataURL("image/png")
    .replace("image/png", "image/octet-stream");

  var link = document.createElement("a");
  link.href = image;
  link.download = "qr_code.png";

  link.click();
}

function toggleDarkMode() {
  var body = document.querySelector("body");
  body.classList.toggle("dark-mode");

  darkMode = !darkMode;

  if (qrcode) {
    qrcode.clear();
    qrcode.makeCode(qrcode._text);
  }
}
