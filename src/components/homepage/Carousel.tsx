import Image from 'next/image';
import { ReactNode, useEffect, useState } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import React from 'react';

const Carousel = ({ icons }: any) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextSlide = () => {
    let newSlide = currentSlide === icons.length - 1 ? 0 : currentSlide + 1;
    setCurrentSlide(newSlide);
  };

  const handlePrevSlide = () => {
    let newSlide = currentSlide === 0 ? icons.length - 1 : currentSlide - 1;
    setCurrentSlide(newSlide);
  };

  useEffect(() => {
    const slideInterval = setInterval(handleNextSlide, 5000); // Change slide every 3 seconds
    return () => clearInterval(slideInterval);
  }, [currentSlide]);

  return (
    <div className='relative w-full max-w-screen-xl mx-auto'>
      <div className='h-full flex justify-center items-center'>
        <AiOutlineLeft
          onClick={handlePrevSlide}
          className='absolute left-0 m-auto text-5xl inset-y-1/2 cursor-pointer text-gray-800 z-20'
        />
        <div className='w-full h-[35vh] overflow-hidden relative m-auto'>
          <div
            className='flex h-full transition-all duration-1000 ease-in-out'
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {icons.map((icon: ReactNode, index: number) => (
              <div
                key={index}
                className='w-full flex justify-center items-center flex-shrink-0'
              >
                {icon}
              </div>
            ))}
          </div>
        </div>
        <AiOutlineRight
          onClick={handleNextSlide}
          className='absolute right-0 m-auto text-5xl inset-y-1/2 cursor-pointer text-gray-800 z-20'
        />
      </div>
      <div className='relative flex justify-center items-center p-2'>
        {icons.map((_: ReactNode, index: number) => (
          <div
            className={
              index === currentSlide
                ? 'h-4 w-4 border border-gray-800 bg-gray-800 rounded-full mx-2 mb-2 cursor-pointer'
                : 'h-4 w-4 border border-gray-400 rounded-full mx-2 mb-2 cursor-pointer'
            }
            key={index}
            onClick={() => {
              setCurrentSlide(index);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
