import { Menu } from 'antd'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
const { Item } = Menu
const NavBar: FC<{}> = () => {
  return (
    <Menu mode="horizontal" theme="dark" selectedKeys={['/']}>
      <Item key="/">
        <Link to="/">Video Audit</Link>
      </Item>
    </Menu>
  )
}

export default NavBar
