import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import './AppNavBar.css';

class AppNavBar extends Component {
  render() {
    return (
      <nav className="navbar">
        <Link to="/">
          Contableezee
        </Link>
        <div className="navbar--logo">
          <button
            className="btn"
            type="button"
            data-toggle="collapse"
            data-target="#navbarMain">
            <span>|§|</span>
          </button>
          <div className="navbar-list" id="navbarMain">
            <ul className="navbar--item">
              <li>
                <Link to="/">Dashboard</Link>
                {/* <Link to="/clientes">Clientes</Link> */}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}
export default AppNavBar;