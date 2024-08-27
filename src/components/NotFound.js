import {Component} from 'react'
import 'NotFound.css'

class NotFound extends Component {
  render() {
    return (
      <div className="not-found">
        <img
          src="https://res.cloudinary.com/dm5ihvf8p/image/upload/v1724744560/Group_7519_c3cwae.png"
          alt="not found"
        />
        <h1>404</h1>
        <p>Page Not Found</p>
      </div>
    )
  }
}

export default NotFound
