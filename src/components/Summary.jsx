import React from "react";
import Header from "./Header";
import "./Summary.css";

function Summary({ likedCats, darkMode, toggleDarkMode, onRetry }) {

  const handleSave = () => {
    if (likedCats.length === 0) return;

    // Create a zip using JSZip
    import("jszip").then(JSZip => {
      const zip = new JSZip.default();
      const imgFolder = zip.folder("liked-cats");

      likedCats.forEach((imgUrl, i) => {
        // Fetch the image as blob
        fetch(imgUrl)
          .then(res => res.blob())
          .then(blob => {
            imgFolder.file(`cat-${i + 1}.jpg`, blob);
            if (i === likedCats.length - 1) {
              zip.generateAsync({ type: "blob" }).then(content => {
                const a = document.createElement("a");
                a.href = URL.createObjectURL(content);
                a.download = "liked-cats.zip";
                a.click();
              });
            }
          });
      });
    });
  };

  return (
    <div className={`summary ${darkMode ? "dark" : ""}`}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} onRetry={onRetry} />

      <div className="summary-content">
        <h2>You liked {likedCats.length} cats!</h2>
        <div className="liked-cats">
          {likedCats.map((cat, i) => (
            <img key={i} src={cat} alt={`liked cat ${i + 1}`} />
          ))}
        </div>
        {likedCats.length > 0 && (
          <button className="save-btn" onClick={handleSave}>
            Save Results
          </button>
        )}
      </div>
    </div>
  );
}

export default Summary;
