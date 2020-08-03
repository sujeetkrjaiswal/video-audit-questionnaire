import React, { FC, useContext, useEffect, useRef } from 'react'
import SplitPane from 'react-split-pane'

import QuestionList from '../../modules/quiz/question-list/question-list.component'
import Question from '../../modules/quiz/question/question.component'
import QuizContext from '../../modules/quiz/quiz.context'
import VideoDetails from '../../modules/video/details/details.component'
import VideoContext from '../../modules/video/video.context'

import styles from './video-quiz.module.scss'

const VideoQuiz: FC<{}> = () => {
  const { activeQuestionId, getQuestionById } = useContext(QuizContext)
  const { setCurrentVideoRef, updateMarkers } = useContext(VideoContext)
  const videoRef = useRef(null)

  // update markers for selected question
  useEffect(() => {
    const question = getQuestionById(activeQuestionId)
    if (!question) return
    const { item } = question
    const time = []

    if (item.answerType === 'SINGLE' && item.answer?.timestamp !== undefined) {
      time.push(item.answer.timestamp)
    } else if (item.answerType === 'MULTI' && Array.isArray(item.answer)) {
      item.answer.forEach((ans) => {
        if (ans.timestamp !== undefined) {
          time.push(ans.timestamp)
        }
      })
    }
    updateMarkers(time)
  }, [activeQuestionId, getQuestionById, updateMarkers])
  useEffect(() => {
    setCurrentVideoRef(videoRef.current)
  }, [setCurrentVideoRef, videoRef])

  return (
    <section className={styles.container}>
      <SplitPane
        split="vertical"
        minSize={350}
        defaultSize={350}
        maxSize={900}
        primary="second"
      >
        <SplitPane
          split="horizontal"
          minSize={200}
          defaultSize={400}
          maxSize={700}
          pane2Style={{ overflow: 'hidden' }}
        >
          <div data-vjs-player>
            <video
              ref={videoRef}
              className="video-js vjs-big-play-centered"
              crossOrigin="anonymous"
            />
          </div>
          <div className={styles.questionContent}>
            <VideoDetails />
            <Question />
          </div>
        </SplitPane>
        <div className={styles.questionList}>
          <QuestionList />
        </div>
      </SplitPane>
    </section>
  )
}

export default VideoQuiz
