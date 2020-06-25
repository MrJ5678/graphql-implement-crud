/*
 * @Author: hhhhhq
 * @Date: 2020-06-20 09:46:16
 * @LastEditors: hhhhhq
 * @LastEditTime: 2020-06-23 23:20:59
 * @Description: file content
 */ 
const Post = require('../../models/Post')
const { AuthenticationError, UserInputError } = require('apollo-server')
const checkAuth = require('../../util/check-auth')

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 })
        return posts
      } catch (error) {
        throw new Error(error)
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId)

        if(post) {
          return post
        } else {
          throw new Error('post not found')
        }
      } catch (error) {
        throw new Error(error)
      }
    }
  },
  Mutation: {
    async createPost(_, { body }, context) {
      const user = checkAuth(context)

      if(body.trim() === '') {
        throw new Error('post can not be empty')
      }

      const newPost = new Post({
        body,
        username: user.username,
        createdAt: new Date().toISOString(),
        user: user.id
      })

      const post = await newPost.save()

      return post
    },

    async deletePost(_, { postId }, context) {
      const user = checkAuth(context)

      try {
        const post = await Post.findById(postId)
        if(user.username === post.username) {
          await post.delete()
          return 'post delete successfully'
        } else {
          throw new AuthenticationError('action not allowed')
        }
      } catch (error) {
        throw new Error(error)
      }
    },
    async likePost(_, { postId }, context) {
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);

      if (post) {
        if (post.likes.find(like => like.username === username)) {
          post.likes = post.likes.filter(like => like.username !== username);
        } else {
          post.likes.push({
            username,
            createdAt: new Date().toISOString()
          });
        }

        await post.save();
        return post;
      } else {
        throw new UserInputError("Post not found");
      }
    }
  }
}