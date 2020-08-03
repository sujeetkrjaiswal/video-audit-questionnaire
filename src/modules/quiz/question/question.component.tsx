import {
  CameraOutlined,
  EditOutlined,
  FlagOutlined,
} from '@ant-design/icons/lib'
import {
  Alert,
  Button,
  Card,
  Input,
  Space,
  Switch,
  Tag,
  Timeline,
  Tooltip,
  Typography,
} from 'antd'
import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { v4 } from 'uuid'
import { AnswerType } from '../../../types/qna.types'
import QuizContext from '../quiz.context'
import { QuestionTypeSearch } from '../quiz.types'
import { PlayerTime, Tags, TextAreaRead } from './question-helper.component'
import UnitAnswer from './unit-answer.component'
import styles from './question.module.scss'

export type QuestionProps = {}

const getNewAnswer = (): AnswerType => ({
  id: v4(),
  answer: '',
  remark: '',
  media: [],
  timestamp: undefined,
})

const { Paragraph } = Typography
const QuestionComponent: FC<QuestionProps> = () => {
  const {
    getQuestionById,
    updateQuestion,
    activeQuestionId,
    setModelDocket,
  } = useContext(QuizContext)
  const [question, setQuestion] = useState<QuestionTypeSearch | undefined>()
  const [answer, setAnswer] = useState(getNewAnswer())

  const onSave = useCallback(
    (updatedAnswer: AnswerType) => {
      if (!question) return
      if (question.item.answerType === 'SINGLE') {
        question.item.answer = updatedAnswer
      } else if (question.item.answerType === 'MULTI') {
        const prevAnswers = question.item.answer || []
        const isUpdate = prevAnswers.some((u) => u.id === updatedAnswer.id)
        if (!isUpdate) {
          question.item.answer = [...prevAnswers, updatedAnswer]
        } else {
          question.item.answer = prevAnswers.map((u) =>
            u.id === updatedAnswer.id ? updatedAnswer : u
          )
        }
      }
      updateQuestion(question.item.id, question.item)
    },
    [question, updateQuestion]
  )

  const changeFlagged = useCallback(
    (isFlagged: boolean) => {
      if (question && question.item.flagged !== isFlagged) {
        question.item.flagged = isFlagged
        updateQuestion(question.item.id, question.item)
      }
    },
    [question, updateQuestion]
  )

  useEffect(() => {
    if (activeQuestionId) {
      const que = getQuestionById(activeQuestionId)
      setQuestion(que)
      console.log('Answer', que?.item.answer)
      if (que?.item.answerType === 'SINGLE') {
        setAnswer(que.item.answer || getNewAnswer())
      } else {
        setAnswer(getNewAnswer())
      }
    } else {
      setQuestion(undefined)
      setAnswer(getNewAnswer())
    }
  }, [activeQuestionId, getQuestionById])
  const optionMap: Record<string, string> = useMemo(() => {
    if (question?.item.questionType === 'MULTI_CHOICE') {
      const map: Record<string, string> = {}
      question.item.options.map((u) => {
        map[u.id] = u.label
      })
      return map
    }
    return {}
  }, [question])
  if (!question) return null
  const { refIndex, item: que } = question

  return (
    <section className={styles.questionContainer}>
      <Card
        size="small"
        title={`Question No: ${que.questionNo}`}
        extra={
          <Space>
            <Tags tags={que.tags} />
            {que.isCritical ? (
              <Tag color="error">Critical</Tag>
            ) : (
              <Tag>Non Critical</Tag>
            )}
            <Tooltip title={que.flagged ? 'Flagged' : 'Not Flagged'}>
              <Switch
                checked={que.flagged}
                checkedChildren={<FlagOutlined />}
                unCheckedChildren={<FlagOutlined />}
                onChange={changeFlagged}
              />
            </Tooltip>
          </Space>
        }
      >
        <Paragraph>{que.questionBody}</Paragraph>
        <UnitAnswer
          question={que}
          answer={answer}
          onChange={onSave}
          questionIdx={refIndex}
        />
      </Card>
      {que.answerType === 'MULTI' ? (
        <Card
          size="small"
          title="Previous Answers"
          className={styles.marginVertical}
        >
          {!que.answer?.length ? (
            <Alert type="info" message="No Answers recorded yet." />
          ) : null}
          <Timeline>
            {Array.isArray(que.answer)
              ? que.answer.map((prevAnswer) => (
                  <Timeline.Item>
                    <PlayerTime time={prevAnswer.timestamp} />
                    {question?.item.questionType === 'TEXT' ? (
                      <TextAreaRead label="Answer" value={prevAnswer.answer} />
                    ) : null}
                    {question?.item.questionType === 'MULTI_CHOICE' ? (
                      <div>
                        <span className={styles.label}>Option Selected :</span>
                        <span>{optionMap[prevAnswer.answer]}</span>
                      </div>
                    ) : null}
                    <TextAreaRead label="Remarks" value={prevAnswer.remark} />
                    <Space className={styles.marginVertical}>
                      <Button
                        icon={<CameraOutlined />}
                        size="small"
                        onClick={() =>
                          prevAnswer.media &&
                          setModelDocket(prevAnswer.media, 'View Screenshots')
                        }
                        disabled={!prevAnswer.media?.length}
                      >
                        View Screenshots ({prevAnswer.media?.length || 0})
                      </Button>
                      <Button
                        icon={<EditOutlined />}
                        size="small"
                        onClick={() => setAnswer(prevAnswer)}
                      >
                        Edit
                      </Button>
                    </Space>
                  </Timeline.Item>
                ))
              : null}
          </Timeline>
        </Card>
      ) : null}
    </section>
  )
}

export default QuestionComponent
