import {
  DocketType,
  MultiAnswerType,
  MultiChoiceQuestionType,
  QuestionBaseType,
  QuestionType,
  SingleAnswerType,
  TextQuestionType,
} from '../types/qna.types'
import { v4 } from 'uuid'
import { docketSampleImage, docketSamplePdf, docketSampleVideo } from './video'

const mcqQuestion = (): MultiChoiceQuestionType => ({
  questionType: 'MULTI_CHOICE',
  options: [
    {
      id: v4(),
      label: 'YES',
      value: 100,
      media: false,
    },
    {
      id: v4(),
      label: 'NO',
      value: 0,
      media: true,
    },
    {
      id: v4(),
      label: 'NA',
      value: -1,
      media: false,
    },
  ],
  threshold: 100,
})

const textQuestion: TextQuestionType = {
  questionType: 'TEXT',
}
const tags = {
  audio: ['Audio Quality'],
  video: ['Video Quality'],
  sop: ['SOP Adherence'],
  info: ['Graphics & Information'],
  trainer: ['Trainer Grooming'],
}
const getQuestion = (
  baseQuestion: Partial<QuestionBaseType> & { questionBody: string },
  questionType: MultiChoiceQuestionType | TextQuestionType = mcqQuestion(),
  answerType: SingleAnswerType | MultiAnswerType = { answerType: 'MULTI' }
): QuestionType => ({
  id: v4(),
  questionNo: 1,
  questionBody: '',
  weight: 1,
  isCritical: true,
  tags: [],
  docket: [],
  ...baseQuestion,
  ...questionType,
  ...answerType,
})

const queBody = [
  `Is the background music loud enough as can be without overpowering the trainer's voice?`,
  `Is the video and Audio in sync throughout the stream?`,
  `Are there no awkward edits/ cuts?`,
  `Are there no continuity issues or glitches?`,
  `Are the names of the movements correct?`,
  `Are the timer/movement counts in sync with the workout?`,
  `Are the names of the movements easy to understand, and with proper instructions on how to come down to the postures?`,
  `Do the movements in the class stream match the movements mentioned in the details of the workout page?`,
  `Is the video not blurry and with continuity in video flow?`,
  `Does the session have a warm up and a cool down routine?`,
  `Is the video resolution between 480p - 1080p?`,
  `Is the trainer audible, maintaining an optimum pace of speech, speaking in a good tone, and is loud enough?`,
  `Is the video under 2 GB ?`,
  `Is the trainer in focus throughout the video?`,
  `Is the location in the background of the video clean,and without any un-necessary items?`,
  `Is the logo and branding clearly visible in the video and is not blocked by the energy meter or other feature displays?`,
  `Is no other language used except Hindi / English?`,
  `There is no irrelevant sound or ambient noise coming from the background of the video such as doorbell, TV?`,
  `Is there no awkward or disturbing lighting in the background of the video?`,
  `Is there a disclaimer at the beginning of the video?`,
  `Is the lighting optimum?`,
  `Is the mat, water bottle and other equipment clearly visible in the video?`,
  `Was the trainer in proper attire( wearing shoes, Hair tied(females) and well groomed?`,
]
const quTags = [
  'Audio Quality',
  'Video Quality',
  'Video Quality',
  'Video Quality',
  'SOP Adherence',
  'SOP Adherence',
  'SOP Adherence',
  'SOP Adherence',
  'Video Quality',
  'SOP Adherence',
  'Video Quality',
  'Audio Quality',
  'Video Quality',
  'Video Quality',
  'Video Quality',
  'Graphics & Information',
  'SOP Adherence',
  'Audio Quality',
  'Video Quality',
  'Graphics & Information',
  'Visibility',
  'Visibility',
  'Trainer Grooming',
]

const questions: QuestionType[] = queBody.map((questionBody, idx) =>
  getQuestion({
    questionNo: idx + 1,
    questionBody,
    tags: [quTags[idx]],
  })
)
questions.push(
  getQuestion(
    {
      questionNo: questions.length,
      questionBody: 'Anomaly at any timestamp',
      tags: ['Audio Quality', 'Video Quality'],
    },
    textQuestion
  )
)

questions.push(
  getQuestion(
    {
      questionNo: questions.length,
      questionBody: 'Has any overall Anomaly in video',
    },
    mcqQuestion(),
    { answerType: 'SINGLE' }
  )
)

questions.push(
  getQuestion(
    {
      questionNo: questions.length,
      questionBody: 'Any Overall Additional feedback',
    },
    textQuestion,
    { answerType: 'SINGLE' }
  )
)

const dockets: DocketType[] = [
  {
    id: v4(),
    title: 'Sample Image',
    url: docketSampleImage,
    type: 'image/jpeg',
  },
  {
    id: v4(),
    title: 'Sample PDF',
    url: docketSamplePdf,
    type: 'application/pdf',
  },
  {
    id: v4(),
    title: 'Sample Video',
    url: docketSampleVideo,
    type: 'video/mp4',
  },
]

questions[0].docket = dockets

export default questions
