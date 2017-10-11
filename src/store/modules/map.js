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
      if (sort == "desc") {
        return state.foodList.sort((a, b) => {
          return a.place_name > b.place_name ? -1 : a.place_name < b.place_name ? 1 : 0
        })
      } else if (sort == "asc") {
        return state.foodList.sort((a, b) => {
          return a.place_name < b.place_name ? -1 : a.place_name > b.place_name ? 1 : 0
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
    state.foodList.forEach((foodData) => {
      data.forEach((foods) => {
        const index = foodData.findIndex((food) => food.id == foods.id)
        if(index != -1) {
          foodData[index].like = foods.like
          foodData[index].likeCount = foods.likeCount
          foodData[index].hate = foods.hate        
        }
      })
    })
  },
  [types.LIKE](state, data) {
    state.foodList.forEach((foodData) => {
      const index = foodData.findIndex((food) => food.id == data.id)
      if(index != -1) {
        foodData[index].like = data.like
        foodData[index].likeCount = data.likeCount
      }
    })
  },
  [types.UNLIKE](state, data) {
    state.foodList.forEach((foodData) => {
      const index = foodData.findIndex((food) => food.id == data.id)
      if(index != -1) {
        foodData[index].like = data.like
        foodData[index].likeCount = data.likeCount
      }
    })
  },
  [types.HATE](state, data) {
    state.foodList.forEach((foodData) => {
      const index = foodData.findIndex((food) => food.id == data.id)
      if(index != -1) {
        foodData[index].hate = data.hate
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
        const foodList = foods.map((foodData) => {
          return foodData.map((food) => {
            return {
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
            }
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