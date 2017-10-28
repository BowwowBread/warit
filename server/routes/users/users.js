import express from 'express'
import passport from 'passport'
import controller from './users.controller'
import tokenAuth from '../../config/auth/auth'

const router = express.Router()



/**
 * show users
 */
router.get('/', tokenAuth.checkAdmin(), (req, res) => {

  const response = users => {
    res.json({
      result: 'success show all ' + users.length + ' user.',
      users: users
    })
  }

  const error = err => {
    res.status(409).json({
      result: 'failed show all user',
      message: error.message
    })
  }

  controller.findAllUser()
    .then(response)
    .catch(error)
})


/**
 * search user by email
 */
router.get('/search/:email', tokenAuth.isAuthenticated(), (req, res) => {

  const email = req.params.email

  const response = (user) => {
    res.json({
      result: 'success find email by user email ' + email,
      user: user
    })
  }

  const error = (err) => {
    res.status(409).json({
      result: 'failed find email by user email',
      message: err.message
    })
  }

  controller.findByEmail(email)
    .then(response)
    .catch(error)
})



/**
 * add user
 */
router.post('/signup', (req, res) => {
  const userInfo = {
    info: {
      email: req.body.email,
      auth_provider: req.body.auth_provider
    }
  }

  const response = user => {
    res.json({
      result: 'register user success.',
      user: user
    })
  }

  const error = err => {
    res.status(409).json({
      result: 'register user failed.',
      message: error.message
    })
  }

  controller.registerUser(userInfo)
    .then(response)
    .catch(error)
})

/**
 * sign
 */


router.get('/auth_success', (req, res) => {
  const signType = req.flash('sign-type')[0]
  const email = req.user.info.email
  const auth_provider = req.user.info.auth_provider
  if (signType == "login") {
    //로그인 성공
    const secret = req.app.get('jwt-secret')
    const token = tokenAuth.signToken(email, secret)
    console.log(signType)
    res.cookie("email", email)
      .cookie("token", token)
      .cookie('sign', signType)      
      .redirect('http://localhost:3000')
  } else if (signType == "signup") {
    //회원가입 성공
    const userInfo = {
      info: {
        email: email,
        auth_provider: auth_provider
      }
    }
    const response = user => {
      const secret = req.app.get('jwt-secret')
      const token = tokenAuth.signToken(email, secret)
      res.cookie("email", email)
        .cookie("token", token)
        .cookie('sign', signType)
        .redirect('http://localhost:3000')
    }

    const error = err => {
      res.status(409).json({
        result: 'register user failed.',
        message: err.message
      })
    }
    controller.registerUser(userInfo)
      .then(response)
      .catch(error)
  }

})


router.get('/auth_fail', (req, res) => {
  const signType = req.flash('sign-type')[0]
  res.cookie('sign', signType)
      redirect('http://localhost:3000/sign')
})

/**
 * remove all users
 */
router.delete('/', tokenAuth.checkAdmin(), (req, res) => {

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
    .catch(error)
})

/**
 * remove user by email
 */
router.delete('/:email', tokenAuth.checkAdmin(), (req, res) => {
  const email = req.params.email
  console.log(email)
  const response = user => {
    res.json({
      result: 'success remove user by email ' + email,
      user: user
    })
  }

  const error = err => {
    res.status(409).json({
      result: 'failed remove user by email',
      message: err.message
    })
  }

  controller.removeUserByemail(email)
    .then(response)
    .catch(error)
})

router.get('/like/:email/:id', tokenAuth.isAuthenticated(), (req, res) => {
  const email = req.params.email
  const id = req.params.id
  const response = user => {
    res.json({
      result: 'success like food.',
      user: user
    })
  }

  const error = err => {
    res.status(409).json({
      result: 'failed like food.',
      message: err.message
    })
  }

  controller.likeFood(email, id)
    .then(response)
    .catch(error)
  })
  
  router.delete('/like/:email/:id', tokenAuth.isAuthenticated(), (req, res) => {
  const email = req.params.email
  const id = req.params.id
  const response = user => {
    res.json({
      result: 'success unlike food.',
      user: user
    })
  }

  const error = err => {
    res.status(409).json({
      result: 'failed unlike food.',
      message: err.message
    })
  }

  controller.unlikeFood(email, id)
    .then(response)
    .catch(error)
  })

  router.get('/hate/:email/:id', tokenAuth.isAuthenticated(), (req, res) => {
  const email = req.params.email
  const id = req.params.id
  const response = user => {
    res.json({
      result: 'success hate food.',
      user: user
    })
  }

  const error = err => {
    res.status(409).json({
      result: 'failed hate food.',
      message: err.message
    })
  }

  controller.hateFood(email, id)
    .then(response)
    .catch(error)
  })

    router.delete('/hate/:email/:id', tokenAuth.isAuthenticated(), (req, res) => {
  const email = req.params.email
  const id = req.params.id
  const response = user => {
    res.json({
      result: 'success unhate food.',
      user: user
    })
  }

  const error = err => {
    res.status(409).json({
      result: 'failed unhate food.',
      message: err.message
    })
  }

  controller.unhateFood(email, id)
    .then(response)
    .catch(error)
  })

export default router