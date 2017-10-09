import express from 'express';
import passport_config from '../../config/auth/passport'
import passport from 'passport';
import controller from './auth.controller';
import loginAuth from '../../config/auth';
import tokenAuth from '../../config/auth/auth.js'

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

router.get('/', tokenAuth.isAuthenticated(), (req, res) => {
  res.json({
    result: 'success',
    email: req.user.email,
  });
})
export default router