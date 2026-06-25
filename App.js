import React, { useState, useRef } from "react";
import "./App.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import BookForm from "./components/BookForm";
import FrontCover from "./components/Frontcover";
import BackCover from "./components/BackCover";
import Spine from "./components/Spine";

function App() {
  const [book, setBook] = useState({
    title: "The Life of a Student",
    author: "Sribala",
    genre: "Fiction",
    summary: "",
    pages: 200,
    coverImage: null,
    brightness: 100,
    fontSize: 24,
    fontFamily: "serif"
  });

  const frontRef = useRef();
  const backRef = useRef();

  const totalPages = parseInt(book.pages) || 0;

  const downloadPDF = async () => {
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const drawBrandingAndWatermark = (pageNumber) => {
      // 1. Design Border
      pdf.setDrawColor(220); 
      pdf.setLineWidth(0.3);
      pdf.rect(10, 10, pageWidth - 20, pageHeight - 20);

      // 2. Branded Header
      pdf.setFont("helvetica", "italic");
      pdf.setFontSize(9);
      pdf.setTextColor(150);
      pdf.text(`${book.title.toUpperCase()} | ${book.author}`, pageWidth / 2, 16, { align: "center" });

      // 3. Branded Footer with Page Number
      pdf.text(`Page ${pageNumber}`, pageWidth / 2, pageHeight - 14, { align: "center" });
    };

    // --- FRONT COVER ---
    const canvasFront = await html2canvas(frontRef.current, { useCORS: true, scale: 2 });
    pdf.addImage(canvasFront.toDataURL("image/png"), "PNG", 0, 0, pageWidth, pageHeight);

    // --- INTERNAL PAGES ---
    const totalPages = parseInt(book.pages);
    for (let i = 1; i <= totalPages; i++) {
      pdf.addPage();
      drawBrandingAndWatermark(i);
      if (i === 1) {
        pdf.setTextColor(0); pdf.setFontSize(22); pdf.text("SYNOPSIS", 25, 45);
        pdf.setFontSize(12);
        const splitText = pdf.splitTextToSize(book.summary || "No summary provided.", 160);
        pdf.text(splitText, 25, 60);
      }
    }

    // --- BACK COVER ---
    pdf.addPage();
    const canvasBack = await html2canvas(backRef.current, { useCORS: true, scale: 2 });
    pdf.addImage(canvasBack.toDataURL("image/png"), "PNG", 0, 0, pageWidth, pageHeight);

    pdf.save(`${book.title}_Final_Draft.pdf`);
  };

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <h2>Book Settings</h2>
        <BookForm book={book} setBook={setBook} />
        <button className="download-btn" onClick={downloadPDF}>
          Download {totalPages ? totalPages + 2 : 2} Page PDF
        </button>
      </aside>

      <main className="preview-area">
        <div className="vertical-stack">
          {/* Front Cover Container */}
          <div ref={frontRef}>
            <FrontCover book={book} />
          </div>

          {/* Book Spine Component */}
          <Spine book={book} />

          {/* Back Cover Container */}
          <div ref={backRef}>
            <BackCover book={book} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;