import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import'./slider.css'


const Slider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div className="slider">
      <button className='btn btn-slide' onClick={goToPrevious} disabled={currentIndex === 0}>
        <FaArrowLeft/>
      </button>
      <div className="img-container">

      {images.map((image, index) => (
          <img
          key={index}
          src={`http://localhost:8080/uploads/photo__${image}`}
          alt={`Slider ${index}`}
          style={{ display: currentIndex === index ? 'block' : 'none' }}
          />
          ))}
          </div>
      <button className='btn btn-slide' onClick={goToNext} disabled={currentIndex === images.length - 1}>
      <FaArrowRight/>
        
      </button>
    </div>
  );
};

export default Slider;