import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleCreateAQuestion } from '../actions/shared.js'
import { Panel, FormGroup, FormControl, 
        Button, Glyphicon } from 'react-bootstrap'

class NewQuestion extends Component {

  defaultState =  {
    optionOneText: '',
    optionTwoText: '',
    disabled: true,
    toHome: false
  }
  state = this.defaultState

  handleChange = (e) => {
    const optionText = e.target.id
    const text = e.target.value
    this.setState({
      [optionText]: text
    }, () => {
      this.state.optionOneText && this.state.optionTwoText
        ? this.setState({ disabled: false })
        : this.setState({ disabled: true })
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { state: { optionOneText, optionTwoText}, props: { authedUser, dispatch} } = this
    dispatch(handleCreateAQuestion(authedUser, optionOneText, optionTwoText))
    this.setState({
      ...this.defaultState,
      toHome: true
    })
  }

  renderForm = () => (
    <Panel bsStyle="info">
      <Panel.Heading>
        <Panel.Title componentClass="h3">
          
          
          Write A  New Question
        </Panel.Title>
      </Panel.Heading>
      <Panel.Body>
        <h4>Would you rather...</h4>
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <FormControl
              id="optionOneText"
              type="text"
              placeholder=" Please Enter the First Choice"
              required
              onChange={this.handleChange}/>
          </FormGroup>
        
          <FormGroup>
            <FormControl
              required
              id="optionTwoText"
              type="text"
              placeholder="Please Enter the Second Choice"
              onChange={this.handleChange}/>
          </FormGroup>
          <Button disabled={this.state.disabled} type="submit" bsStyle="success">
            <span><Glyphicon glyph="send" /> Submit</span>
          </Button>
        </form>
      </Panel.Body>
    </Panel>
  )

  render() {
    return this.state.toHome ? <Redirect to='/' /> : this.renderForm()
  }
}

function mapStateToProps ({ authedUser }) {
  return { authedUser }
}

export default connect(mapStateToProps)(NewQuestion)