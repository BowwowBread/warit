import express from 'express';
import passport from 'passport';
import controller from './users.controller';

const router = express.Router();

import loginAuth from '../../config/auth'

/**
 * show users
 */
router.get('/', (req, res) => {

  const response = users => {
    res.json({
      result: 'success show all ' + users.length + ' user.',
      users: users
    })
  };

  const error = err => {
    res.status(409).json({
      result: 'failed show all user',
      message: error.message
    })
  };

  controller.findAllUser()
    .then(response)
    .catch(error);
})


/**
 * search user _id by email
 */
router.get('/search/:email', (req, res) => {

  const email = req.params.email

  const response = (user) => {
    console.log(user);
    res.json({
      result: 'success find _id by user email ' + email,
      _id: user
    });
  };

  const error = (err) => {
    res.status(409).json({
      result: 'failed find _id by user email',
      message: err.message
    })
  }

  controller.find_IdByEmail(email)
    .then(response)
    .catch(error);
});



/**
 * add user
 */
router.post('/signup', (req, res) => {
  const userInfo = {
    info: {
      email: req.body.email,
      auth_provider: req.body.auth_provider
    }
  };

  const response = user => {
    res.json({
      result: 'register user success.',
      user: user
    })
  };

  const error = err => {
    res.status(409).json({
      result: 'register user failed.',
      message: error.message
    })
  };

  controller.registerUser(userInfo)
    .then(response)
    .catch(error);
});

/**
 * login
 */

router.get('/auth_success', (req, res) => {
  const sign = req.cookies.sign;
  console.log("1");
  if (sign == "login") {
    const email = req.user.info.email;
    res.cookie("email", email).redirect('http://localhost:3000');
  } else if (sign == "signup") {
    const userInfo = {
      info: {
        email: req.userInfo.email,
        auth_provider: req.userInfo.auth_provider
      }
    };
    controller.registerUser(userInfo);
    res.cookie("email", email).redirect('http://localhost:3000'); 
  }
})

router.get('/auth_fail', (req, res) => {
  res.redirect('http://localhost:3000/login');
})

/**
 * remove all users
 */
router.delete('/', (req, res) => {

  const response = (result) => {
    res.json({
      result: 'success remove all users',
    })
  }

  const error = err => {
    res.status(409).json({
      result: 'failed remove all users',
      message: err.message
    })
  }

  controller.removeAllUser()
    .then(response)
    .catch(error);
});

/**
 * remove user by Id
 */
router.delete('/:_id', (req, res) => {
  const _id = req.params._id;

  const response = user => {
    res.json({
      result: 'success remove user by _id ' + _id,
      user: user
    })
  }

  const error = err => {
    res.status(409).json({
      result: 'failed remove user by _id',
      message: err.message
    })
  }

  controller.removeUserBy_Id(_id)
    .then(response)
    .catch(error);
})



export default router;