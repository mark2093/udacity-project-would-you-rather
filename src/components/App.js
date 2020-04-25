import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route,  Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading-bar'
import { getCurrentAuthedUser } from '../actions/authedUser'
import { fetchInitialData } from '../actions/shared'
import QuestionsContainer from './QuestionsContainer'
import Leaderboard from './Leaderboard'
import SignIn from './SignIn'
import Header from './Header'
import MainPage from './MainPage'
import NewQuestion from './NewQuestion'
import PrivateRoute from './PrivateRoute'
// CSS & BootStrap imports
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Grid, Row, Col } from 'react-bootstrap'


class App extends Component {
  componentDidMount() {
    this.props.getAuth(getCurrentAuthedUser())
    this.props.getData(fetchInitialData())
  }
  // nonauthed = () => (
  //   <Switch>
  //     {/* <Route exact path='/' component={SignIn} /> */}
  //     {/* <Redirect to='/login' /> */}
  //   </Switch>
  // )

  // authed = () => (
    
  // )

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
    const { displayLogin } = this.props;
    console.log("App", this.props.displayLogin)
    
    return (
      <BrowserRouter>
        <Fragment>
          <LoadingBar className="loading" />
          <div className="App">
            <Header />
            <Switch>
    <Route path='/login' component={SignIn} />
      <PrivateRoute exact path='/' component={MainPage} displayLogin={ displayLogin }   />
      <PrivateRoute exact path='/add' component={NewQuestion} displayLogin={ displayLogin }  />
      <PrivateRoute exact path='/leaderboard' component={Leaderboard}  displayLogin={ displayLogin } />
      <PrivateRoute exact path='/questions/:questionId' component={QuestionsContainer} displayLogin={ displayLogin } />
      
    </Switch>
          </div>
        </Fragment>
      </BrowserRouter>)
  }
}

function mapStateToProps({ authedUser, questions }) {
  return {
    loading: Object.keys(questions).length === 0,
    displayLogin: authedUser !== null
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getData: () => dispatch(fetchInitialData()),
    getAuth: () => dispatch(getCurrentAuthedUser())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
