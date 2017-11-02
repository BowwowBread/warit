import express from 'express'
import passport_config from '../../config/auth/passport'
import passport from 'passport'
import controller from './auth.controller'
import tokenAuth from '../../config/auth/auth.js'
import request from 'request'

const router = express.Router()

//kakao
router.get('/kakao',
  passport.authenticate('kakao')
)

router.get('/kakao/callback',
  passport.authenticate('kakao', {
    failureRedirect: '/api/users/auth_fail',
    successRedirect: '/api/users/auth_success',
    failureFlash: true    
  })
)

//facebook

router.get('/facebook',
  passport.authenticate('facebook', {
    scope: ['public_profile', 'email',]
  })
)

router.get('/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/api/users/auth_fail',
    successRedirect: '/api/users/auth_success',
    failureFlash: true    
  })
)

//google

router.get('/google',
  passport.authenticate('google', {
    scope: ['openid', 'email', 'profile'],
    prompt: 'select_account'
  })
)
router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/api/users/auth_fail',
    successRedirect: '/api/users/auth_success',
    failureFlash: true
  })
)

//logout
router.get('/logout', tokenAuth.isAuthenticated(), (req, res) => {
  req.logout()
  res.clearCookie('email').json({
    "result": "logout",
  })
})

router.get('/', tokenAuth.isAuthenticated(), (req, res) => {
  const response = user => {
    res.json({
      result: 'success match user',
      userInfo: user.info,
      accessToken: req.user.accessToken
    })
  }

  const error = err => {
    res.status(409).json({
      result: 'failed match user',
      message: error.message
    })
  }

  controller.MatchUser(req.user.email)
    .then(response)
    .catch(error)
})
export default router