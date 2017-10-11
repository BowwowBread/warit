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
    hate: false
  }]
}

const getters = {
  /**
   * @param
   * sort : desc = 내림차순, asc = 오름차순
   */
  getFoodList: (state) => {
    return (sort, index) => {
      if (sort == "asc") {
        return state.foodList.sort((a, b) => {
          return a.place_name > b.place_name ? -1 : a.place_name < b.place_name ? 1 : 0;
        });
      } else if (sort == "desc") {
        return state.foodList.sort((a, b) => {
          return a.place_name < b.place_name ? -1 : a.place_name > b.place_name ? 1 : 0
        })
      }
    }
  }
}

const mutations = {
  [types.FOOD_LIST](state, foodList) {
    return state.foodList = foodList;
  }
}

const actions = {
  [types.FOOD_LIST]({
    commit
  }, foods) {
    return new Promise((resolve, reject) => {
      if (foods.length != 0) {
        var foodList = [];
        foods.forEach((foodData) => {
          const foodInfo = foodData.map((food) => {
            return {
              place_name: food.place_name,
              category_name: food.category_name,
              distance: food.distance,
              id: food.id,
              x: food.x,
              y: food.y,
              address: food.road_address_name,
              like: false,
              hate: false
            }
          })
          foodList.push(foodInfo);          
        })
        commit(types.FOOD_LIST, foodList);
        resolve(foodList);
      } else {
        reject("err");
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