import { Modal } from 'antd'
import React, { createContext, FC, useCallback, useMemo, useState } from 'react'
import { DocketType } from '../../types/qna.types'
import Docket from './docket-modal/docket.component'

export type DocketContextValueType = {
  setModelDocket: (docket: DocketType[], title?: string) => void
}

const defaultValue: DocketContextValueType = {
  setModelDocket: () => undefined,
}

const DocketContext = createContext<DocketContextValueType>(defaultValue)
const modalBodyStyle: React.CSSProperties = {
  padding: '0px 1rem 1rem',
}
export const DocketContextProvider: FC<{}> = ({ children }) => {
  const [modelConfig, setModelConfig] = useState<{
    title: string
    docket: DocketType[]
    visible: boolean
  } | null>(null)
  const setModelDocket = useCallback((docket, title = 'View') => {
    setModelConfig({
      title,
      docket,
      visible: true,
    })
  }, [])
  const closeModal = useCallback(() => {
    setModelConfig((pre) => (pre ? { ...pre, visible: false } : null))
  }, [])
  const afterClosed = useCallback(() => {
    setModelConfig(null)
  }, [])
  const value = useMemo(() => ({ setModelDocket }), [setModelDocket])
  return (
    <DocketContext.Provider value={value}>
      {children}
      <Modal
        title={modelConfig?.title}
        visible={modelConfig?.visible}
        footer={null}
        onCancel={closeModal}
        afterClose={afterClosed}
        width="80%"
        bodyStyle={modalBodyStyle}
        destroyOnClose
      >
        {modelConfig?.docket ? <Docket dockets={modelConfig.docket} /> : null}
      </Modal>
    </DocketContext.Provider>
  )
}

export default DocketContext
