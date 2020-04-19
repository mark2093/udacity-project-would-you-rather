import React from 'react'
import { connect } from 'react-redux'
import {  Glyphicon } from 'react-bootstrap'
import AnswerAQuestion from './AnswerAQuestion'
import Results from './Results';


const questionsContainer = ({
  question,
  author,
  optOne,
  optTwo,
  questionDoesNotExist
}) => {

  const renderNoQuestions = () => (
    <div>
      <Glyphicon glyph="alert" /> Currently No More Question Available 
    </div>
  );

  const renderAnswerQuestion = () => (
    <AnswerAQuestion
      question={question}
      author={author} />
  );

  const renderResults = () => (
    <Results
      question={question}
      author={author}
      optOne={optOne}
      optTwo={optTwo} />
  )

  const optionToShow = () => (
    optOne || optTwo ? renderResults() : renderAnswerQuestion()
  );

  return (
    <div>
      {questionDoesNotExist ? renderNoQuestions() : optionToShow() }
    </div>
  )
}

function mapStateToProps ({ users, questions, authedUser }, ownProps) {
  const question = questions[ownProps.match.params.questionId]
  if (!question)
    return { questionDoesNotExist: true }
  const author = users[question.author]
  const optOne = question.optionOne.votes.includes(authedUser)
  const optTwo = question.optionTwo.votes.includes(authedUser)

  return {
    loading: false,
    optOne,
    optTwo,
    question,
    author
  }
}

export default connect(mapStateToProps)(questionsContainer)