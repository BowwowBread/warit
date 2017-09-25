import express from 'express'
import passport from 'passport';
const router = express.Router();

import user from './users/users';
import passport_config from '../config/passport'
import request from 'request'
/**
 * index
 */
router.get('/', (req, res, next) => {
  res.json({
    "result": "api index"
  });
})

/**
 * user api
 */
router.use('/users', user);

/**
 * passport api
 */

//kakao
router.get('/auth/login/kakao',
  passport.authenticate('kakao')
);
router.get('/auth/login/kakao/callback',
  passport.authenticate('kakao', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
);

//facebook
router.get('/auth/login/facebook',
  passport.authenticate('facebook', {
    scope: ['public_profile', 'email']
  })
);
router.get('/auth/login/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
);

//google

router.get('/auth/login/google',
  passport.authenticate('google', {
    scope: 
    [ 'https://www.googleapis.com/auth/plus.login',
    , 'https://www.googleapis.com/auth/plus.profile.emails.read' ]
  })
);
router.get('/auth/login/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

//logout
router.get('/auth/logout', function (req, res) {
  req.logout();
  req.session = null;
  res.redirect('/');
});

//test

router.get('/test', function (req, res) {
  request.get({
    url: 'https://openapi.naver.com/v1/nid/me',
    headers: {
      "Authorization": "Bearer AAAAOLtP40eH6P5S4Z4FpFl77n3FD5I+W3ost3oDZq/nbcS+7MAYXwXbT3Y7Ib3dnvcqHkcK0e5/rw6ajF7S/QlJAgUukpp1OGkG0vzi16hcRNYX6RcQ6kPxB0oAvqfUPJiJw==",
    },
  }, function (e, r, body) {
    console.log(body);
  });
})
export default router