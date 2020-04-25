import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getAuthedLoggedin } from '../actions/authedUser'
import {
  Row, Col, Panel, Button, FormGroup,
  FormControl, Glyphicon, Image
} from 'react-bootstrap'

class SignIn extends Component {

  state = {
    imgSrc: './users.png',
    userToSignIn: null,
    disabled: true,
    redirectToReferrer: false
  }

  handleChange = (e) => {
    const { [e.target.value]: selectedUser } = this.props.users
    this.setState({
      imgSrc: selectedUser.avatarURL,
      userToSignIn: selectedUser.id
    }, () => {
      if (this.state.userToSignIn) {
        this.setState({
          disabled: false,

        })
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.dispatch(getAuthedLoggedin(this.state.userToSignIn))
    this.setState({ redirectToReferrer: true })
  }

  renderForm = () => (
    <form onSubmit={this.handleSubmit}>
      <FormGroup controlId="formControlsSelect">
        <FormControl componentClass="select" onChange={this.handleChange}>
          <option hidden value="default">Select a user...</option>
          {(Object.values(this.props.users)).map((user) => (
            <option key={user.id} value={user.id}>
              {user.id}
            </option>
          ))}
        </FormControl>
      </FormGroup>
      <Button
        disabled={this.state.disabled}
        type="submit" bsStyle="info">
        Sign In
      </Button>
    </form>
  )
  loginCheck = () => {

    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state
    if (redirectToReferrer === true) {
      return <Redirect to={from} />
    }
  }

  render() {
    console.log("SignIn userToSignIn", this.state.userToSignIn)
    console.log("SignIn redirectToReferrer", this.state.redirectToReferrer)
    console.log("SignIn this.props.location.state", this.props.location.state)
    

    return (
      <Row>
        <Col xs={6} xsOffset={3}>
          <Panel bsStyle="primary">
            <Panel.Heading>
              <Panel.Title componentClass="h3">
                <Glyphicon glyph="user" />
              Log In
            </Panel.Title>
            </Panel.Heading>
            <Panel.Body className="signin">
              <Image src={this.state.imgSrc} />
              {this.renderForm()}
              {this.loginCheck()}
            </Panel.Body>
          </Panel>
        </Col>
      </Row>
    );
  }
}
function mapStateToProps({ users, redirectToReferrer }) {
  return { users, redirectToReferrer }
}

export default connect(mapStateToProps)(SignIn)