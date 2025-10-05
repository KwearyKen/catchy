import React, { useState, useEffect } from "react";
import CatCard from "./components/CatCard";
import Summary from "./components/Summary";
import Header from "./components/Header";
import "./App.css";

function App() {
  const [cats, setCats] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedCats, setLikedCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [coverFirst, setCoverFirst] = useState(true);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const fallbackCat = "https://cataas.com/cat?width=300&height=300";

  useEffect(() => {
    fetchCats();
  }, []);

  // Sync body background with theme
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  const fetchCats = async () => {
    setLoading(true);
    const count = 10;
    const urls = [];

    for (let i = 0; i < count; i++) {
      urls.push(`https://cataas.com/cat?width=300&height=300&${Math.random()}`);
    }

    const preloadPromises = urls.map(
      (url, index) =>
        new Promise((resolve) => {
          const img = new Image();
          img.src = url;
          img.onload = () => resolve();
          img.onerror = () => {
            urls[index] = fallbackCat;
            resolve();
          };
        })
    );

    await Promise.all(preloadPromises);

    setCats(urls);
    setCurrentIndex(0);
    setLikedCats([]);
    setLoading(false);

    setCoverFirst(true);
    setTimeout(() => setCoverFirst(false), 3000);
  };

  const handleSwipe = (direction) => {
    if (!cats[currentIndex]) return;

    setSwipeDirection(direction);

    setTimeout(() => {
      if (direction === "right") {
        setLikedCats((prev) => [...prev, cats[currentIndex]]);
      }
      setCurrentIndex((prev) => prev + 1);
      setSwipeDirection(null);
    }, 300);
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-inner">
          <div className="logo">
            <span className="logo-emoji">😺</span>
            <span className="logo-text">Catchy</span>
          </div>
          <div className="loader"></div>
        </div>
      </div>
    );
  }

  if (currentIndex >= cats.length) {
    return (
      <Summary
        likedCats={likedCats}
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode((d) => !d)}
        onRetry={fetchCats}
      />
    );
  }

  return (
    <div className={`app-container ${darkMode ? "dark" : ""}`}>
      <Header darkMode={darkMode} toggleDarkMode={() => setDarkMode(d => !d)} />

      {/* 🐱 Card Stack */}
      <div className="card-stack">
        {cats.slice(currentIndex, currentIndex + 2).map((cat, i) => (
          <CatCard
            key={cat}
            image={cat}
            onSwipe={handleSwipe}
            swipeDirection={i === 0 ? swipeDirection : null}
            isNext={i === 1}
          />
        ))}
      </div>

      {/* ❤️ / ❌ Buttons */}
      <div className="buttons">
        <button className="dislike" onClick={() => handleSwipe("left")}>✖️</button>
        <button className="like" onClick={() => handleSwipe("right")}>❤️</button>
      </div>

      {/* Overlay for first card */}
      {currentIndex === 0 && coverFirst && (
        <div className="first-cover">
          <p className="cover-text">Showing cats now...</p>
        </div>
      )}
    </div>
  );
}

export default App;
