/*
 * @Author: hhhhhq
 * @Date: 2020-06-20 09:47:10
 * @LastEditors: hhhhhq
 * @LastEditTime: 2020-06-21 23:01:02
 * @Description: file content
 */ 
const postsResolvers = require('./posts')
const usersResolvers = require('./users')
const commentsResolvers = require('./comments')

module.exports = {
  Query: {
    ...postsResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentsResolvers.Mutation
  }
}