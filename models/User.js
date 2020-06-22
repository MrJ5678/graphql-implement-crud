/*
 * @Author: hhhhhq
 * @Date: 2020-06-19 17:23:53
 * @LastEditors: hhhhhq
 * @LastEditTime: 2020-06-19 17:34:37
 * @Description: file content
 */ 
const { model, Schema } = require('mongoose')

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String
})

module.exports = model('User', userSchema)