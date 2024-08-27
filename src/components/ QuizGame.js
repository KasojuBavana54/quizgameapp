import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import 'QuizGame.css'

class QuizGame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      questions: [],
      currentQuestionIndex: 0,
      selectedOption: null,
      timer: 15,
      isTimerActive: true,
      loading: true,
      error: null,
      showSubmitButton: false,
      Loader: true,
    }
    this.timerId = null
  }

  componentDidMount() {
    this.fetchQuestions()
  }

  componentWillUnmount() {
    // Clean up timer on unmount
    clearInterval(this.timerId)
  }

  fetchQuestions = async () => {
    const token = getAuthToken() // Assume this function gets your auth token
    try {
      const response = await fetch('https://apis.ccbp.in/assess/questions', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // If authentication is needed
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch questions')
      }

      const data = await response.json()
      this.setState(
        {questions: data.questions, loading: false},
        this.startTimer,
      )
    } catch (error) {
      this.setState({error: error.message, loading: false})
    }
  }

  startTimer = () => {
    this.timerId = setInterval(() => {
      this.setState(prevState => {
        if (prevState.timer === 1) {
          clearInterval(this.timerId)
          this.handleTimeOut()
          return {timer: 0}
        }
        return {timer: prevState.timer - 1}
      })
    }, 1000)
  }

  handleTimeOut = () => {
    this.setState({isTimerActive: false, selectedOption: null})
    this.showNextQuestion()
  }

  handleOptionSelect = option => {
    clearInterval(this.timerId)
    this.setState({selectedOption: option, isTimerActive: false})
  }

  showNextQuestion = () => {
    const {currentQuestionIndex, questions} = this.state
    if (currentQuestionIndex < questions.length - 1) {
      this.setState(
        prevState => ({
          currentQuestionIndex: prevState.currentQuestionIndex + 1,
          timer: 15,
          isTimerActive: true,
          selectedOption: null,
          showSubmitButton:
            prevState.currentQuestionIndex === questions.length - 2,
        }),
        this.startTimer,
      )
    } else {
      this.endQuiz()
    }
  }

  endQuiz = () => {
    this.props.history.push('/results')
  }

  handleRetry = () => {
    this.setState({error: null, loading: true}, this.fetchQuestions)
  }

  render() {
    const {
      questions,
      currentQuestionIndex,
      selectedOption,
      timer,
      loading,
      error,
      showSubmitButton,
    } = this.state
    const currentQuestion = questions[currentQuestionIndex]
    const options = currentQuestion ? currentQuestion.options : []

    return (
      <div className="quiz-game">
        {loading && <div className="loader">Loading...</div>}
        {error && (
          <div className="error-view">
            <p>{error}</p>
            <button onClick={this.handleRetry}>Retry</button>
          </div>
        )}
        {!loading && !error && currentQuestion && (
          <div className="question-container">
            <h2>{currentQuestion.text}</h2>
            <div className="options-container">
              {options.map((option, index) => (
                <div
                  key={index}
                  className={`option ${
                    selectedOption === option ? 'selected' : ''
                  }`}
                  onClick={() => this.handleOptionSelect(option)}
                >
                  {currentQuestion.option_type === 'DEFAULT' && (
                    <span>{option.text}</span>
                  )}
                  {currentQuestion.option_type === 'IMAGE' && (
                    <img src={option.imageUrl} alt={option.text} />
                  )}
                  {currentQuestion.option_type === 'SINGLE SELECT' && (
                    <input type="radio" name="option" />
                  )}
                </div>
              ))}
            </div>
            <div className="timer">Time left: {timer}sec</div>
            <button
              className="next-button"
              disabled={!selectedOption}
              onClick={this.showNextQuestion}
            >
              ..
              {showSubmitButton ? 'Submit' : 'Next Question'}
            </button>
          </div>
        )}
        <div className="loader-container" data-testid="loader">
          <Loader type="ThreeDots" color="#263868" height={50} width={50} />
        </div>
      </div>
    )
  }
}

export default withRouter(QuizGame)
