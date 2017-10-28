import express from 'express'
import controller from './food.controller'
import tokenAuth from '../../config/auth/auth'
const router = express.Router()

router.get('/', tokenAuth.isAuthenticated(), (req, res) => {
  const response = foods => {
    res.json({
      result: 'success show all ' + foods.length + ' foods.',
      foods: foods
    })
  }

  const error = err => {
    res.status(409).json({
      result: 'failed show all foods',
      message: error.message
    })
  }

  controller.getFoods()
    .then(response)
    .catch(error)
})
router.get('/like/:id', tokenAuth.isAuthenticated(),(req, res) => {
  const id = req.params.id
  const response = food => {
    res.json({
      result: 'success like food.',
      food: food
    })
  }

  const error = err => {
    res.status(409).json({
      result: 'failed like food.',
      message: err.message
    })
  }

  controller.likeFood(id)
    .then(response)
    .catch(error)
})

router.delete('/like/:id', tokenAuth.isAuthenticated(),(req, res) => {
  const id = req.params.id
  const response = food => {
    res.json({
      result: 'success unlike food.',
      food: food
    })
  }

  const error = err => {
    res.status(409).json({
      result: 'failed unlike food.',
      message: err.message
    })
  }

  controller.unlikeFood(id)
    .then(response)
    .catch(error)
})
router.get('/hate/:id', tokenAuth.isAuthenticated(),(req, res) => {
  const id = req.params.id
  const response = food => {
    res.json({
      result: 'success hate food.',
      food: food
    })
  }

  const error = err => {
    res.status(409).json({
      result: 'failed hate food.',
      message: err.message
    })
  }

  controller.hateFood(id)
    .then(response)
    .catch(error)

})


router.delete('/hate/:id', tokenAuth.isAuthenticated(),(req, res) => {
  const id = req.params.id
  const response = food => {
    res.json({
      result: 'success unhate food.',
      food: food
    })
  }

  const error = err => {
    res.status(409).json({
      result: 'failed unhate food.',
      message: err.message
    })
  }

  controller.unhateFood(id)
    .then(response)
    .catch(error)
})

router.delete('/', tokenAuth.checkAdmin(), (req, res) => {
  const response = food => {
    res.json({
      result: 'remove all food.',
    })
  }

  const error = err => {
    res.status(409).json({
      result: 'failed remove all food.',
      message: err.message
    })
  }

  controller.removeFoods()
    .then(response)
    .catch(error)
})

export default router