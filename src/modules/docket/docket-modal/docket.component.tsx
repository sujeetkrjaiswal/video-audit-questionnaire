import { Tabs } from 'antd'
import React, { FC } from 'react'
import Player from '../../../components/player/player.component'

import { DocketType } from '../../../types/qna.types'
import styles from './docket.module.scss'

export type DocketProps = {
  dockets: DocketType[]
}
const { TabPane } = Tabs

const RenderType: FC<{ docket: DocketType }> = ({ docket }) => {
  if (docket.type === 'application/pdf') {
    return (
      <embed
        src={docket.url}
        type="application/pdf"
        width="100%"
        height="500px"
      />
    )
  } else if (docket.type?.startsWith('image')) {
    return (
      <div className={styles.center}>
        <img
          className={styles.image}
          src={docket.url}
          alt={docket.title || 'NA'}
        />
      </div>
    )
  } else if (docket.type?.startsWith('video')) {
    return <Player url={docket.url} type={docket.type} />
  }
  return null
}

const Docket: FC<DocketProps> = ({ dockets }) => {
  return (
    <Tabs defaultActiveKey="1">
      {dockets.map((docket) => (
        <TabPane key={docket.id} tab={<span>{docket.title || 'NA'}</span>}>
          <RenderType docket={docket} />
        </TabPane>
      ))}
    </Tabs>
  )
}

export default Docket
