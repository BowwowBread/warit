import mongoose from 'mongoose';

/**
 * place_name: 음식점 명
 * category_name: 음식점 분류
 * distnace: 거리
 * id: 고유 id
 * x: x좌표
 * y: y좌표
 * address: 주소
 * like: 즐겨찾기
 * hate: 안가요
 */

const FoodList = mongoose.Schema({
  foodInfo: {
    place_name: {
      type: String,
      required: true
    },
    category_name: {
      type: String,
      required: true
    },
    distance: {
      type: Number,
      required: true
    },
    id: {
      type: Number,
      required: true
    },
    x: {
      type: Number,
      required: true
    },
    y: {
      type: Number,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    like: {
      type: Boolean,
      required: false
    },
    likeCount: {
      type: Number,
      required: false
    },
    hate: {
      type: Boolean,
      required: false
    }
  },
});

const FoodList = module.exports = mongoose.model('FoodList', FoodListSchema);