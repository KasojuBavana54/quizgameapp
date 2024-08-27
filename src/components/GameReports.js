import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import 'GameReports.css'

class GameReports extends Component {
  constructor(props) {
    super(props)
    this.state = {
      results: null, // Stores results of the exam
      questions: [], // Stores the list of questions
      loading: true,
      error: null,
    }
  }

  componentDidMount() {
    this.fetchResultsAndQuestions()
  }

  fetchResultsAndQuestions = async () => {
    const token = getAuthToken() // Assume this function gets your auth token
    try {
      // Fetch results
      const resultsResponse = await fetch('/api/results', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (!resultsResponse.ok) {
        throw new Error('Failed to fetch results')
      }

      const resultsData = await resultsResponse.json()
      const {correctAnswersCount, answers} = resultsData // Assume these are part of the result

      // Fetch questions
      const questionsResponse = await fetch('/api/questions', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (!questionsResponse.ok) {
        throw new Error('Failed to fetch questions')
      }

      const questionsData = await questionsResponse.json()

      this.setState({
        results: {
          correctAnswersCount,
          answers,
        },
        questions: questionsData.questions,
        loading: false,
      })
    } catch (error) {
      this.setState({error: error.message, loading: false})
    }
  }

  render() {
    const {results, questions, loading, error} = this.state

    if (loading) {
      return <div className="loader">Loading...</div>
    }

    if (error) {
      return (
        <div className="error-view">
          <p>{error}</p>
        </div>
      )
    }

    const unattemptedQuestions = questions.filter(q => !results.answers[q.id])
    const correctAnswers = new Map(questions.map(q => [q.id, q.correctOption]))

    return (
      <div className="game-reports">
        <h1>Game Report</h1>
        <div className="results-summary">
          <h2>Results</h2>
          <p>Correct Answers: {results.correctAnswersCount}</p>
        </div>
        <div className="questions-report">
          <h2>Questions Report</h2>
          {questions.map(question => (
            <div key={question.id} className="question-report">
              <h3>{question.text}</h3>
              <div className="options">
                {question.options.map(option => (
                  <div
                    key={option.id}
                    className={`option ${
                      results.answers[question.id] === option.id
                        ? 'selected'
                        : ''
                    }`}
                  >
                    {option.text}
                    {results.answers[question.id] === option.id &&
                    results.answers[question.id] === question.correctOption ? (
                      <span className="correct"> (Correct)</span>
                    ) : results.answers[question.id] === option.id ? (
                      <span className="incorrect"> (Incorrect)</span>
                    ) : null}
                  </div>
                ))}
                {unattemptedQuestions.some(q => q.id === question.id) && (
                  <div className="unattempted">
                    <p>
                      Unattempted - Correct Option:{' '}
                      {correctAnswers.get(question.id)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default withRouter(GameReports)
