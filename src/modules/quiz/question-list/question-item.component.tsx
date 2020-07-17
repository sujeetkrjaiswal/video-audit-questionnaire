import {
  CheckCircleFilled,
  CheckCircleOutlined,
  CheckOutlined,
} from '@ant-design/icons/lib'
import { Avatar, Badge, Tag, Typography } from 'antd'
import React, { FC } from 'react'
import { QuestionType } from '../../../types/qna.types'
import { QuestionTypeSearch } from '../quiz.types'

import styles from './question-list.module.scss'

export type QuestionItemProps = {
  question: QuestionTypeSearch
}
const { Paragraph } = Typography

const badgeStyle: React.CSSProperties = {
  left: '-40%',
  right: 'auto',
}

const QuestionNo: FC<{ question: QuestionType }> = ({ question }) => {
  const QueNo = (
    <Avatar
      className={question.flagged ? styles.isFlagged : styles.isNotFlagged}
    >
      {question.questionNo}
    </Avatar>
  )
  if (question.answerType === 'SINGLE' && question.answer) {
    return (
      <Badge
        count={<CheckCircleFilled className={styles.badgeIcon} />}
        style={badgeStyle}
      >
        {QueNo}
      </Badge>
    )
  } else if (
    question.answerType === 'MULTI' &&
    Array.isArray(question.answer) &&
    question.answer.length
  ) {
    return (
      <Badge style={badgeStyle} count={question.answer.length}>
        {QueNo}
      </Badge>
    )
  }
  return QueNo
}

const QuestionItem: FC<QuestionItemProps> = ({ question: { item } }) => {
  return (
    <div className={styles.questionItem}>
      <QuestionNo question={item} />
      <div>
        <Paragraph className={styles.questionBody}>
          {item.questionBody}
        </Paragraph>
        <div>
          {item.tags?.map((tag) => (
            <Tag color="blue" key={tag} className={styles.tag}>
              {tag}
            </Tag>
          ))}
        </div>
      </div>
    </div>
  )
}

export default QuestionItem
