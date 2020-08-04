import { InfoCircleOutlined } from '@ant-design/icons/lib'
import { Button, Card, Tabs, List, Popover } from 'antd'
import React, { FC, useCallback, useContext } from 'react'
import VideoContext from '../video.context'
import Gallery from './gallery/gallery.component'
import GraphFrequency from './graph-frequency/graph-frequency.component'
import FullAudioAnalyserGraph from './graph-overall/graph-overall.component'
import GraphWaveForm from './graph-waveform/graph-waveform.component'
import styles from './details.module.scss'
import Info from './info/info.component'
const { TabPane } = Tabs

const ShortcutDetails = (
  <List>
    <List.Item>OSX: [Control] + [Alt] + accesskey</List.Item>
    <List.Item>Windows: [Alt] + accesskey</List.Item>
    <List.Item>Linux: [Alt] + accesskey</List.Item>
  </List>
)

const VideoDetails: FC<{}> = () => {
  const { getScreenshot, setGallery } = useContext(VideoContext)
  const onClickScreenshot = useCallback(() => {
    const screenshot = getScreenshot()
    if (screenshot) {
      setGallery((prevState) => [screenshot, ...prevState])
    }
  }, [getScreenshot, setGallery])
  const operations = (
    <>
      <Button accessKey="S" onClick={onClickScreenshot}>
        Capture Screenshot
      </Button>
      <Popover title="Shortcut Keys" content={ShortcutDetails} trigger="click">
        <Button type="link" icon={<InfoCircleOutlined />}></Button>
      </Popover>
    </>
  )
  return (
    <Card className={styles.container} size="small">
      <Tabs tabBarExtraContent={operations}>
        <TabPane tab="Audio Analyser" key="analyser">
          <div className={styles.label}>Overall graph</div>
          <FullAudioAnalyserGraph />
          <div className={styles.realtimeAnalyser}>
            <div>
              <div className={styles.label}>Realtime Frequency Graph</div>
              <GraphFrequency />
            </div>
            <div>
              <div className={styles.label}>Realtime Waveform Graph</div>
              <GraphWaveForm />
            </div>
          </div>
        </TabPane>
        <TabPane tab="Screenshots" key="gallery">
          <Gallery />
        </TabPane>
        <TabPane tab="Info" key="info">
          <Info />
        </TabPane>
      </Tabs>
    </Card>
  )
}

export default VideoDetails
