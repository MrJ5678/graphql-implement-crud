/*
 * @Author: hhhhhq
 * @Date: 2020-06-22 13:10:37
 * @LastEditors: hhhhhq
 * @LastEditTime: 2020-06-23 13:23:19
 * @Description: file content
 */ 
import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/auth'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

const MenuBar = () => {
  const pathname = window.location.pathname
  const path = pathname === '/' ? 'home' : pathname.substr(1)
  const [activeItem, setActiveItem] = useState(path)
  const { user, logout} = useContext(AuthContext)

  const handleItemClick = (e, { name }) => setActiveItem(name)
  
  const menuBar = user ? (
    <div>
      <Menu size="massive" color="teal" pointing secondary>
        <Menu.Item
          name={user.username}
          as={Link}
          to="/"
        />
        <Menu.Menu position='right'>
          <Menu.Item
            name='logout'
            onClick={logout}
          />
        </Menu.Menu>
      </Menu>
    </div>
  ) : (
    <div>
      <Menu size="massive" color="teal" pointing secondary>
        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          onClick={handleItemClick}
          as={Link}
          to="/"
        />
        <Menu.Menu position='right'>
          <Menu.Item
            name='login'
            active={activeItem === 'login'}
            onClick={handleItemClick}
            as={Link}
            to="/login"
          />

          <Menu.Item
            name='register'
            active={activeItem === 'register'}
            onClick={handleItemClick}
            as={Link}
            to="/register"
          />
        </Menu.Menu>
      </Menu>
    </div>  
  )

  return menuBar
}

export default MenuBar