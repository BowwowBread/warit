import * as types from './mutation-types'

export const addToast = (state, toast) => {
  return state.toast = toast
}

export const clearToast = (state) => {
  return state.toast = null
}