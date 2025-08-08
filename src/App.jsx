import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

import Input from "./components/Input";
import Button from "./components/Button";

import downloadQR from "./utils/downloadQR";

export default function App() {
    const [formData, setFormData] = useState({
        value: "",
        fgcolor: "#ffffff",
        bgcolor: "#000000",
        transparent: false,
    });

    function handleChange(e) {
        const { name, value } = e.target;

        if (name === "transparent") {
            setFormData((prevFormData) => ({
                ...prevFormData,
                transparent: e.target.checked,
            }));

            return;
        }

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    }

    return (
        <main className="flex h-full w-full flex-col items-center justify-start gap-20 pt-10">
            <h1 className="text-center text-4xl font-bold text-blue-500">
                SVG QR Code Generator
            </h1>

            <section className="flex flex-col items-center justify-center gap-20 md:flex-row md:gap-40">
                <InputSection formData={formData} handleChange={handleChange} />
                <PreviewSection formData={formData} />
            </section>
        </main>
    );
}

function InputSection({ formData, handleChange }) {
    return (
        <section className="flex flex-col justify-center gap-5 text-lg">
            <div className="flex flex-col justify-center">
                <label htmlFor="value">Value</label>
                <Input
                    className="border-2 border-black focus:border-blue-500"
                    type="text"
                    id="value"
                    name="value"
                    value={formData.value}
                    onChange={handleChange}
                />
            </div>

            <div className="flex flex-col">
                <label htmlFor="fgcolor">Foreground Color</label>
                <Input
                    type="color"
                    className="color-input"
                    id="fgcolor"
                    name="fgcolor"
                    value={formData.fgcolor}
                    onChange={handleChange}
                />
            </div>

            <div className="flex flex-col items-start justify-center gap-2">
                <div className="flex flex-col justify-center">
                    <label htmlFor="bgcolor">Background Color</label>
                    <Input
                        type="color"
                        className="color-input"
                        id="bgcolor"
                        name="bgcolor"
                        value={formData.bgcolor}
                        onChange={handleChange}
                        disabled={formData.transparent}
                    />
                </div>

                <div className="flex items-center justify-center gap-2">
                    <input
                        type="checkbox"
                        name="transparent"
                        id="transparent"
                        checked={formData.transparent}
                        onChange={handleChange}
                    />
                    <label htmlFor="transparent">Transparent Background</label>
                </div>
            </div>
        </section>
    );
}

function PreviewSection({ formData }) {
    return (
        <section className="flex flex-col items-center justify-center gap-5">
            <div className="flex h-50 w-50 items-center justify-center rounded-md border-2 border-black">
                {formData.value ? (
                    <QRCodeSVG
                        bgColor={
                            formData.transparent
                                ? "transparent"
                                : formData.bgcolor
                        }
                        value={formData.value}
                        fgColor={formData.fgcolor}
                        marginSize={1}
                        size={180}
                        id="qr"
                    />
                ) : (
                    <p className="text-center">
                        Enter a valid value to view the preview
                    </p>
                )}
            </div>

            <Button
                className="rounded-md bg-blue-500 px-2 py-1 text-lg text-white"
                onClick={downloadQR}
            >
                Download
            </Button>
        </section>
    );
}
