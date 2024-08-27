import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import 'Home.css'

class Home extends Component {
  // Constructor to initialize state
  constructor(props) {
    super(props)
    this.state = {
      // Any initial state can be set here if needed
    }
  }

  // Method to handle the button click and navigate to the Quiz Game Route
  handleStartQuiz = () => {
    this.props.history.push('/quiz-game') // Navigate to the Quiz Game Route
  }

  render() {
    return (
      <div className="home-container">
        <h1>Welcome to the Home Page</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/quiz-game-start-the-quiz-img.png "
          alt="start quiz game"
        />
        <button onClick={this.handleStartQuiz} className="start-quiz-button">
          Start Quiz
        </button>
      </div>
    )
  }
}

export default withRouter(Home)
