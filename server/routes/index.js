import express from 'express'
const router = express.Router();

import user from './users/users';
import auth from './auth/auth';
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
router.use('/auth', auth);


export default router