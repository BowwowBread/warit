import {
  Strategy as FacebookStrategy
} from 'passport-facebook'
import {
  Strategy as KakaoStrategy
} from 'passport-kakao'

import {
  OAuth2Strategy as GoogleStrategy
} from 'passport-google-oauth'


import passport from 'passport'
import mongoose from 'mongoose'
import model from '../../models/user.model'

import request from 'request'
import auth from './auth.json'

const User = mongoose.model('User')

/**
 * 유저 정보 있을 경우 : 로그인
 * return done(null, user)
 * 유저 정보 없을 경우 : 회원가입
 * return done(null, userInfo)
 * 회원가입시 같은 이메일이 존재 할 경우 : 에러
 * return done(uull, null)
 */
passport.use('kakao', new KakaoStrategy(
  auth.kakao,
  function (req, accessToken, refreshToken, profile, done) {
    const email = profile._json.kaccount_email
    const username = profile.displayName
    const auth_provider = profile.provider
    const profile_image = profile._json.properties.profile_image
    console.log(profile)    
    User.findOne({
      "info.email": email,
      "info.auth_provider": auth_provider
    }, (err, user) => {
      if (user) {
        req.flash('sign-type', 'login')
        req.flash('accessToken', accessToken)
        return done(null, user)
      } else {
        User.find({
          "info.email": email
        }, (err, users) => {
          if (users.length != 0) {
            req.flash('sign-type', 'error')
            return done(null, null)
          } else {
            const userInfo = {
              info: {
                email,
                username,
                auth_provider,
                profile_image 
              }
            }
            req.flash('sign-type', 'signup')
            req.flash('accessToken', accessToken)           
            return done(null, userInfo)
          }
        })
      }
    })
  }
))


passport.use('facebook', new FacebookStrategy(
  auth.facebook,
  function (req, accessToken, refreshToken, profile, done) {
    console.log(profile)    
    let email = ""
    if(profile.hasOwnProperty('emails')) {
      email = profile.emails[0].value      
    } else {
      email = profile.displayName+"@facebook.com"      
    }
    const username = profile.displayName
    const auth_provider = profile.provider
    const profile_image = profile.photos[0].value
    User.findOne({
      "info.email": email,
      "info.auth_provider": auth_provider
    }, (err, user) => {
      if (user) {
        req.flash('sign-type', 'login')
        req.flash('accessToken', accessToken)
        return done(null, user)
      } else {
        User.find({
          "info.email": email
        }, (err, users) => {
          if (users.length != 0) {
            req.flash('sign-type', 'error')            
            return done(null, null)
          } else {
            const userInfo = {
              info: {
                email,
                username,
                auth_provider,
                profile_image 
              }
            }
            req.flash('sign-type', 'signup')
            req.flash('accessToken', accessToken)           
            return done(null, userInfo)
          }
        })
      }
    })
  }
))

passport.use('google', new GoogleStrategy(
  auth.google,
  function (req, accessToken, refreshToken, profile, done) {
    const email = profile.emails[0].value
    const username = profile.displayName
    const auth_provider = profile.provider
    const profile_image = profile.photos[0].value
    console.log(profile)    
    User.findOne({
      "info.email": email,
      "info.auth_provider": auth_provider
    }, (err, user) => {
      if (user) {
        req.flash('sign-type', 'login')
        req.flash('accessToken', accessToken)
        return done(null, user)
      } else {
        User.find({
          "info.email": email
        }, (err, users) => {
          if (users.length != 0) {
            req.flash('sign-type', 'error')            
            return done(null, null)
          } else {
            const userInfo = {
              info: {
                email,
                username,
                auth_provider,
                profile_image 
              }
            }
            req.flash('sign-type', 'signup')
            req.flash('accessToken', accessToken)           
            return done(null, userInfo)
          }
        })
      }
    })
  }
))