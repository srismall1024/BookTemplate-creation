export default function FrontCover({ book }) {
  const containerStyle = {
    width: '380px',
    height: '550px',
    backgroundColor: '#1a1a1a', // This forms the outer border
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: book.fontFamily,
    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
    position: 'relative'
  };

  const imageStyle = {
    width: '92%', // The 8% difference creates the border
    height: '94%',
    backgroundImage: `url(${book.coverImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: `brightness(${book.brightness}%)`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: '30px',
    boxSizing: 'border-box'
  };

  return (
    <div className="front-card-pro" style={containerStyle}>
      <div style={imageStyle}>
        <div className="text-container">
          <h1 style={{ fontSize: `${book.fontSize}px`, margin: 0 }}>{book.title}</h1>
          <h3 style={{ opacity: 0.9 }}>{book.author}</h3>
          <span className="genre-label">{book.genre}</span>
        </div>
      </div>
    </div>
  );
}
