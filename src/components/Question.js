import React from 'react'
import PreviewQuestion from './PreviewQuestion'
import { Row,Col,Alert } from 'react-bootstrap'

const question = (props) => {
  const { questions, answered } = props
  const questionsArray = Object.values(questions)
  const orderedQuestions = questionsArray.sort((a, b) => {
    return b.timestamp - a.timestamp
  })

  return orderedQuestions.length > 0
    ? <div className="QuestionList">
      {orderedQuestions.map((question) => (
        <PreviewQuestion
          key={question.id}
          question={question}
          answered={answered} />
      ))}
    </div>
    : <div className="center">
      <Row>
        <Col>
        <br />
          <Alert bsStyle="active" bsSize="large">
            No More <strong bsStyle="danger">Question </strong>Currently Available :(
        </Alert>
        </Col>
      </Row>


    </div>
}

export default question