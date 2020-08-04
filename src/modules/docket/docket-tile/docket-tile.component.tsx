import { DeleteOutlined } from '@ant-design/icons'
import { Button, Card, List } from 'antd'
import React, { FC, useCallback, useContext } from 'react'
import { DocketType } from '../../../types/qna.types'
import DocketContext from '../docket.context'
import styles from './docket-tile.module.scss'

const DocketTile: FC<{
  docket: DocketType
  onDelete?: (id: string) => void
}> = ({ docket, onDelete }) => {
  const { setModelDocket } = useContext(DocketContext)
  const cardClick = useCallback(() => {
    setModelDocket([docket], 'Preview')
  }, [setModelDocket, docket])
  const onClickDelete = useCallback(() => {
    if (onDelete) onDelete(docket.id)
  }, [docket, onDelete])
  if (docket.type?.startsWith('image'))
    return (
      <div className={styles.cardContainer}>
        <Card
          size="small"
          hoverable
          className={styles.card}
          onClick={cardClick}
          cover={<img className={styles.img} src={docket.url} />}
        >
          <Card.Meta
            description={docket.title}
            className={styles.cardDescription}
          />
        </Card>
        {onDelete ? (
          <Button
            type="link"
            onClick={onClickDelete}
            icon={<DeleteOutlined />}
            className={styles.delIcon}
          />
        ) : null}
      </div>
    )
  return null
}

export default DocketTile
