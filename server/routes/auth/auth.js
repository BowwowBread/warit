import express from 'express';
import passport_config from '../../config/auth/passport'
import passport from 'passport';
import controller from './auth.controller';

const router = express.Router();

var userMatch = function (req, res, email, auth_provider) {
  const response = user => {
    if (user) {
      res.json({
        result: "user found",
        user: user
      })
    } else {
      req.logout();
      req.session = null;
      req.session.destroy();
      res.json({
        result: "user not found",
        user: user
      })
    }
  };

  const error = err => {
    res.status(409).json({
      result: 'user match fail',
      message: error.message
    })
  };

  controller.MatchUser(email, auth_provider)
    .then(response)
    .catch(error);
}

//kakao
router.get('/kakao',
  passport.authenticate('kakao')
);
router.get('/kakao/callback',
  passport.authenticate('kakao', {
    failureRedirect: '/login'
  }),
  function (req, res) {
    const email = req.user._json.kaccount_email;
    const auth_provider = req.user.provider;

    console.log(auth_provider);

    userMatch(req, res, email, auth_provider);
  }
);

//facebook
router.get('/facebook',
  passport.authenticate('facebook', {
    scope: ['public_profile', 'email']
  })
);
router.get('/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/login'
  }),
  function (req, res) {
    const email = req.user._json.email;
    const auth_provider = req.user.provider;

    userMatch(req, res, email, auth_provider);
  }
);

//google

router.get('/google',
  passport.authenticate('google', {
    scope: ['openid', 'email', 'profile']
  }, function (req, res, next) {
    req.session.return_url = req.query.return_url;
    next();
  })
);
router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login'
  }),
  function (req, res) {
    const email = req.user.emails[0].value;
    const auth_provider = req.user.provider;

    userMatch(req, res, email, auth_provider);
  }
);

//logout
router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

export default router