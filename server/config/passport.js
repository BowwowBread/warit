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

import request from 'request';
import auth from './auth';

passport.use(new KakaoStrategy(
  auth.kakao,
  function (accessToken, refreshToken, profile, done) {
    console.log(profile);
    return done(null, profile);
  }
));

passport.use(new FacebookStrategy(
  auth.facebook,
  function (accessToken, refreshToken, profile, done) {
    console.log(profile);
    return done(null, profile);
  }));

passport.use(new GoogleStrategy(
  auth.google,
  function (accessToken, refreshToken, profile, done) {
    console.log(profile);
    done(null, profile)
  }
));