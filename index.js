/*
 * @Author: hhhhhq
 * @Date: 2020-06-19 11:42:07
 * @LastEditors: hhhhhq
 * @LastEditTime: 2020-06-21 16:53:01
 * @Description: file content
 */ 
const { ApolloServer } = require('apollo-server')

const mongoose = require('mongoose')
const { MONGODB } = require('./config')

const typeDefs = require('./graphql/typeDefs')

const resolvers = require('./graphql/resolvers')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req })
})

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB connect successfully");
    return server.listen({ port: 5001 })
  })
  .then(res => {
    console.log(`Server is running on ${res.url}`);
  })