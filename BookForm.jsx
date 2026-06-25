export default function BookForm({ book, setBook }) {
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "coverImage" && files[0]) {
      setBook(prev => ({ ...prev, coverImage: URL.createObjectURL(files[0]) }));
    } else {
      setBook(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="form-vertical">
      <div className="field"><label>Title</label><input name="title" value={book.title} onChange={handleChange} /></div>
      <div className="field"><label>Author</label><input name="author" value={book.author} onChange={handleChange} /></div>
      <div className="field"><label>Pages</label><input name="pages" type="number" value={book.pages} onChange={handleChange} /></div>
      <div className="field">
        <label>Genre</label>
        <select name="genre" value={book.genre} onChange={handleChange}>
          <option value="Fiction">Fiction</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Biography">Biography</option>
          <option value="Autobiography">Autobiography</option>
          <option value="Short Story">Short Story</option>
        </select>
      </div>
      <div className="field"><label>Tone ({book.brightness}%)</label><input name="brightness" type="range" min="30" max="150" value={book.brightness} onChange={handleChange} /></div>
      <div className="field"><label>Font Size ({book.fontSize}px)</label><input name="fontSize" type="range" min="15" max="60" value={book.fontSize} onChange={handleChange} /></div>
      <div className="field"><label>Summary</label><textarea name="summary" rows="5" value={book.summary} onChange={handleChange} /></div>
      <div className="field"><label>Cover Art</label><input type="file" name="coverImage" accept="image/*" onChange={handleChange} /></div>
    </div>
  );
}