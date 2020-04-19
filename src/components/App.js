import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'    
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading-bar'
import { getCurrentAuthedUser } from '../actions/authedUser'
import { fetchInitialData  } from '../actions/shared'
import QuestionsContainer from './QuestionsContainer'
import Leaderboard from './Leaderboard'
import SignIn from './SignIn'
import Header  from './Header'
import MainPage from './MainPage'
import NewQuestion from './NewQuestion'

// CSS & BootStrap imports
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Grid, Row, Col } from 'react-bootstrap'


class App extends Component {
  componentDidMount() {
    this.props.getAuth(getCurrentAuthedUser())
    this.props.getData(fetchInitialData())
  }
  nonauthed = () => (
    <Switch>
      <Route exact path='/' component={SignIn} />
      <Redirect from='*' to='/' />
    </Switch>
  )

  authed = () => (
    <Switch>
      { <Route exact path='/' component={MainPage} /> }
      <Route exact path='/add' component={NewQuestion} />
      <Route exact path='/leaderboard' component={Leaderboard} />
      { <Route exact path='/questions/:questionId' component={QuestionsContainer} /> }
      <Redirect from='*' to='/' />
    </Switch>
  )

  fadeInContent = () => (
    <ReactCSSTransitionGroup
      transitionName="loading-complete"
      transitionAppear={true}
      transitionAppearTimeout={500}
      transitionEnter={false}
      transitionLeave={false}>
      <Grid>
        <Row>
          <Col xs={12} md={8} mdOffset={2}>
            {this.props.displayLogin
              ? this.nonauthed()
              : this.authed()}
          </Col>
        </Row>
      </Grid>
    </ReactCSSTransitionGroup>
  )

  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <LoadingBar className="loading" />
          <div className="App">
            <Header />
            {this.props.loading === true
              ? null
              : this.fadeInContent()}
          </div>
        </Fragment>
      </BrowserRouter>)
  }
}

function mapStateToProps ({ authedUser, questions }) {
  return {
    loading: Object.keys(questions).length === 0,
    displayLogin: authedUser === null
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getData: () => dispatch(fetchInitialData()),
   getAuth: () => dispatch(getCurrentAuthedUser())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
