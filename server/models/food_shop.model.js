import mongoose from 'mongoose';

/**
 * seq : 일련번호
 * foodName : 음식점 이름
 * spotName 직영점 이름
 * roadAddr : 도로명 주소
 * tel : 전화번호
 * lat : 위도
 * lng : 경도
 * mainName : 카테고리
 * sido : 시도명
 */
const FoodShopSchema = mongoose.Schema({
  shopInfo: {
    seq: {
      type: Number,
      required: true
    },
    foodName: {
      type: String,
      required: true
    },
    spotName: {
      type: String,
      required: true
    },
    roadAddr: {
      type: String,
      required: true
    },
    tel: {
      type: String,
      required: true
    },
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number,
      required: true
    },
    sido: {
      type: String,
      required: true
    }
  }
});

const FoodShop = module.exports = mongoose.model('FoodShop', FoodShopSchema);