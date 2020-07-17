import React, { FC, useContext, useEffect, useRef } from 'react'
import SplitPane from 'react-split-pane'
import videojs from 'video.js'
import 'videojs-markers'
import QuestionList from '../../modules/quiz/question-list/question-list.component'
import Question from '../../modules/quiz/question/question.component'
import QuizContext from '../../modules/quiz/quiz.context'

import styles from './video-quiz.module.scss'

declare module 'video.js' {
  export interface VideoJsPlayer {
    // markers(options: any): void
    markers: VideoJsMarkerPlugin
  }
  export interface VideoJsMarkerPlugin {
    add(newMarkers: any): void
    destroy(): void
    getMarkers(): void
    next(): void
    prev(): void
    remove(indexArray: any): void
    removeAll(): void
    reset(newMarkers: any): void
    updateTime(force: any): void
  }
}

const VideoQuiz: FC<{}> = () => {
  const {
    videoUrl,
    setPlayer,
    activeQuestionId,
    player,
    getQuestionById,
  } = useContext(QuizContext)
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current === null) return
    const videoJsPlayer = videojs(videoRef.current, {
      autoplay: false,
      controls: true,

      sources: [
        {
          src: videoUrl,
          type: 'video/mp4',
        },
      ],
    })
    const x: any = videoJsPlayer
    x.markers({
      markers: [],
      markerStyle: {
        width: '8px',
        'background-color': '#ff4d4f',
      },
    })
    setPlayer(videoJsPlayer)
    return () => {
      setPlayer((prev) => {
        if (prev) {
          prev.dispose()
        }
        return null
      })
    }
  }, [setPlayer, videoRef, videoUrl])

  // update markers for selected question
  useEffect(() => {
    if (!player || !player.markers) return undefined
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
    time.sort()
    const newMarkers = time.map((t) => ({
      time: t,
      text: 'Recorded',
      // duration: 10,
    }))
    player.markers.reset(newMarkers)
  }, [activeQuestionId, getQuestionById, player])
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
            <video ref={videoRef} className="video-js vjs-big-play-centered" />
          </div>
          <div className={styles.questionContent}>
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
