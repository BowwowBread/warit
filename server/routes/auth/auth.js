<<<<<<< HEAD
import express from 'express';
import passport_config from '../../config/auth/passport'
import passport from 'passport';
import controller from './auth.controller';
import loginAuth from '../../config/auth';

const router = express.Router();

//kakao
router.get('/kakao',
  passport.authenticate('kakao')
);

router.get('/kakao/callback',
  passport.authenticate('kakao', {
    failureRedirect: '/api/users/auth_fail',
    successRedirect: '/api/users/auth_success',
    failureFlash: true    
  })
);

//facebook

router.get('/facebook',
  passport.authenticate('facebook', {
    scope: ['public_profile', 'email']
  })
);

router.get('/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/api/users/auth_fail',
    successRedirect: '/api/users/auth_success',
    failureFlash: true    
  })
);

//google

router.get('/google',
  passport.authenticate('google', {
    scope: ['openid', 'email', 'profile']
  })
);
router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/api/users/auth_fail',
    successRedirect: '/api/users/auth_success',
    failureFlash: true
  })
);

//logout
router.get('/logout', function (req, res) {
  req.logout();
  res.clearCookie('email').json({
    "result": "logout",
  })
});

=======
import express from 'express';
import passport_config from '../../config/auth/passport'
import passport from 'passport';
import controller from './auth.controller';
import loginAuth from '../../config/auth';

const router = express.Router();

//kakao
router.get('/login/kakao',
  passport.authenticate('kakao-login')
);
router.get('/signup/kakao',
  passport.authenticate('kakao-signup')
);
router.get('/kakao/callback?sign=login',
  passport.authenticate('kakao-login', {
    failureRedirect: '/api/users/auth_login_fail',
    successRedirect: '/api/users/auth_login_success'
  })
);
router.get('/kakao/callback',
  passport.authenticate('kakao-signup', {
    failureRedirect: '/api/users/auth_signup_fail',
    successRedirect: '/api/users/auth_signup_success'
  })
);

//facebook
router.get('/login/facebook',
  passport.authenticate('facebook-login', {
    scope: ['public_profile', 'email']
  })
);
router.get('/signup/facebook',
  passport.authenticate('facebook-signup', {
    scope: ['public_profile', 'email']
  })
);
router.get('/login/facebook/callback',
  passport.authenticate('facebook-login', {
    failureRedirect: '/api/users/auth_login_fail',
    successRedirect: '/api/users/auth_login_success'
  })
);
router.get('/signup/facebook/callback',
  passport.authenticate('facebook-signup', {
    failureRedirect: '/api/users/auth_signup_fail',
    successRedirect: '/api/users/auth_signup_success'
  })
);

//google

router.get('/login/google',
  passport.authenticate('google-login', {
    scope: ['openid', 'email', 'profile']
  })
);
router.get('/signup/google',
  passport.authenticate('google-signup', {
    scope: ['openid', 'email', 'profile']
  })
);
router.get('/login/google/callback',
  passport.authenticate('google-login', {
    failureRedirect: '/api/users/auth_login_fail',
    successRedirect: '/api/users/auth_login_success'
  })
);
router.get('/signup/google/callback',
  passport.authenticate('google-signup', {
    failureRedirect: '/api/users/auth_signup_fail',
    successRedirect: '/api/users/auth_signup_success'
  })
);

//logout
router.get('/logout', loginAuth.ensureAuthenticated, function (req, res) {
  req.logout();
  res.clearCookie('email').json({
    "result": "logout",
  })
});

>>>>>>> 88fec8cb233b369d91e1f5c72cc5473d0ba684dc
export default router