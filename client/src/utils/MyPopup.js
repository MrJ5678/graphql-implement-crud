/*
 * @Author: hhhhhq
 * @Date: 2020-06-25 10:37:59
 * @LastEditors: hhhhhq
 * @LastEditTime: 2020-06-25 10:44:45
 * @Description: file content
 */ 
import React from 'react'
import { Popup } from 'semantic-ui-react'

function MyPopup({ content, children }) {
  return (
    <Popup inverted content={content} trigger={children}/>
  )
}

export default MyPopup