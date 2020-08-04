import { Button, Input, Tag } from 'antd'
import React, { FC, useCallback, useContext } from 'react'
import VideoContext from '../../video/video.context'
import QuizContext from '../quiz.context'
import styles from './question.module.scss'

const { TextArea } = Input
export const formatVideoTime = (timeInSec = 0) => {
  const time = Math.round(timeInSec)
  const min = String(Math.floor(time / 60)).padStart(2, '0')
  const sec = String(time % 60).padStart(2, '0')
  return ` ${min}:${sec}`
}

export const PlayerTime: FC<{ time?: number }> = ({ time }) => {
  const { player } = useContext(VideoContext)
  const playerSeek = useCallback(
    (time?: number) => {
      if (player && time !== undefined) {
        player.currentTime(time)
        player.pause()
      }
    },
    [player]
  )
  return (
    <div>
      <span className={styles.label}>Recorded At : </span>
      <Button type="link" onClick={() => playerSeek(time)}>
        {formatVideoTime(time)}
      </Button>
    </div>
  )
}

export const TextAreaInput: FC<{
  label: string
  placeholder?: string
  value?: string
  setValue: (value: string) => void
  extra?: JSX.Element | null
  rows?: number
}> = ({
  value,
  setValue,
  label,
  extra,
  placeholder = 'Enter your response here',
  rows = 4,
}) => {
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value)
    },
    [setValue]
  )
  return (
    <div>
      <div className={styles.headingWithExtras}>
        <span className={`${styles.label} ${styles.marginBottom}`}>
          {label}
        </span>
        {extra}
      </div>
      <TextArea
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  )
}

export const TextAreaRead: FC<{ value?: string | null; label: string }> = ({
  value,
  label,
}) => {
  if (!value) return null
  return (
    <div>
      <span className={styles.label}>{label}</span>
      <TextArea
        autoSize
        value={value}
        readOnly
        className={styles.textAreaAnswer}
      />
    </div>
  )
}

export const Tags: FC<{ tags?: string[] }> = ({ tags }) => {
  if (!tags) return null
  return (
    <>
      {tags.map((tag) => (
        <Tag key={tag} color="blue">
          {tag}
        </Tag>
      ))}
    </>
  )
}
