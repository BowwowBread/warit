import {
  Strategy as FacebookStrategy
} from 'passport-facebook';
import {
  Strategy as KakaoStrategy
} from 'passport-kakao';

import {
  OAuth2Strategy as GoogleStrategy
} from 'passport-google-oauth';


import passport from 'passport';
import mongoose from 'mongoose';
import model from '../../models/user.model';

import request from 'request';
import auth from './auth.json';

const User = mongoose.model('User');

/**
 * passport config
 * 
 * return done(null, user) : 등록된 회원 => 세션 저장
 * return done(null, false) : 미등록 회원 => 세션 저장 x
 */
// passport.use(new KakaoStrategy(
//   auth.kakao,
//   function (req, accessToken, refreshToken, profile, done) {
//     const email = profile._json.kaccount_email;
//     const auth_provider = profile.provider;
//     const sign = req.cookies.sign;
//     User.findOne({
//       "info.email": email,
//       "info.auth_provider": auth_provider
//     }, (err, user) => {
//       if (sign == "login") {
//         if (user) {
//           return done(null, user)
//         } else {
//           return done(null, false);
//         }
//       } else if (sign == "signup") {
//         if (user) {
//           return done(null, false);
//         } else {
//           const userInfo = {
//             email: email,
//             auth_provider: auth_provider
//           }
//           return done(null, userInfo);
//         }
//       }
//     })
//   }
// ));

// passport.use(new FacebookStrategy(
//   auth.facebook,
//   function (req, accessToken, refreshToken, profile, done) {
//     const email = profile._json.email;
//     const auth_provider = profile.provider;
//     const sign = req.cookies.sign;
//     User.findOne({
//       "info.email": email,
//       "info.auth_provider": auth_provider
//     }, (err, user) => {
//       if (sign == "login") {
//         if (user) {
//           return done(null, user)
//         } else {
//           return done(null, false);
//         }
//       } else if (sign == "signup") {
//         if (user) {
//           return done(null, false);
//         } else {
//           const userInfo = {
//             email: email,
//             auth_provider: auth_provider
//           }
//           return done(null, userInfo);
//         }
//       }
//     })
//   }
// ));

passport.use('kakao-login', new KakaoStrategy(
  auth.kakaoLogin,
  function (req, accessToken, refreshToken, profile, done) {
    const email = profile._json.kaccount_email;
    const auth_provider = profile.provider;
    User.findOne({
      "info.email": email,
      "info.auth_provider": auth_provider
    }, (err, user) => {
        if (user) {
          return done(null, user)
        } else {
          return done(null, false);
        }
    })
  }
));

passport.use('kakao-signup', new KakaoStrategy(
  auth.kakaoSignup,
  function (req, accessToken, refreshToken, profile, done) {
    const email = profile._json.kaccount_email;
    const auth_provider = profile.provider;
    User.findOne({
      "info.email": email,
      "info.auth_provider": auth_provider
    }, (err, user) => {
        if (user) {
          return done(null, false)
        } else {
          const userInfo = {
            email: email,
            auth_provider: auth_provider
          }
          return done(null, userInfo);
        }
    })
  }
));

passport.use('facebook-login', new FacebookStrategy(
  auth.facebookLogin,
  function (req, accessToken, refreshToken, profile, done) {
    const email = profile.emails[0].value;
    const auth_provider = profile.provider;
    User.findOne({
      "info.email": email,
      "info.auth_provider": auth_provider
    }, (err, user) => {
        if (user) {
          return done(null, user)
        } else {
          return done(null, false);
        }
    })
  }
));

passport.use('facebook-signup', new FacebookStrategy(
  auth.facebookSignup,
  function (req, accessToken, refreshToken, profile, done) {
    const email = profile.emails[0].value;
    const auth_provider = profile.provider;
    User.findOne({
      "info.email": email,
      "info.auth_provider": auth_provider
    }, (err, user) => {
        if (user) {
          return done(null, false)
        } else {
          const userInfo = {
            email: email,
            auth_provider: auth_provider
          }
          return done(null, userInfo);
        }
    })
  }
));

passport.use('google-login', new GoogleStrategy(
  auth.googleLogin,
  function (req, accessToken, refreshToken, profile, done) {
    const email = profile.emails[0].value;
    const auth_provider = profile.provider;
    User.findOne({
      "info.email": email,
      "info.auth_provider": auth_provider
    }, (err, user) => {
        if (user) {
          return done(null, user)
        } else {
          return done(null, false);
        }
    })
  }
));

passport.use('google-signup', new GoogleStrategy(
  auth.googleSignup,
  function (req, accessToken, refreshToken, profile, done) {
    const email = profile.emails[0].value;
    const auth_provider = profile.provider;
    User.findOne({
      "info.email": email,
      "info.auth_provider": auth_provider
    }, (err, user) => {
        if (user) {
          return done(null, false)
        } else {
          const userInfo = {
            email: email,
            auth_provider: auth_provider
          }
          return done(null, userInfo);
        }
    })
  }
));