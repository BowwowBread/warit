import mongoose from 'mongoose'
import model from '../../models/user.model'

const User = mongoose.model('User')


/**
 * find user
 */

User.findAllUser = () => {
  return User.find()
}

User.findByEmail = (email) => {
  return User.findOne({"info.email": email})
}


/**
 * register user
 */

User.registerUser = (userInfo) => {
  return User.create(userInfo)
}


/**
 * remove user
 */

User.removeUserByemail = (email) => {
  return User.findOneAndRemove(email)
}

User.removeAllUser = () => {
  return User.remove()
}

export default User