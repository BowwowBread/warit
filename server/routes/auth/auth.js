import express from 'express';
import passport_config from '../../config/passport'
import passport from 'passport';

const router = express.Router();

//kakao
router.get('/login/kakao',
  passport.authenticate('kakao')
);
router.get('/login/kakao/callback',
  passport.authenticate('kakao', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
);

//facebook
router.get('/login/facebook',
  passport.authenticate('facebook', {
    scope: ['public_profile', 'email']
  })
);
router.get('/login/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
);

//google

router.get('/login/google',
  passport.authenticate('google', { scope: ['openid', 'email', 'profile'] })
);
router.get('/login/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

//logout
router.get('/logout', function (req, res) {
  req.logout();
  req.session = null;
  res.redirect('/');
});

export default router