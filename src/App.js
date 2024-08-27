import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './Home'
import QuizGame from './QuizGame'
import GameResults from './GameResults'
import GameReports from './GameReports'
import NotFound from './NotFound' // Import the NotFound component

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/quiz-game" component={QuizGame} />
          <Route path="/game-results" component={GameResults} />
          <Route path="/game-report" component={GameReports} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    )
  }
}

export default App
