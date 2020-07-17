import React, { FC, useEffect, useRef } from 'react'
import videojs from 'video.js'

const Player: FC<{ url: string; type: string }> = ({
  url,
  type = 'video/mp4',
}) => {
  const videoRef = useRef(null)
  useEffect(() => {
    if (url && videoRef.current) {
      const videoJsPlayer = videojs(videoRef.current, {
        autoplay: false,
        controls: true,
        sources: [
          {
            src: url,
            type,
          },
        ],
      })
      return () => {
        videoJsPlayer.dispose()
      }
    }
  }, [type, url])
  return (
    <div data-vjs-player style={{ height: 500 }}>
      <video
        ref={videoRef}
        className="video-js vjs-big-play-centered"
        crossOrigin="anonymous"
      />
    </div>
  )
}

export default Player
