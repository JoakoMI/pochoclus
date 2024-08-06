import MovieCard from "./MovieCard";
import { useRef } from "react";

export default function HorizList(props) {
  const listRef = useRef(null);

  const scrollLeft = () => {
    listRef.current.scrollBy({
      top: 0,
      left: -300,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    listRef.current.scrollBy({
      top: 0,
      left: 300,
      behavior: "smooth",
    });
  };

  return (
    <div className="py-4 px-4 my-1 mb-4 relative">
      <section className="my-1 items-baseline mb-4">
        <h1 className="text-white font-bold text-xl sm:text-xl lg:text-2xl">
          {props.collection.title}
        </h1>
        <p className="text-gray-300 text-base sm:text-lg lg:text-l hidden sm:block">
          {props.collection.subtitle}
        </p>
      </section>

      <div className="flex items-center">
        <div
          className="flex items-start gap-2 overflow-x-auto scroll-smooth scrollbar-hide"
          ref={listRef}
          style={{ scrollBehavior: "smooth", overflowX: "scroll" }}
        >
          {props.collection.movies.map((movie) => (
            <MovieCard
              key={movie._id}
              _id={movie._id}
              name={movie.name}
              directors={movie.directors.name}
              year={movie.year}
              poster={movie.poster}
              cast={movie.cast}
              genres={movie.genres}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={scrollLeft}
          className="m-1 p-2 bg-gray-800/50 rounded-full hover:bg-gray-800/75 absolute left-0"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
          <span className="sr-only">Previous</span>
        </button>

        <button
          type="button"
          onClick={scrollRight}
          className="m-1 p-2 bg-gray-800/50 rounded-full hover:bg-gray-800/75 absolute right-0"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
          <span className="sr-only">Next</span>
        </button>
      </div>
    </div>
  );
}
