/*
 * @Author: hhhhhq
 * @Date: 2020-06-20 09:41:39
 * @LastEditors: hhhhhq
 * @LastEditTime: 2020-06-22 10:44:29
 * @Description: file content
 */ 
const { gql } = require('apollo-server')

module.exports = gql`
  type Post {
    id: ID!,
    body: String!,
    createdAt: String!,
    username: String!,
    comments: [Comment]!,
    likes: [Like]!
  }

  type Comment {
    id: ID!,
    body: String!,
    username: String!,
    createdAt: String!
  }

  type Like {
    id: ID!,
    username: String!,
    createdAt: String!
  }

  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
  }

  type User {
    id: ID!,
    username: String!,
    email: String!,
    createdAt: String!,
    token: String!
  }

  input RegisterInput {
    username: String!,
    email: String!,
    password: String!,
    confirmPassword: String!
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
  }
`