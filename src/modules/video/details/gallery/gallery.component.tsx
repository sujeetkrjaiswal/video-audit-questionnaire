import React, { FC, useCallback, useContext } from 'react'
import DocketTile from '../../../docket/docket-tile/docket-tile.component'
import VideoContext from '../../video.context'
import styles from '../details.module.scss'

const Gallery: FC<{}> = () => {
  const { gallery, setGallery } = useContext(VideoContext)
  const onDelete = useCallback(
    (id: string) => {
      setGallery((prevState) => prevState.filter((u) => u.id !== id))
    },
    [setGallery]
  )
  if (gallery.length === 0) {
    return <div className={styles.textCenter}>No Screen shots</div>
  }
  return (
    <div className={styles.galleryContainer}>
      {gallery.map((docket) => (
        <DocketTile docket={docket} onDelete={onDelete} />
      ))}
    </div>
  )
}

export default Gallery
