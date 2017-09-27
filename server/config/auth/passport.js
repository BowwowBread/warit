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
 */
passport.use(new KakaoStrategy(
  auth.kakao,
  function (accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

passport.use(new FacebookStrategy(
  auth.facebook,
  function (accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

passport.use(new GoogleStrategy(
  auth.google,
  function (accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));