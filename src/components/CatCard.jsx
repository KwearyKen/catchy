import React, { useMemo } from "react";
import "./CatCard.css";

function CatCard({ image, onSwipe, swipeDirection, isNext }) {
  // Random cat profile
  const catProfile = useMemo(() => {
    const names = ["Milo", "Luna", "Simba", "Cleo", "Nala", "Leo", "Mochi", "Oreo", "Bella", "Shadow"];
    const genders = ["Male", "Female"];
    const sizes = ["Small", "Medium", "Large", "Chonky"];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomAge = Math.floor(Math.random() * 10) + 1;
    const randomGender = genders[Math.floor(Math.random() * genders.length)];
    const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
    return { name: randomName, age: randomAge, gender: randomGender, size: randomSize };
  }, [image]);

  const handleStart = (e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    e.currentTarget.dataset.startX = clientX;
  };

  const handleEnd = (e) => {
    const startX = parseFloat(e.currentTarget.dataset.startX || 0);
    const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;

    // for swipe
    if (startX - endX > 50) {
      onSwipe("left");
    } else if (endX - startX > 50) {
      onSwipe("right");
    }
  };

  return (
    <div  
      className={`cat-card ${swipeDirection ? "swipe-" + swipeDirection : ""} ${isNext ? "next-card" : ""}`}
      onTouchStart={handleStart}
      onTouchEnd={handleEnd}
      onMouseDown={handleStart}
      onMouseUp={handleEnd}
    >
      <img src={image} alt="cat" className="cat-image" />
      <div className="cat-info">
        <h2>{catProfile.name}</h2>
        <p>Age: {catProfile.age} years</p>
        <p>Gender: {catProfile.gender}</p>
        <p>Size: {catProfile.size}</p>
      </div>
    </div>
  );
}

export default CatCard;
