import mongoose from 'mongoose';
import model from '../../models/user.model';

const User = mongoose.model('User');


/**
 * find user
 */

User.findAllUser = () => {
  return User.find();
}

User.findUserBy_Id = (_id) => {
  return User.findById(_id);
}

User.findUserByName = (username) => {
  return User.findOne({"user.name" : username});
}

User.find_IdById = (id) => {
  return User.findOne({"user.id": id});
}


/**
 * register user
 */

User.registerUser = (userInfo) => {
  return User.create(userInfo);
}


/**
 * remove user
 */

User.removeUserBy_Id = (_id) => {
  return User.findOneAndRemove(_id);
}

User.removeAllUser = () => {
  return User.remove();
}

export default User;