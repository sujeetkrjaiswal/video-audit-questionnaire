import Fuse from 'fuse.js'
import { QuestionType } from '../../types/qna.types'

export type QuestionTypeSearch = {
  item: QuestionType
  score: number
  refIndex: number
  matches?: readonly Fuse.FuseResultMatch[]
}

export enum BooleanFilter {
  TRUE = 'TRUE',
  FALSE = 'FALSE',
  BOTH = 'BOTH',
}

export type SearchFilter = {
  query?: string
  filterTags?: string[]
  filterCritical?: BooleanFilter
  filterFlag?: BooleanFilter
}
