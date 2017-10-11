import mongoose from 'mongoose'
import model from '../../models/food.model'

const Food = mongoose.model('Food')

Food.getFoods = () => {
  return Food.find()
}

Food.likeFood = (id) => {
  return Food.findOneAndUpdate(
    { "id" : id },
    { $set: { "id" : id, "like" : true}, $inc : { "likeCount" : 1 } },
    { upsert:true, new : true , strict: false}
  )
}
Food.unlikeFood = (id) => {
  return Food.findOneAndUpdate(
    { "id" : id },
    { $inc : { "likeCount" : -1 } },
    { new: true, strict: false}
  )
}

Food.hateFood = (id) => {
  return Food.findOneAndUpdate(
    { "id" : id },
    { $set: { "id" : id, "hate" : true}},
    { upsert:true, new : true , strict: false}
  )
}
Food.unhateFood = (id) => {
  return Food.findOneAndUpdate(
    { "id" : id },
    { $set: { "hate" : false}},
    { new: true, strict: false}
  )
}
Food.removeFoods = () => {
  return Food.remove()
}
export default Food