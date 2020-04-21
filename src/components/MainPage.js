import React from 'react'
import { connect } from 'react-redux'
import { Tabs, Tab } from 'react-bootstrap'
import Questions from './Question'

const mainPage = ({answered, unanswered}) => {
  return (
    <Tabs defaultActiveKey={1} id="questions-contol-tabs">
      <Tab eventKey={1} title="Questions">
        <div>
          <Questions questions={unanswered} answered={false} />
        </div>
      </Tab>
      <Tab eventKey={2} title="Answered">
        <div>
          <Questions questions={answered} answered={true} />
        </div>
      </Tab>
    </Tabs>
  );
}

function mapStateToProps ({ questions, users, authedUser }) {
  const questionsArray = Object.values(questions)
  const user = users[authedUser]
  const authedUsersAnswers = (user !== undefined)
    ? Object.keys(user.answers)
    : []
  return {
    answered: questionsArray.filter((question) => {
      return authedUsersAnswers.includes(question.id) ? question : null
    }),
    unanswered: questionsArray.filter((question) => {
      return authedUsersAnswers.includes(question.id) ? null : question
    })
  }
}

export default connect(mapStateToProps)(mainPage)