import { Modal } from 'antd'
import React, { createContext, FC, useCallback, useMemo, useState } from 'react'

import { DocketType, QuestionType } from '../../types/qna.types'
import Docket from '../docket/docket-modal/docket.component'
import { QuestionTypeSearch, SearchFilter } from './quiz.types'
import {
  filterQuestionBasedOnQuery,
  filterQuestions,
  generateQuestionMap,
  getFuseInstance,
  getTags,
} from './quiz.utility'

export type QuizContextValue = {
  questions: QuestionType[]
  tags: string[]
  activeQuestionId: string
  setActiveQuestionId: (id: string) => void
  answeredCount: number
  search(filter: SearchFilter): QuestionTypeSearch[]
  getQuestionById(id: string): QuestionTypeSearch | undefined
  updateQuestion(id: string, question: QuestionType): void
  getQuestionsList(): QuestionType[]
}

const defaultValue: QuizContextValue = {
  questions: [],
  tags: [],
  activeQuestionId: '',
  answeredCount: 0,
  setActiveQuestionId: () => undefined,
  search: () => [],
  getQuestionById: () => undefined,
  updateQuestion: () => null,
  getQuestionsList: () => [],
}

const QuizContext = createContext<QuizContextValue>(defaultValue)

export const QuizContextProvider: FC<{
  questions: QuestionType[]
}> = ({ children, questions }) => {
  // states to pass
  const [activeQuestionId, setActiveQuestionId] = useState(questions[0].id)
  const [questionMap, setQuestionMap] = useState(generateQuestionMap(questions))
  const [fuse, tags] = useMemo(() => {
    return [getFuseInstance(questions), getTags(questions)]
  }, [questions])

  const getQuestionById = useCallback(
    (id: string): QuestionTypeSearch | undefined => {
      const item = questionMap.get(id)
      if (item) {
        const refIndex = questions.findIndex((que) => item.id === que.id)
        return {
          refIndex,
          item,
          score: 1,
        }
      }
    },
    [questionMap, questions]
  )

  const updateQuestion = useCallback((id: string, question: QuestionType) => {
    setQuestionMap((prevMap) => {
      const map = new Map(prevMap)
      map.set(id, question)
      return map
    })
  }, [])

  const getQuestionsList = useCallback(() => {
    return questions.map((question) => questionMap.get(question.id) || question)
  }, [questions, questionMap])

  const search = useCallback(
    ({ query = '', filterTags, filterCritical, filterFlag }: SearchFilter) => {
      const filteredQuestions = filterQuestionBasedOnQuery(
        fuse,
        questions,
        questionMap,
        query.trim()
      )
      return filterQuestions(
        filteredQuestions,
        filterTags,
        filterCritical,
        filterFlag
      )
    },
    [questions, questionMap, fuse]
  )

  const answeredCount = useMemo(() => {
    return questions.reduce((total, question) => {
      const withAnswer = questionMap.get(question.id)
      if (withAnswer && withAnswer.answer) {
        if (
          withAnswer.answerType === 'MULTI' &&
          Array.isArray(withAnswer.answer) &&
          withAnswer.answer.length
        ) {
          return total + 1
        } else if (
          withAnswer.answerType === 'SINGLE' &&
          withAnswer?.answer?.answer
        ) {
          return total + 1
        }
      }
      return total
    }, 0)
  }, [questions, questionMap])

  const value = useMemo(
    (): QuizContextValue => ({
      tags,
      questions,
      search,
      getQuestionsList,
      getQuestionById,
      updateQuestion,
      activeQuestionId,
      setActiveQuestionId,
      answeredCount,
    }),
    [
      tags,
      questions,
      search,
      getQuestionsList,
      getQuestionById,
      updateQuestion,
      activeQuestionId,
      answeredCount,
    ]
  )
  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
}

export default QuizContext
