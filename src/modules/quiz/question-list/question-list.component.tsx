import { Alert, Button, Card, Col, Input, Row, Select } from 'antd'
import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import QuizContext from '../quiz.context'
import QuestionItem from './question-item.component'
import styles from './question-list.module.scss'
import { BooleanFilter, QuestionTypeSearch } from '../quiz.types'

export type QuestionListProps = {}

const gutter: [number, number] = [12, 12]
const { Search } = Input
const { Option } = Select
const QuestionList: FC<QuestionListProps> = () => {
  const {
    search,
    tags,
    activeQuestionId,
    setActiveQuestionId,
    answeredCount,
    questions,
  } = useContext(QuizContext)
  const [query, setQuery] = useState('')
  const [filterTags, setFilterTags] = useState<string[]>([])
  const [filterCritical, setFilterCritical] = useState<BooleanFilter>(
    BooleanFilter.BOTH
  )
  const [filterFlag, setFilterFlag] = useState<BooleanFilter>(
    BooleanFilter.BOTH
  )
  const [results, setResults] = useState<QuestionTypeSearch[]>([])
  useEffect(() => {
    const results = search({
      query,
      filterTags,
      filterCritical,
      filterFlag,
    })
    setResults(results)
  }, [filterCritical, filterFlag, filterTags, query, search])
  const onClick = useCallback(
    (id: string) => {
      if (id) {
        setActiveQuestionId(id)
      }
    },
    [setActiveQuestionId]
  )
  const isNotSubmittable = answeredCount < questions.length
  return (
    <section className={styles.container}>
      <Row gutter={gutter} className={styles.filterContainer}>
        <Col xs={24}>
          <Search placeholder="search query" onSearch={setQuery} enterButton />
        </Col>
        <Col xs={12}>
          <span className={styles.label}>Tags</span>
          <Select
            mode="multiple"
            placeholder="Select tags"
            onChange={setFilterTags}
            value={filterTags}
            className={styles.select}
          >
            {tags.map((tag) => (
              <Option key={tag} value={tag}>
                {tag}
              </Option>
            ))}
          </Select>
        </Col>
        <Col xs={6}>
          <span className={styles.label}>Critical</span>
          <Select
            placeholder="Select Flag"
            onChange={setFilterCritical as any}
            className={styles.select}
            value={filterCritical}
          >
            <Option value={BooleanFilter.BOTH}>All</Option>
            <Option value={BooleanFilter.TRUE}>Critical</Option>
            <Option value={BooleanFilter.FALSE}>Non-Critical</Option>
          </Select>
        </Col>
        <Col xs={6}>
          <span className={styles.label}>Flag</span>
          <Select
            placeholder="Select Flag"
            onChange={setFilterFlag as any}
            className={styles.select}
            value={filterFlag}
          >
            <Option value={BooleanFilter.BOTH}>All</Option>
            <Option value={BooleanFilter.TRUE}>Flagged</Option>
            <Option value={BooleanFilter.FALSE}>UnFlagged</Option>
          </Select>
        </Col>
      </Row>
      <div className={styles.questionList}>
        {results.map((question) => (
          <Card
            hoverable
            size="small"
            className={`${styles.card} ${
              question.item.flagged ? styles.isFlagged : styles.isNotFlagged
            } ${activeQuestionId === question.item.id ? styles.active : ''}`}
            key={question.item.id}
            onClick={() => onClick(question.item.id)}
          >
            <QuestionItem question={question} />
          </Card>
        ))}
        {results.length === 0 ? (
          <Alert
            type="warning"
            message="No results to show"
            description="Remove applied filters/query to view questions"
          />
        ) : null}
      </div>
      <div className={styles.submitBtnContainer}>
        <Button
          type={isNotSubmittable ? 'default' : 'primary'}
          block
          danger={isNotSubmittable}
        >
          {isNotSubmittable ? 'Answered' : 'Submit'} ({answeredCount} /
          {questions.length})
        </Button>
      </div>
    </section>
  )
}

export default QuestionList
