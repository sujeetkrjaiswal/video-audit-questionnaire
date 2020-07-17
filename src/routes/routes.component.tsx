import React, { FC, Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import FullScreenLoader from '../components/full-screen-loader/full-screen-loader.component'
import questions from '../constants/question.constant'
import { mainSampleVideo } from '../constants/video'
import { QuizContextProvider } from '../modules/quiz/quiz.context'
import Home from './home/home.index'
import NotFound from './not-found/not-found.index'
import Quiz from './quiz/quiz.index'
import VideoQuiz from './video-quiz/video-quiz.index'

const Routes: FC<{}> = () => {
  return (
    <Suspense fallback={<FullScreenLoader />}>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/audit" exact>
          <Quiz />
        </Route>
        <Route path="/video-audit" exact>
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
