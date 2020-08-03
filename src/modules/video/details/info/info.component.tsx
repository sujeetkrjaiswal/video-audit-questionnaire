import { Descriptions, Tag } from 'antd'
import React, { FC, useContext, useEffect, useState } from 'react'
import { inspect } from 'util'
import VideoContext from '../../video.context'
import { fileSize, fileInfo, getInfo, getSize } from './info.utility'
import styles from '../details.module.scss'

const { Item } = Descriptions
const Info: FC<{}> = () => {
  const { videoUrl } = useContext(VideoContext)
  const [info, setInfo] = useState<fileInfo>()
  const [size, setSize] = useState<fileSize>()

  useEffect(() => {
    async function setData() {
      const infoRes = await getInfo(videoUrl)
      const sizeRes = await getSize(videoUrl)
      setInfo(infoRes)
      setSize(sizeRes)
    }
    setData()
  }, [videoUrl])
  return (
    <>
      <Descriptions column={{ xs: 1, lg: 2, xl: 3 }}>
        {size ? (
          <Item label="Size">
            {size.size_mb} ({size.size_gb})
          </Item>
        ) : null}
        {info ? (
          <>
            <Item label="Duration">{info.duration}</Item>
            <Item label="Formats">{info.format}</Item>
            <Item label="Audio">{info.audio}</Item>
            <Item label="Video">{info.video}</Item>
          </>
        ) : null}
      </Descriptions>
      {info ? (
        <>
          <h6 className="ant-descriptions-item-label">Video Details</h6>
          {info.video_details.map((u) => (
            <Tag key={u} className={styles.infoTag}>
              {u}
            </Tag>
          ))}
          <h6 className="ant-descriptions-item-label">Audio Details</h6>
          {info.audio_details.map((u) => (
            <Tag key={u} className={styles.infoTag}>
              {u}
            </Tag>
          ))}
        </>
      ) : null}
    </>
  )
}

export default Info
