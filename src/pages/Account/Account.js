import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header'
import './Account.css'

const Account = () => {
  const navigate = useNavigate()

  const username =
    localStorage.getItem('username') || 'User'

  const handleLogout = () => {
    localStorage.removeItem('jwt_token')
    localStorage.removeItem('username')

    navigate('/login', { replace: true })
  }

  return (
    <div className="account-page">
      <Header />

      <main className="account-container">
        <div className="account-card">

          <div className="profile-icon">
            👤
          </div>

          <h1>My Account</h1>

          <p className="account-welcome">
            Welcome to Movies App
          </p>

          <div className="account-info">

            <div className="info-row">
              <span>Username</span>

              <strong>
                {username}
              </strong>
            </div>

            <div className="info-row">
              <span>Account Status</span>

              <strong>
                Active
              </strong>
            </div>

          </div>

          <button
            type="button"
            className="account-logout"
            onClick={handleLogout}
          >
            Logout
          </button>

          <button
            type="button"
            className="home-button"
            onClick={() => navigate('/home')}
          >
            Back to Home
          </button>

        </div>
      </main>
    </div>
  )
}

export default Account