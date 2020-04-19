import React from 'react'
import PreviewQuestion from './PreviewQuestion'


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
        No More Question Currently Available :(
      </div>
}

export default question