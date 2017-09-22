const express = require('express');
const router = express.Router();

const user = require('./users/users');

router.get('/', (req, res, next) => {
  res.json({
    "result" : "api index"
  });
})

router.use('/users', user);
module.exports = router;