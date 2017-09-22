const express = require('express');
const router = express.Router();

const controller = require('./users.controller');

//show users
router.get('/', (req, res) => {
  controller.find(function (err, users) {
    if (err) return res.status(500).send(err);
    if(!users.length) return res.status(404).send({err: "User Not Found"});
    res.json(users);
  })
})

//add user
router.post('/signup', (req, res) => {
  const userInfo = {
    user: {
      id : req.body.userId,
      pw : req.body.userPw,
      name : req.body.userName,
      age : req.body.userAge
    }
  };

  controller.create(userInfo, function(err, users) {
    if (err) res.status(500).send(err);
    res.send(users);
  })
});

//find user by _Id
router.get('/:_id', (req, res) => {
  controller.findById(req.params._id, function(err, user) {
    if (err) return res.status(500).send(err);
    if (!user) return res.status(404).send({err: req.params._id + " User Not Found"});
    res.json(user);
  })
})

//find user by Name
router.get('/name/:username', (req, res) => {
  controller.findOne({"user.name" : req.params.username}, function(err, user) {
    if (err) return res.status(500).send(err);
    if (!user) return res.status(404).send({err: req.params.username + " User Not Found"});
    res.json(user);
  })
})

//remove user by Id
router.delete('/:_id', (req, res) => {
  controller.findByIdAndRemove(req.params._id, function (err) {
    if (err) return res.status(500).send(err);
    res.send("User removed");
  })
})

//remove all users
router.delete('/', (req, res) => {
  controller.remove(function (err) {
    if (err) return res.status(500).send(err);
    res.send("User all removed");
  });
});

//search user _id
router.get('/search/:userid', (req, res) => {
  controller.findOne({"user.id" : req.params.userid}, function(err, user) {
    if (err) return res.status(500).send(err);
    if (!user) return res.status(404).send({err: req.params.userid + " User Not Found"});
    res.json({"_id" : user._id});
  });
});

module.exports = router;