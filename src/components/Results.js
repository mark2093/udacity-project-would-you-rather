import React from 'react'
import { Row, Col, Panel, Image, ListGroup,
  ListGroupItem, ProgressBar, Badge, Glyphicon, Label } from 'react-bootstrap'

const QuestionResults = (props) => {
  const { author } = props
  return (
    <Panel bsStyle="primary" className="QuestionContainer">
      <Panel.Heading>
        <Panel.Title componentClass="h3">
          Ouestion {author.name}
        </Panel.Title>
      </Panel.Heading>
      <Panel.Body>
        <Row>
          <Col xs={3}>
            <Image circle className="avatar" src={author.avatarURL} />
          </Col>
          <Col xs={9}>{resultsListGroup(props)}</Col>
        </Row>
      </Panel.Body>
    </Panel>
  )
}

const resultsListGroup = (props) => {
  const { question, optOne, optTwo } = props
  const optOneVotes = question.optionOne.votes.length
  const optTwoVotes = question.optionTwo.votes.length
  const totalVotes = optOneVotes + optTwoVotes
  const optOnePercentage = (optOneVotes / totalVotes) * 100
  const optTwoPercentage = (optTwoVotes / totalVotes) * 100
  return (
    <ListGroup>
      <ListGroupItem bsStyle={optOne ? 'info' : 'warning'}>
        {optOne ? <Badge><Glyphicon glyph="star" /> You Voted</Badge> : null}
        <p>Would you rather {question.optionOne.text}</p>
        {optOneVotes>optTwoVotes 
          ?<ProgressBar bsStyle="primary" now={optOnePercentage} />
          : <ProgressBar bsStyle="warning" now={optOnePercentage} />
        }
        <div>
        {optOneVotes>=optTwoVotes 
          ?<Label bsStyle="success" > {optOneVotes} out of {totalVotes} votes</Label>
        :<Label bsStyle="danger"> {optOneVotes} out of {totalVotes} votes</Label>
        }
        </div>
      </ListGroupItem>
      <ListGroupItem bsStyle={optTwo ? 'info' : 'warning'}>
        {optTwo ? <Badge><Glyphicon glyph="star" /> You Voted</Badge> : null}
        <p>Would you rather {question.optionTwo.text}</p>
        {optTwoVotes>=optOneVotes 
          ?<ProgressBar bsStyle="primary" now={optTwoPercentage} />
          : <ProgressBar bsStyle="warning" now={optTwoPercentage} />
        }
        <div>
        {optTwoVotes>=optOneVotes
          ?<Label bsStyle="success" > {optTwoVotes} out of {totalVotes} votes</Label>
        :<Label bsStyle="danger"> {optTwoVotes} out of {totalVotes} votes</Label>
        }
        </div>
      </ListGroupItem>
    </ListGroup>
  )
}

export default QuestionResults