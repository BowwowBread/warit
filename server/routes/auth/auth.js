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
  passport.authenticate('kakao',{
    failureRedirect: '/api/users/auth_fail',
    successRedirect: '/api/users/auth_success'
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
    successRedirect: '/api/users/auth_success'
  })
);

//google

router.get('/google',
  passport.authenticate('google', {
    scope: ['openid', 'email', 'profile']
  })
);
router.get('/google/callback',
  passport.authenticate('google',{
    failureRedirect: '/api/users/auth_fail',
    successRedirect: '/api/users/auth_success'
  })
);

//logout
router.get('/logout', function (req, res) {
  res.clearCookie('email')
  req.logout();
  res.json({
    "result" : "logout",
  })
});

export default router