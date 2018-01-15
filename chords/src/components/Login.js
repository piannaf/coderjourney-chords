import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Toaster, Intent } from "@blueprintjs/core"

import { app, twitterProvider } from '../base'

const loginStyles = {
  width: "90%",
  maxWidth: "315px",
  margin: "20px auto",
  border: "1px solid #ddd",
  borderRadius: "5px",
  padding: "10px"
};

class Login extends Component {
  constructor() {
    super()

    this.authWithTwitter = this.authWithTwitter.bind(this)
    this.authWithEmailPassword = this.authWithEmailPassword.bind(this)

    this.state = {
      redirect: false
    }
  }

  authWithTwitter() {
    app.auth().signInWithPopup(twitterProvider)
      .then((user, error) => {
        if (error) {
          this.toaster.show({
            intent: Intent.DANGER,
            message: "Unable to sign in with Twitter"})
        } else {
          this.props.setCurrentUser(user)
          this.setState({ redirect: true })
        }
      })
  }

  authWithEmailPassword(event) {
    event.preventDefault()

    const email = this.emailInput.value
    const password = this.passwordInput.value

    app.auth().fetchProvidersForEmail(email)
      .then((providers) => {
        if (providers.length === 0) {
          return app.auth().createUserWithEmailAndPassword(email, password)
        } else if (providers.indexOf("password") === -1) {
          this.loginForm.reset()
          this.toaster.show({
            intent: Intent.WARNING,
            message: "Try alternative login."
          })
        } else {
          return app.auth().signInWithEmailAndPassword(email, password)
        }
      })
      .then((user) => {
        if (user && user.email) {
          this.loginForm.reset()
          this.props.setCurrentUser(user)
          this.setState({ redirect: true })
        }
      })
      .catch((error) => {
        this.toaster.show({ intent: Intent.DANGER, message: error.message })
      })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirect } = this.state

    if (redirect) {
      return (
        <Redirect to={from} />
      )
    }

    return (
      <div style={loginStyles}>
        <Toaster ref={(element) => {this.toaster = element }} />
        <button style={{ width: "100%"}}
                className="pt-button pt-intent-primary"
                onClick={() => this.authWithTwitter()}>
          Log in with Twitter
        </button>
        <hr style={{marginTop: "10px", marginBottom: "10px"}} />
        <form onSubmit={(event) => this.authWithEmailPassword(event)}
              ref={(form) => {this.loginForm = form }}>
          <div style={{marginBottom: "10px"}}
               className="pt-callout pt-icon-info-sign">
            <h5>Note</h5>
            If you don't have an account already, this form will create one.
          </div>
          <label className="pt-label">
            Email
            <input style={{width: "100%"}}
                   className="pt-input"
                   name="email"
                   type="email"
                   required
                   ref={(input) => {this.emailInput = input}}
                   placeholder="Email">
            </input>
          </label>
          <label className="pt-label">
            Password
            <input style={{width: "100%"}}
                   className="pt-input"
                   name="password"
                   type="password"
                   required
                   ref={(input) => {this.passwordInput = input}}
                   placeholder="Password">
            </input>
          </label>
          <input style={{width: "100%"}}
                 className="pt-button pt-intent-primary"
                 type="submit"
                 value="Log In">
          </input>
        </form>
      </div>
    )
  }
}

export default Login
