import { Alert } from 'antd'
import React, { FC, useContext } from 'react'
import ReactJson from 'react-json-view'
import { AnswerType, DocketType } from '../../../types/qna.types'

import QuizContext from '../quiz.context'

const processAnswer = (answer?: AnswerType) => {
  if (answer && answer.media && Array.isArray(answer.media)) {
    answer.media.forEach((m) => {
      m.url = m.url.substr(0, 50) + '...'
    })
  }
}

const SubmissionView: FC<{}> = () => {
  const { answeredCount, getQuestionsList } = useContext(QuizContext)
  const questions = getQuestionsList()
  questions.forEach((question) => {
    if (Array.isArray(question.answer)) {
      question.answer.forEach((ans) => {
        processAnswer(ans)
      })
    } else {
      processAnswer(question.answer)
    }
  })
  return (
    <section>
      {answeredCount < questions.length ? (
        <Alert
          type="warning"
          message="Can not submit."
          description="All the questions are not answered"
        />
      ) : null}
      <ReactJson src={questions} collapsed />
    </section>
  )
}

export default SubmissionView
