import * as types from '../mutation-types'

const state = {
  foodList: [{
    place_name: "",
    category_name: "",
    distance: 0,
    id: 0,
    x: 0,
    y: 0,
    address: "",
    like: false,
    likeCount: 0,
    hate: false,
  }]
}

const getters = {
  getFoodLists: (state) => {
    return state.foodList
  },
  getLikeFoodList: (state) => {
    return state.foodList.filter((food) => {
      return food.like == true
    })
  },
}

const mutations = {
  [types.FOOD_LIST](state, foodList) {
    return state.foodList = foodList
  },
  [types.FETCH](state, data) {
    const foods = data.foods
    let likes = null
    let hates = null
    if (data.rating != undefined) {
      likes = data.rating.likes
      hates = data.rating.hates
    }
    state.foodList.forEach((foodData, i) => {
      foods.forEach((food) => {
        if (foodData.id == food.id) {
          foodData.likeCount = food.likeCount
        }
      })
      if (likes) {
        likes.map((like_id) => {
          if (foodData.id == like_id) {
            foodData.like = true
          }
        })
      }
      if (hates) {
        hates.map((hate_id) => {
          if (foodData.id == hate_id) {
            foodData.hate = true
          }
        })
      }
      if(i == state.foodList.length - 1) {
        return
      }
    })
    state.foodList.forEach((food_A, i) => {
      state.foodList.forEach((food_B, j) => {
        if(j == state.foodList.length - 1) return
        if(food_B.likeCount < state.foodList[j + 1].likeCount) {
          state.foodList[j] = state.foodList[j + 1]
          state.foodList[j + 1] = food_B
        }
      })
    })
  },
  [types.LIKE](state, data) {
    state.foodList.forEach((foodData) => {
      if (foodData.id == data.id) {
        foodData.like = true
        foodData.likeCount = data.likeCount
      }
    })
  },
  [types.UNLIKE](state, data) {
    state.foodList.forEach((foodData) => {
      if (foodData.id == data.id) {
        foodData.like = false
        foodData.likeCount = data.likeCount
      }
    })
  },
  [types.HATE](state, data) {
    state.foodList.forEach((foodData) => {
      if (foodData.id == data.id) {
        foodData.hate = true
      }
    })
  },
  [types.UNHATE](state, data) {
    state.foodList.forEach((foodData) => {
      if (foodData.id == data.id) {
        foodData.hate = false
      }
    })
  }
}

const actions = {
  [types.FOOD_LIST]({
    commit
  }, foods) {
    return new Promise((resolve, reject) => {
      if (foods.length != 0) {
        var foodList = []
        foods.forEach((foodData) => {
          foodData.forEach((food) => {
            foodList.push({
              place_name: food.place_name,
              category_name: food.category_name,
              distance: food.distance,
              id: food.id,
              x: food.x,
              y: food.y,
              address: food.road_address_name,
              like: false,
              likeCount: 0,
              hate: false
            })
          })
        })
        commit(types.FOOD_LIST, foodList)
        resolve(foodList)
      }
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}