/*
 * @Author: hhhhhq
 * @Date: 2020-06-19 17:32:43
 * @LastEditors: hhhhhq
 * @LastEditTime: 2020-06-19 17:42:39
 * @Description: file content
 */ 
const { model, Schema } = require('mongoose')

const postSchema = new Schema({
  body: String,
  username: String,
  createdAt: String,
  comments: [
    {
      body: String,
      username: String,
      createdAt: String
    }
  ],
  likes: [
    {
      username: String,
      createdAt: String
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  }
})

module.exports = model("Post", postSchema)