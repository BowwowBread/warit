import mongoose from 'mongoose';
/**
 * rating: 평가
 * rating.likes.seq : 좋아요 일련번호
 * rating.hates.seq : 싫어요 일련번호
 * info : 유저 정보
 * info.email : 이메일
 * info.auth_provider : 인증 제공자 (facebook, kakao, google)
 */
const UserSchema = mongoose.Schema({
  rating: {
    likes: [{
      id: {
        type: Number,
        required: true
      },
    }],
    hates: [{
      id: {
        type: Number,
        required: true
      }
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