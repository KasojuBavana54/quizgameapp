import React from 'react'
import {useHistory} from 'react-router-dom'

const Results = () => {
  const {userResults} = useAuth() // Retrieve user results from context
  const history = useHistory()

  const handleReport = () => {
    history.push('/report')
  }

  return (
    <div>
      {userResults.correctAnswers > 5 ? (
        <p>Congratulations! You won the quiz.</p>
      ) : (
        <p>Sorry, you lost. Better luck next time.</p>
      )}
      <button onClick={handleReport}>View Report</button>
    </div>
  )
}

export default Results
