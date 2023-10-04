'use client';

import React, { useState } from 'react';

const Slider = ({ imagePaths }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % imagePaths.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + imagePaths.length) % imagePaths.length);
    };


    return (
        <div id="default-carousel" className="relative w-[500px]">
            <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                {imagePaths?.map((src, index) => (
                    <div 
                        key={src} 
                        className={`absolute w-full h-full transition-opacity duration-700 ease-in-out ${currentIndex === index ? 'opacity-100' : 'opacity-0'}`} 
                        data-carousel-item
                    >
                        <img src={src} alt={`slide-${index}`} className="absolute w-full transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
                    </div>
                ))}
            </div>
            <div className="absolute z-30 flex space-x-3 translate-x-[-50%] bottom-5 left-1/2">
                {imagePaths.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        className="w-3 h-3 rounded-full"
                        aria-current={currentIndex === index}
                        aria-label={`Slide ${index + 1}`}
                        onClick={() => setCurrentIndex(index)}
                    ></button>
                ))}
            </div>
            <button type="button" className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer" onClick={prevSlide}>
                {/* Place your left arrow icon here */}
                Prev
            </button>
            <button type="button" className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer" onClick={nextSlide}>
                {/* Place your right arrow icon here */}
                Next
            </button>
        </div>
    );
};

export default Slider;