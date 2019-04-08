import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route, withRouter } from 'react-router-dom'
import Login from './Components/Auth/Login/Login'
import Register from './Components/Auth/Register/Register'
import Nav from './Components/Nav/Nav'

class App extends Component {
  doLoginUser = async (user) => {
    try {
      const loginResponse = await fetch(
        `${process.env.REACRT_APP_API_URL}/auth/login`,
        {
          method: "POST",
          credentials: "include",
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json"
          }
        }
      )

      if (!loginResponse.ok) {
        throw Error(loginResponse.statusText)
      }

      const parsedResponse = await loginResponse.json();
      if (parsedResponse.message === "Login successful") {
        this.setState({
          loggedUser: parsedResponse.data
        });

        this.props.history.push(`/dashboard`);
        console.log(parsedResponse, 'logged in')
      } else {
        this.setState({
          loginError: parsedResponse.message
        })
      }

    }
    catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <div>
        <Nav/>
        <h1>PhotoCopy</h1>
        <Switch>
          <Route exact path="/register" component={() => <Register />} />
          <Route exact path="/login" component={(...props) => <Login doLoginUser={this.doLoginUser} />} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
