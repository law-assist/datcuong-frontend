"use client";
import React, { useRef } from "react";
// import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";
import "src/fonts/Roboto-Regular-normal"; // Ensure correct path
import ContentPage from "./ContentPage";
import { CustomPageProps } from "src/interfaces";

export default function DownloadPage({ params }: CustomPageProps) {
    const ref = useRef<HTMLDivElement>(null);

    const waitForFont = (): Promise<void> => {
        return new Promise((resolve) => {
            const interval = setInterval(() => {
                if (document.fonts.check('16px "Roboto"')) {
                    clearInterval(interval);
                    resolve(); // No value is needed to be passed to resolve
                }
            }, 100);
        });
    };

    const handleGeneratePdf = async () => {
        await waitForFont();
        if (ref.current) {
            const doc = new jsPDF({
                orientation: "portrait",
                format: "a4",
                unit: "px",
            });

            const marginLeft = 30;
            const marginRight = 20;
            const marginTop = 30;
            const pageWidth = doc.internal.pageSize.getWidth();
            const maxWidth = pageWidth - marginLeft - marginRight;

            // Register and set Roboto font
            doc.setLanguage("vi");
            doc.setFont("Roboto-Regular", "normal");

            try {
                await doc.html(
                    ref.current.getElementsByClassName(
                        "law-content"
                    )[0] as HTMLElement,
                    {
                        callback: (pdf) => pdf.save("document.pdf"),
                        html2canvas: {
                            useCORS: true, // Enable cross-origin support
                            letterRendering: true,
                            scale: 0.45,
                            windowWidth: maxWidth,
                        },
                        margin: [marginTop, marginRight, marginTop, marginLeft],
                    }
                );
            } catch (error) {
                console.error("PDF generation error:", error);
            }
        }
    };

    return (
        <div>
            <button
                onClick={handleGeneratePdf}
                className="px-4 py-2 bg-[#07357A] text-white rounded hover:bg-blue-600"
            >
                Tải xuống văn bản
            </button>
            <div ref={ref}>
                <ContentPage params={params} isRef={false} />
            </div>
        </div>
    );
}
