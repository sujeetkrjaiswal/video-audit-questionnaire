import { Result } from 'antd'
import React, { FC } from 'react'

const NotFound: FC<{}> = () => {
  return <Result status={404} title="Requested Page Does not exists" />
}

export default NotFound
