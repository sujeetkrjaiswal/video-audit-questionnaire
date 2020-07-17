import { Layout } from 'antd'
import React, { FC } from 'react'
import { BrowserRouter } from 'react-router-dom'
import NavBar from './components/nav-bar/nav-bar.component'

import Routes from './routes/routes.component'

const { Header, Content, Footer } = Layout
const App: FC<{}> = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Header>
          <NavBar />
        </Header>
        <Content>
          <Routes />
        </Content>
        {/*<Footer className="text-center">*/}
        {/*  Video Audit &copy; Sujeet Kumar Jaiswal*/}
        {/*</Footer>*/}
      </Layout>
    </BrowserRouter>
  )
}

export default App
