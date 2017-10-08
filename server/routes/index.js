import express from 'express'
const router = express.Router();
import passport from 'passport';

import user from './users/users';
import auth from './auth/auth';
import search from './search/search';
import myinfo from './myinfo/myinfo';

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

router.use('/search', search);

router.use('/myinfo', myinfo);


export default router