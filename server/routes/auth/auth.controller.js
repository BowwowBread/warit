import mongoose from 'mongoose'
import model from '../../models/user.model'

const User = mongoose.model('User')

User.MatchUser = (email) => {
  return User.findOne({"info.email" : email})
}

export default User