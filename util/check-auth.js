/*
 * @Author: hhhhhq
 * @Date: 2020-06-21 20:25:58
 * @LastEditors: hhhhhq
 * @LastEditTime: 2020-06-21 20:49:00
 * @Description: file content
 */ 
const jwt = require('jsonwebtoken')
const { AuthenticationError } = require('apollo-server')
const { SECRET_KEY } = require('../config')

module.exports = (context) => {
  const authHeaders = context.req.headers.authorization 

  if(authHeaders) {
    const token = authHeaders.split('Bearer ')[1]

    if(token) {
      try {
        const user = jwt.verify(token, SECRET_KEY)
        return user
      } catch (error) {
        throw new AuthenticationError("Invalid/expired token")
      }
    }
    throw new Error("Authorization must be 'Bearer [token]")
  }
  throw new Error("Authorization token must be provided")
}