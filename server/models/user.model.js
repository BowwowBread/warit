import mongoose from 'mongoose';
const UserSchema = mongoose.Schema({
  favorite: {
    list: [{
      name: String,
      description: String
    }]
  },
  hates: {
    list: [{
      name: String,
      description: String
    }]
  },
  info: {
    email: {
      type: String,
      required: true
    },
    auth_provider: {
      type: String,
      required: true
    }
  },
});

const User = module.exports = mongoose.model('User', UserSchema);