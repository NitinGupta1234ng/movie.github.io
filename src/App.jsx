import { useState, useEffect } from "react";
import './App.css'
import SearchIcon from "./Search.svg";
import MovieCard from "./MovieCard";

const API_URL = 'http://www.omdbapi.com?apikey=2026d31a' 
//'https://movies-api14.p.rapidapi.com/shows '

const movie = { 
"Title": "Batman begins",
"year":"2005",
"imdbID": "tt0372784",
"type":"movie",
"Poster":"https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFLMC00ZjcyLTg3YjETMDQyM2zJYZQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
}

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    if (data.Search) {
      setMovies(data.Search);
    } else {
      setMovies([]);
    }
  };

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  return (
    <div className="app">
      <h1>MovieSpace</h1>

      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No Movies Found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
