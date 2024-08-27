import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {getAuthToken} from '../utils/auth' // Assuming this function is used to get the auth token
import 'GameResults.css'

class GameResults extends Component {
  constructor(props) {
    super(props)
    this.state = {
      correctAnswersCount: 0, // To store the number of correct answers
      loading: true,
      error: null,
    }
  }

  async componentDidMount() {
    this.fetchResults()
  }

  fetchResults = async () => {
    const token = getAuthToken() // Assume this function gets your auth token
    try {
      const response = await fetch('/api/results', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // If authentication is needed
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch results')
      }

      const data = await response.json()
      this.setState(
        {correctAnswersCount: data.correctAnswersCount, loading: false},
        this.evaluatePerformance,
      )
    } catch (error) {
      this.setState({error: error.message, loading: false})
    }
  }

  evaluatePerformance = () => {
    const {correctAnswersCount} = this.state
    if (correctAnswersCount > 5) {
      this.props.history.push('/congrats') // Navigate to the congratulations page
    } else {
      this.props.history.push('/failure') // Navigate to the failure page
    }
  }

  isSuccess = state?.result === 'success'

  render() {
    const {loading, error} = this.state

    if (loading) {
      return (
        <div className="loader-container" data-testid="loader">
          <Loader type="ThreeDots" color="#263868" height={50} width={50} />
        </div>
      )
    }

    if (error) {
      return (
        <div className="error-view">
          <p>{error}</p>
        </div>
      )
    }

    ;<div>
      {isSuccess ? (
        <div>
          <h1>Congratulations!</h1>
          <img
            src="https://res.cloudinary.com/dm5ihvf8p/image/upload/v1724744235/trophy_1_ekzwft.png"
            alt="congrats"
          />
          <p>You've achieved a great result!</p>
        </div>
      ) : (
        <div>
          <h1>Sorry, you didn't make it this time</h1>
          <img
            src="https://res.cloudinary.com/dm5ihvf8p/image/upload/v1724744461/Group_1_kknxub.png"
            alt="lose"
          />
          <p>Better luck next time!</p>
        </div>
      )}
    </div>

    return null // Render nothing as navigation will occur
  }
}

export default withRouter(GameResults)
