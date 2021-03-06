import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Panel, Image,
  ListGroup, ListGroupItem, Badge } from 'react-bootstrap'

class Leaderboard extends Component {

  getScoreboard = (I, index) => (
    <Panel key={I.id} bsStyle="success">
      <Panel.Heading>
        <Panel.Title componentClass="h2">
          <Badge className="leader-badge">{index + 1} </Badge>
          {I.name}
        </Panel.Title>
      </Panel.Heading>
      <Panel.Body>
        <Row>
          <Col xs={3}>
            <Image circle className="avatar" src={I.avatarURL} />
          </Col>
          <Col xs={5}>
            <ListGroup>
              <ListGroupItem>
            Number of Answered Questions = <span>{(Object.keys(I.answers)).length}</span>
              </ListGroupItem>
              <ListGroupItem>
            Number of Questions Created = <span>{I.questions.length}</span>
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col xs={4}>
            <Panel className="score">
              <Panel.Heading className="scoreHeader">Total Player Score</Panel.Heading>
              <Panel.Body>
              {(Object.keys(I.answers)).length + I.questions.length}
              </Panel.Body>
            </Panel>
          </Col>
        </Row>
      </Panel.Body>
    </Panel>
  )

  render() {
    return (
      <div>
        {this.props.winners.map((leader, index) => (
          this.getScoreboard(leader, index)
        ))}
      </div>
    );
  }
}

function mapStateToProps ({ users, authedUser }) {
  const sortedWinners = (Object.values(users)).sort((a, b) => {
    const first_place = (Object.keys(a.answers)).length + a.questions.length
    const second_place = (Object.keys(b.answers)).length + b.questions.length
    return second_place >= first_place
  })
  return {
    authedUser,
    winners: sortedWinners
  }
}

export default connect(mapStateToProps)(Leaderboard)