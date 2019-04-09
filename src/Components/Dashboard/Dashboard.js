import React, { Component } from 'react'

class Dashboard extends Component {
    render() {
        return (
            <div>
                <h1>THIS IS THE DASHBOARD</h1>
                <div>{this.props.loggedUser.name}</div>
                <div>{this.props.loggedUser.email}</div>
                <button onClick={this.props.doDeleteUser}>Delete</button>
                <div>

                </div>
            </div>
        )
    }
}

export default Dashboard