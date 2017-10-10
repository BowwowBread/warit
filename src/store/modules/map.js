import * as types from '../mutation-types'

const state = {
  foodList: [{
    place_name: "",
    category_name: "",
    distance: 0,
    id: 0,
    x: 0,
    y: 0,
    address: ""
  }]
}

const getters = {
  // sort parameter error
  getFoodList: (state, sort) => {
    console.log(sort);
    if(sort == "desc") {
      state.foodList.sort(function(a, b) {
        return a.place_name < b.place_name ? -1 : a.place_name > b.place_name ? 1 : 0
      })
    } else if (sort == "asc") {
      state.foodList.sort(function(a, b) {
        return a.place_name > b.place_name ? -1 : a.place_name < b.place_name ? 1 : 0;
      });
    }
  }
}

const mutations = {
  [types.FOOD_LIST] (state, foodList) {
    return state.foodList = foodList;
  }
}

const actions = {
  [types.FOOD_LIST] ({commit}, foods) {
    return new Promise((resolve, reject) => {
      if (foods.length != 0) {
        var foodList = [];
        foods.forEach((foodData) => {
          const foodInfo = {
            place_name: foodData.place_name,
            category_name: foodData.category_name,
            distance: foodData.distance,
            id: foodData.id,
            x: foodData.x,
            y: foodData.y,
            address: foodData.road_address_name
          }
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