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
  return User.findOneAndRemove({"info.email": email})
}

User.removeAllUser = () => {
  return User.remove()
}

User.likeFood = (email, food_id) => {
  return User.findOneAndUpdate(
    {"info.email" : email},
    { $push : { "rating.likes" : food_id } },
    { new : true , strict: false}
  )
}

User.unlikeFood = (email, food_id) => {
  return User.findOneAndUpdate(
    {"info.email" : email},
    { $pull : { "rating.likes" : food_id } },
    { new : true , strict: false}
  )
}

User.hateFood = (email, food_id) => {
  return User.findOneAndUpdate(
    {"info.email" : email},
    { $push : { "rating.hates" : food_id } },
    { new : true , strict: false}
  )
}

User.unhateFood = (email, food_id) => {
  return User.findOneAndUpdate(
    {"info.email" : email},
    { $pull : { "rating.hates" : food_id } },
    { new : true , strict: false}
  )
}

export default User