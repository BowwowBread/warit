import mongoose from 'mongoose';

/**
 * id : 고유 id
 * like : 좋아요
 * likeCount : 좋아요 개수
 * hate : 안가요
 */

const FoodSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  like: {
    type: Boolean,
    required: false,
    default: false
  },
  likeCount: {
    type: Number,
    required: false,
    default: 0
  },
  hate: {
    type: Boolean,
    required: false,
    default: false
  }
});

const Food = module.exports = mongoose.model('Food', FoodSchema);