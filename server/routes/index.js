import express from 'express'
const router = express.Router();
import passport from 'passport';

import user from './users/users';
import auth from './auth/auth';
import request from 'request';

import loginAuth from '../config/auth'

/**
 * index
 */
router.get('/', loginAuth.ensureAuthenticated, (req, res, next) => {
  res.json({
    "result": req.user.emails[0].value + " " + req.user.provider
  });
})

/**
 * user api
 */
router.use('/users', user);

/**
 * passport api
 */
router.use('/auth', auth);


export default router