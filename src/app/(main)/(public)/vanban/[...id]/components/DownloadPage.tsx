"use client";
import React, { useRef } from "react";
// import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";

import { Roboto } from "roboto-base64";

import ContentPage from "./ContentPage";
import { CustomPageProps } from "src/interfaces";

export default function DownloadPage({ params }: CustomPageProps) {
    const ref = useRef<HTMLDivElement>(null);

    const handleGeneratePdf = async () => {
        if (ref.current) {
            const doc = new jsPDF({
                orientation: "portrait",
                format: "a4",
                unit: "px",
            });

            doc.addFileToVFS("Roboto-Regular.ttf", Roboto);
            doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
            doc.setFont("Roboto", "normal");
            doc.text("Xin chào, đây là văn bản tiếng Việt.", 10, 10);

            // Save the PDF
            doc.save("example.pdf");

            doc.html(
                ref.current.getElementsByClassName(
                    "law-content"
                )[0] as HTMLElement,
                {
                    async callback(doc) {
                        await doc.save("document");
                    },
                    html2canvas: {
                        letterRendering: true,
                        scale: 0.5,
                    },
                    autoPaging: "text",
                    x: 20,
                    y: 5,
                    width: 800,
                    windowWidth: 800,
                }
            );
        }
    };

    return (
        <div>
            <button
                onClick={handleGeneratePdf}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Download as PDF
            </button>
            <div ref={ref}>
                <ContentPage params={params} />
            </div>
        </div>
    );
}

// const handleDownload = async () => {
//     if (ref.current) {
//         const canvas = await html2canvas(ref.current, { scale: 4 });
//         const imgData = canvas.toDataURL("image/png");
//         const pdf = new jsPDF("p", "mm", "a4");
//         const pdfWidth = pdf.internal.pageSize.getWidth(); // 210mm
//         const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm

//         console.log("PDF Width:", pdfWidth);
//         console.log("PDF Height:", pdfHeight);

//         const canvasWidth = canvas.width;
//         const canvasHeight = canvas.height;

//         console.log("Canvas Width:", canvasWidth);
//         console.log("Canvas Height:", canvasHeight);

//         const scaleX = pdfWidth / canvasWidth; // Scale factor for width
//         const scaleY = pdfHeight / canvasHeight; // Scale factor for height
//         console.log("Scale X:", scaleX);
//         console.log("Scale Y:", scaleY);

//         // Use the smaller of the two scale factors to ensure content fits inside the page
//         const scaleFactor = Math.min(scaleX, scaleY);

//         const scaledWidth = canvasWidth * scaleFactor;
//         const scaledHeight = canvasHeight * scaleFactor;

//         // pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//         pdf.addImage({
//             imageData: imgData,
//             format: "UNKNOWN",
//             x: 0,
//             y: 0,
//             width: pdfWidth,
//             height: pdfHeight,
//         });
//         pdf.save("download.pdf");
//     }
// };
