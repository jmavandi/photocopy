import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Register extends Component {
    state = {
        email: '',
        name: '',
        password: ''
    }

    doHandleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = async e => {
        e.preventDefault();
        const newUser = {
            email: this.state.email,
            name: this.state.name,
            password: this.state.password,
        }

        try {
            const loginResponse = await fetch(`${process.env.REACT_APP_API_URL}/creators`,
                {
                    method: "POST",
                    credentials: "include",
                    body: JSON.stringify(newUser),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

            if (!loginResponse.ok) {
                throw Error(loginResponse.statusText)
            }

            const parsedResponse = await loginResponse.json()

            if (parsedResponse.message === "Registration successful") {
                this.props.history.push('/dashboard')
            }
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        return (
            <div>
                <form
                    onSubmit={this.handleSubmit}
                >
                    <input
                        type="name"
                        placeholder="username"
                        value={this.state.name}
                        onChange={this.handelChange}
                    />
                    <input
                        type="email"
                        placeholder="email"
                        value={this.state.email}
                        onChange={this.handelChange}
                    />
                    <input
                        type="email"
                        placeholder="email"
                        value={this.state.password}
                        onChange={this.handelChange}
                    />
                    <button onSubmit={this.handleSubmit}>
                        Register
                    </button>
                </form>
            </div>
        )
    }
}

export default withRouter(Register)