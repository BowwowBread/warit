import express from 'express'
const router = express.Router()
import passport from 'passport'

import user from './users/users'
import auth from './auth/auth'
import food from './food/food'

import request from 'request'

import loginAuth from '../config/auth'

/**
 * api routes
 */
router.use('/users', user)

router.use('/auth', auth)

router.use('/food', food)



export default router