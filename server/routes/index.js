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

/**
 * user api
 */
router.use('/users', user);

/**
 * passport api
 */
router.use('/auth', auth);


export default router