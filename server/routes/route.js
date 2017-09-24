import express from 'express'

const router = express.Router();

import user from './users/users';

router.get('/', (req, res, next) => {
  res.json({
    "result" : "api index"
  });
})

router.use('/users', user);
export default router