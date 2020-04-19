import React from 'react'
import { connect } from 'react-redux'
import { Tabs, Tab } from 'react-bootstrap'
import Questions from './Question'

const mainPage = ({answered, unanswered}) => {
  return (
    <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
      <Tab eventKey={1} title="Unanswered Questions">
        <div className="question-list-container">
          <Questions questions={unanswered} answered={false} />
        </div>
      </Tab>
      <Tab eventKey={2} title="Answered Questions">
        <div className="question-list-container">
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