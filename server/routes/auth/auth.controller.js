import mongoose from 'mongoose';
import model from '../../models/user.model';

const User = mongoose.model('User');

User.MatchUser = (email, auth_provider) => {
  return User.findOne({"info.email" : email, "info.auth_provider" : auth_provider});
}

export default User;