import {
  CameraOutlined,
  FileOutlined,
  LeftOutlined,
  RightOutlined,
  SaveOutlined,
} from '@ant-design/icons/lib'
import { Button, Col, Radio, Row, Space } from 'antd'
import React, { FC, useCallback, useContext, useEffect, useState } from 'react'
import { AnswerType, DocketType, QuestionType } from '../../../types/qna.types'
import VideoContext from '../../video/video.context'
import QuizContext from '../quiz.context'
import { PlayerTime, TextAreaInput } from './question-helper.component'
import styles from './question.module.scss'

export type UnitAnswerProps = {
  question: QuestionType
  questionIdx: number
  answer: AnswerType
  onChange: (updatedAnswer: AnswerType) => void
}
const gutter: [number, number] = [16, 16]

const UnitAnswer: FC<UnitAnswerProps> = ({
  question,
  answer,
  onChange,
  questionIdx,
}) => {
  const { questions, setActiveQuestionId, setModelDocket } = useContext(
    QuizContext
  )
  const { player, getScreenshot } = useContext(VideoContext)
  const [remark, setRemark] = useState(answer.remark)
  const [answerTxt, setAnswerTxt] = useState(answer.answer)
  const [media, setMedia] = useState<DocketType[] | undefined>(answer.media)
  const onSave = useCallback(() => {
    onChange({
      ...answer,
      remark,
      media,
      answer: answerTxt,
      timestamp: player?.currentTime(),
    })
  }, [onChange, answer, remark, media, answerTxt, player])

  const saveScreenshot = useCallback(() => {
    const newMedia = getScreenshot()
    if (!newMedia) return
    setMedia((prevState) => {
      if (Array.isArray(prevState)) {
        return [...prevState, newMedia]
      }
      return [newMedia]
    })
  }, [getScreenshot])

  const loadNext = useCallback(() => {
    if (questionIdx < questions.length) {
      setActiveQuestionId(questions[questionIdx + 1].id)
    }
  }, [questions, setActiveQuestionId, questionIdx])
  const loadPrev = useCallback(() => {
    if (questionIdx > 0) {
      setActiveQuestionId(questions[questionIdx - 1].id)
    }
  }, [questions, setActiveQuestionId, questionIdx])

  useEffect(() => {
    setRemark(answer.remark || '')
    setAnswerTxt(answer.answer || '')
    setMedia(answer.media)
  }, [answer])

  return (
    <>
      <Row gutter={gutter}>
        <Col sm={24} md={12}>
          {question.questionType === 'TEXT' ? (
            <TextAreaInput
              value={answerTxt}
              label="Your Answer"
              setValue={setAnswerTxt}
            />
          ) : null}
          {question.questionType === 'MULTI_CHOICE' ? (
            <div>
              <span className={`${styles.label} ${styles.marginBottom}`}>
                Options
              </span>
              <div>
                <Radio.Group
                  value={answerTxt}
                  onChange={(e) => setAnswerTxt(e.target.value)}
                >
                  {question.options.map((opt) => (
                    <Radio
                      key={opt.id}
                      value={opt.id}
                      className={styles.option}
                    >
                      {opt.label}
                    </Radio>
                  ))}
                </Radio.Group>
              </div>
            </div>
          ) : null}
        </Col>
        <Col sm={24} md={12}>
          <TextAreaInput
            value={remark}
            label="Remarks"
            placeholder="Enter additional remarks here ..."
            setValue={setRemark}
            extra={
              question.docket?.length ? (
                <Button
                  type="link"
                  icon={<FileOutlined />}
                  size="small"
                  onClick={() =>
                    question.docket &&
                    setModelDocket(question.docket, 'View Dockets')
                  }
                >
                  View Dockets ({question.docket.length})
                </Button>
              ) : null
            }
          />
          <Space className={styles.screenshotBtnContainer}>
            <Button
              type="primary"
              ghost
              icon={<CameraOutlined />}
              size="small"
              onClick={saveScreenshot}
              // disabled={!player?.hasStarted()}
            >
              Attach Screenshot
            </Button>
            <Button
              type="primary"
              ghost
              icon={<CameraOutlined />}
              size="small"
              disabled={!media?.length}
              onClick={() =>
                media && setModelDocket(media, 'View Current Screenshot')
              }
            >
              View Screenshot ({media?.length || 0})
            </Button>
          </Space>
        </Col>
      </Row>
      <Row>
        <Col sm={8}>
          {answer.timestamp !== undefined ? (
            <PlayerTime time={answer.timestamp} />
          ) : null}
        </Col>
        <Col sm={8} className={styles.submitBtnContainer}>
          <Button
            type="primary"
            shape="round"
            icon={<SaveOutlined />}
            onClick={onSave}
            disabled={!answerTxt}
          >
            Save Answer
          </Button>
        </Col>
        <Col sm={8} className={styles.questionNavContainer}>
          <Button
            type="link"
            icon={<LeftOutlined />}
            disabled={questionIdx <= 0}
            onClick={loadPrev}
          />
          <Button type="text">
            {questionIdx + 1} / {questions.length}
          </Button>
          <Button
            type="link"
            icon={<RightOutlined />}
            disabled={questionIdx >= questions.length - 1}
            onClick={loadNext}
          />
        </Col>
      </Row>
    </>
  )
}

export default UnitAnswer
