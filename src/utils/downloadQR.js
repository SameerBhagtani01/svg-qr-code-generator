export default function downloadQR() {
    const el = document.getElementById("qr");

    const contentToDownload = el.outerHTML;

    const blob = new Blob([contentToDownload], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.download = Date.now();
    a.href = url;

    document.body.appendChild(a); // required for firefox
    a.click();
    document.body.removeChild(a);

    setTimeout(() => URL.revokeObjectURL(url), 1000);
}
