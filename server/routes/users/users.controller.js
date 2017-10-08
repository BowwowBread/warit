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

User.find_IdByEmail = (email) => {
  return User.find({"info.email": email});
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