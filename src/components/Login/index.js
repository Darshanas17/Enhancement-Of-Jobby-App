import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onClickLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const loginDetails = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(loginDetails),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    if (response.ok === true) {
      this.showSuccess(data.jwt_token)
    } else {
      this.showFailureText(data.error_msg)
    }
  }

  showSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {
      expires: 20,
    })
    console.log(jwtToken)
    const {history} = this.props
    history.replace('/')
  }

  showFailureText = error => {
    this.setState({errorMsg: error})
  }

  render() {
    const {username, password, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="bg-cont">
        <div className="app-cont">
          <div className="login-cont">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="login-logo"
            />
            <form className="form-container" onSubmit={this.onClickLogin}>
              <label htmlFor="username" className="input-label">
                USERNAME
              </label>
              <input
                id="username"
                type="text"
                value={username}
                placeholder="Username"
                className="input-container"
                onChange={this.onChangeUsername}
              />
              <label htmlFor="password" className="input-label">
                PASSWORD
              </label>
              <input
                id="password"
                type="password"
                value={password}
                placeholder="Password"
                className="input-container"
                onChange={this.onChangePassword}
              />
              <button className="login-button" type="submit">
                Login
              </button>
              {errorMsg.length !== 0 && (
                <p className="error-message">*{errorMsg}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    )
  }
}
export default Login
