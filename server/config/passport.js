import {
  Strategy as FacebookStrategy
} from 'passport-facebook';
import {
  Strategy as KakaoStrategy
} from 'passport-kakao';

import {
  Strategy as GoogleStrategy
} from 'passport-google-oauth2';
import passport from 'passport';

import request from 'request';
import secret_config from './secret';

passport.use(new KakaoStrategy({
    clientID: secret_config.social_auth.kakao.client_id,
    clientSecret: secret_config.social_auth.kakao.secret_id,
    callbackURL: secret_config.social_auth.kakao.callback_url,
  },
  function (accessToken, refreshToken, profile, done) {
    console.log(profile);
    return done(null, profile);
  }
));

passport.use(new FacebookStrategy({
    clientID: secret_config.social_auth.facebook.client_id,
    clientSecret: secret_config.social_auth.facebook.secret_id,
    callbackURL: secret_config.social_auth.facebook.callback_url,
    profileFields: ['email', 'displayName', 'name']
  },
  function (accessToken, refreshToken, profile, done) {
    console.log(profile);
    return done(null, profile);
  }));

passport.use(new GoogleStrategy({
    clientID: secret_config.social_auth.google.client_id,
    clientSecret: secret_config.social_auth.google.secret_id,
    callbackURL: secret_config.social_auth.google.callback_url
},
function (accessToken, refreshToken, profile, done) {
    console.log(profile);
    done(null, profile)
}
));