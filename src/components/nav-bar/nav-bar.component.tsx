import { Menu } from 'antd'
import React, { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
const { Item } = Menu
const NavBar: FC<{}> = () => {
  const { pathname } = useLocation()
  return (
    <Menu mode="horizontal" theme="dark" selectedKeys={[pathname]}>
      <Item key="/audit">
        <Link to="/audit">Sample Audit</Link>
      </Item>
      <Item key="/video-audit">
        <Link to="/video-audit">Video Audit</Link>
      </Item>
    </Menu>
  )
}

export default NavBar
