import * as types from './mutation-types'

export const addToast = (state, toast) => {
  return state.toast.push(toast)
}

export const clearToast = (state) => {
  return state.toast = []
}