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
    hate: false
  }]
}

const getters = {
  getFoodLists: (state) => state.foodList,
  /**
   * @param
   * sort : desc = 내림차순, asc = 오름차순
   */
  getFoodList: (state) => {
    return (sort, index) => {
      if (sort == "asc") {
        return state.foodList.sort((a, b) => {
          if (a.likeCount < b.likeCount) return 1
          if (a.likeCount > b.likeCount) return -1
          if (a.likeCount == b.likeCount) return 0
          return a.likeCount - b.likeCount
        })
      } else if (sort == "desc") {
        return state.foodList.sort((a, b) => {
          return a.likeCount < b.likeCount ? -1 : a.likeCount > b.likeCount ? 1 : 0
        })
      }
    }
  }
}

const mutations = {
  [types.FOOD_LIST](state, foodList) {
    return state.foodList = foodList
  },
  [types.FETCH](state, data) {
    const foods = data.foods
    let likes = null
    if(data.rating != undefined) {
      likes = data.rating.likes
    }
    state.foodList.forEach((foodData) => {
      foods.forEach((food) => {
        if(foodData.id == food.id) {
          foodData.likeCount = food.likeCount
          foodData.hate = food.hate
        }
      })
      if(likes) {
        likes.map((like_id) => {
          if(foodData.id == like_id) {
            foodData.like = true
          }
        })
      }
    })
    return state.foodList.sort((a, b) => {
      return b.likeCount - a.likeCount    
    })
  },
  [types.LIKE](state, data) {
    state.foodList.forEach((foodData) => {
      if(foodData.id == data.id) {
        foodData.like = true
        foodData.likeCount = data.likeCount
      }
    })
  },
  [types.UNLIKE](state, data) {
    state.foodList.forEach((foodData) => {
      if(foodData.id == data.id) {
        foodData.like = false
        foodData.likeCount = data.likeCount
      }
    })
  },
  [types.HATE](state, data) {
    state.foodList.forEach((foodData) => {
      if(foodData.id == data.id) {
        foodData.hate = data.hate
      }
    })
  },
  [types.UNHATE](state, data) {
    state.foodList.forEach((foodData) => {
      const index = foodData.findIndex((food) => food.id == data.id)
      if(index != -1) {
        foodData[index].hate = data.hate
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
      } else {
        reject("err")
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