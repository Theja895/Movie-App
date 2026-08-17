import { Link } from 'react-router-dom'
import './MovieCard.css'

const MovieCard = ({ movie }) => {
  return (
    <Link
      to={`/movie/${movie.id}`}
      className="movie-card-link"
    >
      <div className="movie-card">

        <img
          src={movie.poster_path}
          alt={movie.title}
          className="movie-image"
        />

        <h3 className="movie-title">
          {movie.title}
        </h3>

      </div>
    </Link>
  )
}

export default MovieCard