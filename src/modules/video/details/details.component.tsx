import { Button, Card, Tabs } from 'antd'
import React, { FC } from 'react'
import Gallery from './gallery/gallery.component'
import GraphFrequency from './graph-frequency/graph-frequency.component'
import FullAudioAnalyserGraph from './graph-overall/graph-overall.component'
import GraphWaveForm from './graph-waveform/graph-waveform.component'
import styles from './details.module.scss'
import Info from './info/info.component'
const { TabPane } = Tabs
const VideoDetails: FC<{}> = () => {
  const operations = <Button accessKey="S">Capture Screenshot</Button>
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
