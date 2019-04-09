import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import "./Nav.css"


class Nav extends Component {
    render(){
        return (
            <div className="nav-container">
                <ul className="nav-flex">
                    <div className="ternary-nav">
                        <li id="list1" className="nav-list"><Link to='/dashboard'>Dashboard</Link></li>
                        <li id="list1" className="nav-list"><Link to='/upload'>Upload Images</Link></li>
                        <li id="list1" className="nav-list"><Link to='/login'>Login</Link></li>
                        <li id="list1" className="nav-list"><Link to='/register'>Register</Link></li>
                        <li id="list1" className="nav-list" onClick={() => this.props.doLogOutUser()}>Logout</li>
                    </div>
                </ul>
            </div>
        )
    }
}

export default Nav