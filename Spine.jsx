import React from "react";

export default function Spine({ book }) {
  // Graceful fallback to avoid application crash if book isn't fully defined yet
  if (!book) return null;

  // Logic: 100 pages = 20px width dynamically scaling outwards
  const dynamicWidth = Math.max(20, (parseInt(book.pages) || 0) * 0.2); 

  return (
    <div className="spine-card" style={{ width: `${dynamicWidth}px` }}>
      <span className="spine-text">{book.title || "Untitled"}</span>
    </div>
  );
}
