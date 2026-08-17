import { useState } from 'react'
import Header from '../../components/Header/Header'
import MovieCard from '../../components/MovieCard/MovieCard'
import { fetchWithAuth } from '../../api/api'
import './Search.css'

const Search = () => {
  const [searchText, setSearchText] = useState('')
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSearch = async event => {
    event.preventDefault()

    const query = searchText.trim()

    if (!query) {
      setMovies([])
      setSearched(false)
      setErrorMessage('')
      return
    }

    try {
      setIsLoading(true)
      setSearched(true)
      setErrorMessage('')

      const data = await fetchWithAuth(
        `/api/movies-app/movies-search?search=${encodeURIComponent(
          query
        )}`
      )

      setMovies(data.results || [])
    } catch (error) {
      console.error('Search error:', error)

      setMovies([])
      setErrorMessage(
        'Something went wrong. Please try again.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="search-page">
      <Header />

      <main className="search-container">

        <form
          className="search-form"
          onSubmit={handleSearch}
        >
          <input
            type="search"
            value={searchText}
            onChange={event =>
              setSearchText(event.target.value)
            }
            placeholder="Search for movies"
            aria-label="Search for movies"
          />

          <button type="submit">
            Search
          </button>
        </form>

        {isLoading && (
          <div className="search-status">
            <p>Searching...</p>
          </div>
        )}

        {errorMessage && !isLoading && (
          <div className="search-status">
            <p>{errorMessage}</p>
          </div>
        )}

        {!isLoading &&
          !errorMessage &&
          searched &&
          movies.length === 0 && (
            <div className="no-results">
              <h2>No Search Results Found</h2>

              <p>
                Try searching with a different movie name.
              </p>
            </div>
          )}

        {!isLoading &&
          !errorMessage &&
          movies.length > 0 && (
            <section className="search-results">
              <h1>Search Results</h1>

              <div className="movies-list">
                {movies.map(movie => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                  />
                ))}
              </div>
            </section>
          )}

      </main>
    </div>
  )
}

export default Search