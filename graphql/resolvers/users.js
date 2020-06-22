/*
 * @Author: hhhhhq
 * @Date: 2020-06-21 10:17:42
 * @LastEditors: hhhhhq
 * @LastEditTime: 2020-06-21 16:31:49
 * @Description: file content
 */ 
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../models/User')
const { UserInputError } = require('apollo-server')
const { validateRegisterInput, validateLoginInput } = require('../../util/validate')
const { SECRET_KEY } = require('../../config')

function generateToken(user) {
    return jwt.sign({
        id: user.id,
        username: user.username,
        email: user.email
      }, 
      SECRET_KEY, 
      { expiresIn: "1h" }
    )
}

module.exports = {
  Mutation: {
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password)

      if(!valid) {
        throw new UserInputError('Error', { errors })
      }

      const user = await User.findOne({ username })

      if(!user) {
        errors.general = 'user not found'
        throw new UserInputError('User not found', { errors })
      }

      const match = await bcrypt.compare(password, user.password)

      if(!match) {
        errors.general = "wrong credentials"
        throw new UserInputError('wrong credentials', { errors })
      }

      const token = generateToken(user)

      return {
        ...user._doc,
        id: user._id,
        token
      }
    },

    async register(_, { registerInput: { username, email, password, confirmPassword } }) {
      // TODO: 验证用户提交数据

      const { errors, valid } = validateRegisterInput(username, email, password, confirmPassword)

      if(!valid) {
        throw new UserInputError('Errors', { errors })
      }
      // TODO: 确保用户是不存在的

      const user = await User.findOne({ username })
      if(user) {
        throw new UserInputError('Username is taken', {
          errors: {
            username: "the username is taken"
          }
        })
      }

      // TODO: 密码进行加密 && 生成token

      password = await bcrypt.hash(password, 12)

      const newUser = new User({
        username,
        email,
        password,
        createdAt: new Date().toISOString()
      })

      const res = await newUser.save()
      console.log(res);

      const token = generateToken(res)

      return {
        ...res._doc,
        id: res._id,
        token
      }
    }
  }
}
