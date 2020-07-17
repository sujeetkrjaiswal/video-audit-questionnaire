export type DocketType = {
  id: string
  url: string
  title?: string
  type?: string
}

export type OptionsType = {
  id: string
  label: string
  value: number
  media: boolean
}
export type AnswerType = {
  id: string
  timestamp?: number
  answer: string
  media?: DocketType[]
  remark?: string
}

export type MultiChoiceQuestionType = {
  questionType: 'MULTI_CHOICE'
  options: OptionsType[]
  threshold: number
}

export type TextQuestionType = {
  questionType: 'TEXT'
}

export type SingleAnswerType = {
  answerType: 'SINGLE'
  answer?: AnswerType
}
export type MultiAnswerType = {
  answerType: 'MULTI'
  answer?: AnswerType[]
}

export type QuestionBaseType = {
  id: string
  questionNo: number
  questionBody: string
  weight: number
  isCritical: boolean
  tags?: string[]
  docket?: DocketType[]
  flagged?: boolean
}

export type QuestionType = QuestionBaseType &
  (MultiChoiceQuestionType | TextQuestionType) &
  (SingleAnswerType | MultiAnswerType)
