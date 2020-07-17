import React, { FC, Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import FullScreenLoader from '../components/full-screen-loader/full-screen-loader.component'
import questions from '../constants/question.constant'
import { mainSampleVideo } from '../constants/video'
import { QuizContextProvider } from '../modules/quiz/quiz.context'
import NotFound from './not-found/not-found.index'
import VideoQuiz from './video-quiz/video-quiz.index'

const Routes: FC<{}> = () => {
  return (
    <Suspense fallback={<FullScreenLoader />}>
      <Switch>
        <Route path={process.env.PUBLIC_URL} exact>
          <QuizContextProvider videoUrl={mainSampleVideo} questions={questions}>
            <VideoQuiz />
          </QuizContextProvider>
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Suspense>
  )
}

export default Routes
