/*
 * @Author: hhhhhq
 * @Date: 2020-06-21 22:58:32
 * @LastEditors: hhhhhq
 * @LastEditTime: 2020-06-22 10:27:27
 * @Description: file content
 */ 
const Post = require('../../models/Post')
const checkAuth = require('../../util/check-auth')
const { UserInputError, AuthenticationError } = require('apollo-server')

module.exports = {
  Mutation: {
    async createComment(_, { postId, body }, context) {
      const user = checkAuth(context)

      if(body.trim() === '') {
        throw new UserInputError('empty comment', { errors: {
          body: 'comment can not be empty'
        }})
      }

      const post = await Post.findById(postId)

      if(post) {
        post.comments.unshift({
          body,
          username: user.username,
          createdAt: new Date().toISOString()
        })

        await post.save()
        return post
      } else {
        throw new UserInputError('post not found')
      }
    },
    deleteComment: async (_, { postId, commentId }, context) => {
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);

      if (post) {
        const commentIndex = post.comments.findIndex(c => c.id === commentId);

        if (post.comments[commentIndex].username === username) {
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } else {
        throw new UserInputError("Post not found");
      }
    }
  }
}