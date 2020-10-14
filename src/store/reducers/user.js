import { SAVE_USER_INFO, SWITCH_TAP } from '../actions/user'

const INITIAL_STATE = {
  userInfo: null,
  currentTab: 0
}

export default function user (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SAVE_USER_INFO:
      return {
        ...state,
        userInfo: action.payload
      }
    case SWITCH_TAP:
      return {
        ...state,
        currentTab: action.payload
      }
    default:
      return state
  }
}