import express from 'express';
import controller from './users.controller';

const router = express.Router();

//show users
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

//find user by _Id
router.get('/:_id', (req, res) => {
  const _id = req.params._id;
  const response = user => {
    res.json({
      result: 'success find user by _id.',
      user: user
    })
  };

  const error = err => {
    res.status(409).json({
      result: 'failed find user by _id.',
      message: error.message
    })
  };

  controller.findUserBy_Id(_id)
    .then(response)
    .catch(error);
})

//find user by Name
router.get('/name/:username', (req, res) => {
  const username = req.params.username;

  const response = user => {
    res.json({
      result: 'success find user by username',
      user: user
    })
  }

  const error = err => {
    res.status(409).json({
      result: 'failed find user by username',
      message: err.message
    })
  }

  controller.findUserByName(username)
    .then(response)
    .catch(error);
})

//search user _id by id
router.get('/search/:id', (req, res) => {
  
    const id = req.params.id
    
    const response = (user) => {
      res.json({
        result: 'success find _id by user id ' + id ,
        _id: user._id
      });
    };
  
    const error = (err) => {
      res.status(409).json({
        result: 'failed find _id by user id',
        message: err.message
      })
    }
  
    controller.find_IdById(id)
      .then(response)
      .catch(error);
  });



//add user
router.post('/signup', (req, res) => {
  const userInfo = {
    user: {
      id: req.body.userId,
      pw: req.body.userPw,
      name: req.body.userName,
      age: req.body.userAge
    }
  };

  const response = user => {
    res.json({
      result : 'register user success.',
      user : user
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

//remove all users
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

//remove user by Id
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