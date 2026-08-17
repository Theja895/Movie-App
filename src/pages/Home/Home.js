import { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import MovieCard from '../../components/MovieCard/MovieCard'
import { fetchWithAuth } from '../../api/api'
import './Home.css'

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([])
  const [topRatedMovies, setTopRatedMovies] = useState([])
  const [originalMovies, setOriginalMovies] = useState([])

  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const getMovies = async () => {
      try {
        setIsLoading(true)
        setErrorMessage('')

        const [
          trendingData,
          topRatedData,
          originalsData,
        ] = await Promise.all([
          fetchWithAuth(
            '/api/movies-app/trending-movies'
          ),
          fetchWithAuth(
            '/api/movies-app/top-rated-movies'
          ),
          fetchWithAuth(
            '/api/movies-app/originals'
          ),
        ])

        setTrendingMovies(trendingData.results)
        setTopRatedMovies(topRatedData.results)
        setOriginalMovies(originalsData.results)
      } catch (error) {
        console.error('Home API error:', error)

        setErrorMessage(
          'Unable to get movies. Please try again.'
        )
      } finally {
        setIsLoading(false)
      }
    }

    getMovies()
  }, [])

  const renderMovies = movies => {
    return (
      <div className="movies-list">
        {movies.map(movie => (
          <MovieCard
            key={movie.id}
            movie={movie}
          />
        ))}
      </div>
    )
  }

  const featuredMovie = trendingMovies[0]

  return (
    <div className="home-page">
      <Header />

      {isLoading && (
        <p className="loading">
          Loading movies...
        </p>
      )}

      {errorMessage && (
        <p className="error-message">
          {errorMessage}
        </p>
      )}

      {!isLoading && !errorMessage && (
        <>
          {featuredMovie && (
            <section
              className="hero-section"
              style={{
                backgroundImage: `url(${featuredMovie.backdrop_path})`,
              }}
            >
              <div className="hero-overlay">
                <div className="hero-content">

                  <h1>{featuredMovie.title}</h1>

                  <p>
                    {featuredMovie.overview}
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      window.location.href = `/movie/${featuredMovie.id}`
                    }
                  >
                    View Details
                  </button>

                </div>
              </div>
            </section>
          )}

          <main className="home-container">

            <section className="movie-section">
              <h2>Trending Now</h2>

              {renderMovies(trendingMovies)}
            </section>

            <section className="movie-section">
              <h2>Top Rated</h2>

              {renderMovies(topRatedMovies)}
            </section>

            <section className="movie-section">
              <h2>Originals</h2>

              {renderMovies(originalMovies)}
            </section>

          </main>
        </>
      )}
    </div>
  )
}

export default Home