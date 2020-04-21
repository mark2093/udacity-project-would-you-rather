import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { getAuthedLoggedout } from '../actions/authedUser'
import { Navbar, Nav, NavItem,
        MenuItem, NavDropdown, Image } from 'react-bootstrap'

class Header extends Component {

  logout = (e) => {
    e.preventDefault()
    this.props.dispatch(getAuthedLoggedout())
  }

  getNavItems = () => (
    <Nav>
      <LinkContainer to="/" activeClassName='active-link'>
        <NavItem>
          Home
        </NavItem>
      </LinkContainer>
      <LinkContainer to="/add" activeClassName='active-link'>
        <NavItem>New Poll Question</NavItem>
        </LinkContainer>
        <LinkContainer to="/leaderboard" activeClassName='active-link'>
      <NavItem>Leaderboard</NavItem>
      </LinkContainer>
      {
        this.props.userIsAuthed ?
      <NavDropdown pullRight title={  this.getUserInfo()  }  id="basic-nav-dropdown">
        <MenuItem  href="/" onClick={this.logout}>Logout</MenuItem>
      </NavDropdown>
      : null
    }
    </Nav>
  )

  getUserInfo = () => (
    <span className="navbar-user-info">
      <span className="loggedin">{this.props.username}</span>
      <Image circle className="avatar" src={this.props.avatar} />
    </span>
  )

  render() {
    return (
      <Navbar inverse collapseOnSelect>
        
              <Navbar.Header>
                <Navbar.Brand>
                  <NavLink to='/'>
                    Would You Rather
                  </NavLink>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                {this.getNavItems()}
              </Navbar.Collapse>
           
      </Navbar>
    )
  }
}

function mapStateToProps ({ authedUser, users }) {
  return {
    userIsAuthed: authedUser !== null,
    username: users[authedUser] ? users[authedUser].name : null,
    avatar: users[authedUser] ? users[authedUser].avatarURL : null
  }
}

export default connect(mapStateToProps)(Header)