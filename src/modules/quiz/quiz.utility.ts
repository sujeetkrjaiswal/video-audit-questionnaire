import Fuse from 'fuse.js'
import { QuestionType } from '../../types/qna.types'
import { BooleanFilter, QuestionTypeSearch } from './quiz.types'

export const getFuseInstance = (
  questions: QuestionType[]
): Fuse<QuestionType, Fuse.IFuseOptions<any>> =>
  new Fuse(questions, {
    includeScore: true,
    includeMatches: true,
    // threshold: 0.3,
    keys: ['questionBody', 'tags'],
  })

export const generateQuestionMap = (
  questions: QuestionType[]
): Map<string, QuestionType> => {
  const map = new Map<string, QuestionType>()
  questions.forEach((question) => {
    map.set(question.id, question)
  })
  return map
}

export const getTags = (questions: QuestionType[]): string[] => {
  const tagSet = new Set<string>()
  questions.forEach(({ tags }) => {
    if (Array.isArray(tags) && tags.length) {
      tags.forEach((tag) => {
        tagSet.add(tag)
      })
    }
  })
  return Array.from(tagSet)
}

export const filterQuestionBasedOnQuery = (
  fuseIndex: Fuse<QuestionType, Fuse.IFuseOptions<any>>,
  questions: QuestionType[],
  questionMap: Map<string, QuestionType>,
  query: string
): QuestionTypeSearch[] => {
  if (!query) {
    return questions.map(
      (q, idx): QuestionTypeSearch => ({
        item: questionMap.get(q.id) || q,
        score: 0,
        refIndex: idx,
      })
    )
  }
  return fuseIndex.search(query).map((u) => ({
    score: u.score || -1,
    refIndex: u.refIndex === undefined ? -1 : u.refIndex,
    item: questionMap.get(u.item.id) || u.item,
    matches: u.matches,
  }))
}

export const booleanFilter = (
  booleanValue: boolean,
  booleanFilter: BooleanFilter = BooleanFilter.BOTH
) =>
  booleanFilter === BooleanFilter.BOTH ||
  (booleanFilter === BooleanFilter.TRUE && booleanValue) ||
  (booleanFilter === BooleanFilter.FALSE && !booleanValue)

export const filterQuestions = (
  results: QuestionTypeSearch[],
  tags: string[] = [],
  filterCritical: BooleanFilter = BooleanFilter.BOTH,
  filterFlag: BooleanFilter = BooleanFilter.BOTH
) => {
  return results.filter(({ item }) => {
    return (
      booleanFilter(Boolean(item.isCritical), filterCritical) &&
      booleanFilter(Boolean(item.flagged), filterFlag) &&
      (tags.length === 0 || tags.some((tag) => (item.tags || []).includes(tag)))
    )
  })
}
