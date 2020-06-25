/*
 * @Author: hhhhhq
 * @Date: 2020-06-20 09:47:10
 * @LastEditors: hhhhhq
 * @LastEditTime: 2020-06-22 20:12:27
 * @Description: file content
 */ 
const postsResolvers = require('./posts')
const usersResolvers = require('./users')
const commentsResolvers = require('./comments')

module.exports = {
  Post: {
    likeCount: parent => parent.likes.length,
    commentCount: parent => parent.comments.length
  },
  Query: {
    ...postsResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentsResolvers.Mutation
  }
}