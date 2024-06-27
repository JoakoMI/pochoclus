"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

const AUTO_SCROLL_INTERVAL = 7000; // 7 segundos

export default function HomeCarousel() {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/movieCollections/carrusel")
      .then((response) => response.json())
      .then((data) => {
        // Check if the data contains movies and set the images
        if (data.length > 0 && data[0].movies.length > 0) {
          setMovies(data[0].movies);
        } else {
          setMovies([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
        setMovies([]);
      });
  }, []);

  useEffect(() => {
    // Auto-scroll interval to change the image every AUTO_SCROLL_INTERVAL milliseconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, AUTO_SCROLL_INTERVAL);

    return () => clearInterval(interval);
  }, [movies]);

  const scrollToIndex = (index) => {
    if (carouselRef.current) {
      const width = carouselRef.current.offsetWidth;
      carouselRef.current.scrollTo({
        left: width * index,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    // Scroll to the current image whenever the index changes
    scrollToIndex(currentIndex);
  }, [currentIndex]);

  const scrollLeft = () => {
    // Decrement the current index
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + movies.length) % movies.length
    );
  };

  const scrollRight = () => {
    // Increment the current index
    setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
  };

  return (
    <div
      id="controls-carousel"
      className="relative w-full"
      data-carousel="static"
    >
      {/* Carousel container */}
      <div
        ref={carouselRef}
        className="relative h-56 mb-8 sm:h-72 md:h-96 lg:h-112 xl:h-128 overflow-hidden rounded-lg flex"
        style={{ scrollBehavior: "smooth", overflow: "hidden" }}
      >
        {/* Render images */}
        {movies.length > 0 &&
          movies.map((movie, index) => (
            <div
              key={movie._id}
              className="flex-shrink-0 w-full relative"
              style={{
                width: `${
                  carouselRef.current ? carouselRef.current.offsetWidth : "100%"
                }`,
              }}
            >
              <Link href={`/movie/${movie._id}`}>
                <img
                  src={`/img-home/${movie.imgInicio}`}
                  className="block w-full h-full object-scale-down"
                  alt={movie.name}
                />
                {/* Title container */}
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                  <h1 className="text-lg font-semibold">{movie.name}</h1>
                </div>
              </Link>
            </div>
          ))}
      </div>

      {/* Navigation buttons */}
      {movies.length > 1 && (
        <>
          {/* Previous button */}
          <button
            type="button"
            onClick={scrollLeft}
            className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-prev
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
              <span className="sr-only">Previous</span>
            </span>
          </button>
          {/* Next button */}
          <button
            type="button"
            onClick={scrollRight}
            className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-next
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="sr-only">Next</span>
            </span>
          </button>
        </>
      )}
    </div>
  );
}
