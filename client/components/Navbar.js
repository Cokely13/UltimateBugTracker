import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'


const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    {/* <h1>Ultimate Bug Tracker</h1> */}
    <nav className="navbar navbar-expand-lg bg-info text-uppercase font-weight-bold" >
    {isLoggedIn ? (
  <div className="container-fluid">
    <a className="navbar-brand" href="/home" style={{marginLeft: "25px", marginRight: "25px"}}>Home</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/profile" style={{marginLeft: "25px", marginRight: "25px"}}>Profile</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/bugs" style={{marginLeft: "25px", marginRight: "25px"}}>Bugs</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/bugs/add" style={{marginLeft: "25px", marginRight: "25px"}}>Add Bug</a>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown"  role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{marginLeft: "25px", marginRight: "25px"}}>
            By Priority
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="/bugs/high">High</a></li>
            <li><a className="dropdown-item" href="/bugs/medium">Medium</a></li>
            <li><a className="dropdown-item" href="/bugs/low">Low</a></li>
          </ul>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/projects" style={{marginLeft: "25px", marginRight: "25px"}}>Projects</a>
        </li>
        <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown"  role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{marginLeft: "25px", marginRight: "25px"}}>
            By Status
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="/bugs/new">New</a></li>
            <li><a className="dropdown-item" href="/bugs/working">Working</a></li>
            <li><a className="dropdown-item" href="/bugs/fixed">Fixed</a></li>
          </ul>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/users" style={{marginLeft: "25px", marginRight: "25px"}}>Users</a>
        </li>
        <li className="nav-item">
      <a className="nav-link" href="#" onClick={handleClick} style={{marginLeft: "25px", marginRight: "25px"}}>
            Logout
          </a>
          </li>
      </ul>
    </div>
  </div> ): (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
  </div>
)



/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
