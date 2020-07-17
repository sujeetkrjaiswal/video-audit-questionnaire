import { Modal } from 'antd'
import React, {
  createContext,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { VideoJsPlayer } from 'video.js'

import { DocketType, QuestionType } from '../../types/qna.types'
import Docket from './docket/docket.component'
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
  videoUrl: string
  tags: string[]
  activeQuestionId: string
  setActiveQuestionId: (id: string) => void
  setModelDocket: (docket: DocketType[], title?: string) => void
  player: VideoJsPlayer | null
  setPlayer: React.Dispatch<React.SetStateAction<VideoJsPlayer | null>>
  answeredCount: number
  search(filter: SearchFilter): QuestionTypeSearch[]
  getQuestionById(id: string): QuestionTypeSearch | undefined
  updateQuestion(id: string, question: QuestionType): void
  getQuestionsList(): QuestionType[]
}

const defaultValue: QuizContextValue = {
  questions: [],
  videoUrl: '',
  tags: [],
  activeQuestionId: '',
  player: null,
  answeredCount: 0,
  setPlayer: () => undefined,
  setActiveQuestionId: () => undefined,
  setModelDocket: () => undefined,
  search: () => [],
  getQuestionById: () => undefined,
  updateQuestion: () => null,
  getQuestionsList: () => [],
}

const QuizContext = createContext<QuizContextValue>(defaultValue)
const modalBodyStyle: React.CSSProperties = {
  padding: '0px 1rem 1rem',
}
export const QuizContextProvider: FC<{
  questions: QuestionType[]
  videoUrl: string
}> = ({ children, questions, videoUrl }) => {
  // local states
  const [modelConfig, setModelConfig] = useState<{
    title: string
    docket: DocketType[]
    visible: boolean
  } | null>(null)
  // states to pass
  const [player, setPlayer] = useState<VideoJsPlayer | null>(null)
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

  const setModelDocket = useCallback((docket, title = 'View') => {
    setModelConfig({
      title,
      docket,
      visible: true,
    })
  }, [])
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
  // local methods
  const closeModal = useCallback(() => {
    setModelConfig((pre) => (pre ? { ...pre, visible: false } : null))
  }, [])
  const afterClosed = useCallback(() => {
    setModelConfig(null)
  }, [])

  const value = useMemo(
    (): QuizContextValue => ({
      tags,
      videoUrl,
      questions,
      search,
      getQuestionsList,
      getQuestionById,
      updateQuestion,
      activeQuestionId,
      setActiveQuestionId,
      setModelDocket,
      player,
      setPlayer,
      answeredCount,
    }),
    [
      tags,
      videoUrl,
      questions,
      search,
      getQuestionsList,
      getQuestionById,
      updateQuestion,
      activeQuestionId,
      setModelDocket,
      player,
      answeredCount,
    ]
  )
  return (
    <QuizContext.Provider value={value}>
      {children}
      <Modal
        title={modelConfig?.title}
        visible={modelConfig?.visible}
        footer={null}
        onCancel={closeModal}
        afterClose={afterClosed}
        width="80%"
        bodyStyle={modalBodyStyle}
      >
        {modelConfig?.docket ? <Docket dockets={modelConfig.docket} /> : null}
      </Modal>
    </QuizContext.Provider>
  )
}

export default QuizContext
