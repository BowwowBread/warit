import mongoose from 'mongoose';
const UserSchema = mongoose.Schema({
  favorite: {
    list: [
      {name: String, description: String}
    ]
  },
  user: {
    id: {
      type: String,
      required: true
    },
    pw: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
  },
});

const User = module.exports = mongoose.model('User', UserSchema);