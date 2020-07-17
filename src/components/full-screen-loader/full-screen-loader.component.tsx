import { LoadingOutlined } from '@ant-design/icons/lib'
import { Spin } from 'antd'
import React, { FC } from 'react'
import style from './full-screen-loader.module.scss'

const loaderIcon = <LoadingOutlined spin />
export type FullScreenLoaderProps = {
  title?: string
}
const FullScreenLoader: FC<FullScreenLoaderProps> = ({ title }) => {
  return (
    <div className={style.container}>
      <div className={style.loader}>
        <Spin indicator={loaderIcon} size="large" />
        {title ? <span>{title}</span> : null}
      </div>
    </div>
  )
}

export default FullScreenLoader
