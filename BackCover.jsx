export default function BackCover({ book }) {
  const backStyle = {
    backgroundImage: `url(${book.coverImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative'
  };

  return (
    <div className="back-card-pro" style={backStyle}>
      <div className="frosted-overlay">
        <div className="back-inner-border">
          <h2 className="synopsis-title">Synopsis</h2>
          <p className="summary-body">{book.summary || "Summary text here..."}</p>
          <div className="author-footer">
            <strong>About {book.author}</strong>
            <p>An explorer of themes within the {book.genre} genre.</p>
          </div>
          <div className="isbn-box">
            <div className="barcode">|| ||| | || |||| | || |</div>
            <span>ISBN 978-0-000000-00-0</span>
          </div>
        </div>
      </div>
    </div>
  );
}