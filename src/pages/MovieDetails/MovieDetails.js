import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import Header from '../../components/Header/Header'
import { fetchWithAuth } from '../../api/api'
import './MovieDetails.css'

const MovieDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [movie, setMovie] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        setIsLoading(true)
        setErrorMessage('')

        const data = await fetchWithAuth(
          `/api/movies-app/movies/${id}`
        )

        setMovie(data.movie_details)
      } catch (error) {
        console.error('Movie details error:', error)

        setErrorMessage(
          'Unable to get movie details. Please try again.'
        )
      } finally {
        setIsLoading(false)
      }
    }

    getMovieDetails()
  }, [id])

  if (isLoading) {
    return (
      <div className="movie-details-page">
        <Header />

        <div className="details-status">
          <p>Loading movie details...</p>
        </div>
      </div>
    )
  }

  if (errorMessage) {
    return (
      <div className="movie-details-page">
        <Header />

        <div className="details-status">
          <p>{errorMessage}</p>

          <button
            type="button"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="movie-details-page">
      <Header />

      {movie && (
        <>
          {/* Backdrop */}
          <section
            className="movie-backdrop"
            style={{
              backgroundImage: `url(${movie.backdrop_path})`,
            }}
          >
            <div className="backdrop-overlay">
              <div className="details-main">

                <img
                  src={movie.poster_path}
                  alt={movie.title}
                  className="details-poster"
                />

                <div className="details-info">

                  <h1>{movie.title}</h1>

                  <div className="movie-meta">
                    <span>
                      {movie.adult ? 'A' : 'U/A'}
                    </span>

                    <span>
                      {movie.runtime} min
                    </span>

                    <span>
                      {movie.release_date}
                    </span>
                  </div>

                  <p className="details-overview">
                    {movie.overview}
                  </p>

                  <div className="rating">
                    <span>⭐</span>

                    <strong>
                      {movie.vote_average}
                    </strong>

                    <span>
                      / 10
                    </span>
                  </div>

                  <div className="genres">
                    {movie.genres?.map(genre => (
                      <span key={genre.id}>
                        {genre.name}
                      </span>
                    ))}
                  </div>

                </div>

              </div>
            </div>
          </section>

          {/* Additional information */}
          <section className="additional-details">

            <h2>Movie Information</h2>

            <div className="details-grid">

              <div>
                <p>Budget</p>
                <strong>
                  {movie.budget || 'Not available'}
                </strong>
              </div>

              <div>
                <p>Revenue</p>
                <strong>
                  {movie.revenue || 'Not available'}
                </strong>
              </div>

              <div>
                <p>Runtime</p>
                <strong>
                  {movie.runtime
                    ? `${movie.runtime} minutes`
                    : 'Not available'}
                </strong>
              </div>

              <div>
                <p>Release Date</p>
                <strong>
                  {movie.release_date ||
                    'Not available'}
                </strong>
              </div>

            </div>

            <button
              type="button"
              className="back-button"
              onClick={() => navigate(-1)}
            >
              ← Back
            </button>

          </section>
        </>
      )}
    </div>
  )
}

export default MovieDetails