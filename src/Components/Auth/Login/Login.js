import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Login extends Component {

    state = {
        email: '',
        password: ''
    }

    doHandleInput = (e) => {
        this.setState({
            [e.target.name]:  e.target.value
        })
    }

    doHandleSubmit = (e) => {
        e.preventDefault()
        this.props.doLoginUser(this.state)
    }

    render(){
        return(
            <div>
                <form onSubmit={this.doHandleSubmit}>
                <input type='email' name='email' value={this.state.email} onChange={this.doHandleInput}/>
                <input type='password' name='password' value={this.state.password} onChange={this.doHandleInput}/>
                <button type='submit'> Login </button>
                </form>
            </div>
        )
    }
}


export default withRouter(Login)