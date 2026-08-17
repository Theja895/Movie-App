import { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import MovieCard from '../../components/MovieCard/MovieCard'
import { fetchWithAuth } from '../../api/api'
import './Popular.css'

const Popular = () => {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const getPopularMovies = async () => {
      try {
        setIsLoading(true)
        setErrorMessage('')

        const data = await fetchWithAuth(
          '/api/movies-app/popular-movies'
        )

        setMovies(data.results)
      } catch (error) {
        console.error(error)
        setErrorMessage(
          'Unable to get popular movies.'
        )
      } finally {
        setIsLoading(false)
      }
    }

    getPopularMovies()
  }, [])

  return (
    <div className="popular-page">
      <Header />

      <main className="popular-container">
        <h1>Popular Movies</h1>

        {isLoading && (
          <p className="loading">
            Loading popular movies...
          </p>
        )}

        {errorMessage && (
          <p className="error-message">
            {errorMessage}
          </p>
        )}

        {!isLoading && !errorMessage && (
          <div className="movies-list">
            {movies.map(movie => (
              <MovieCard
                key={movie.id}
                movie={movie}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default Popular