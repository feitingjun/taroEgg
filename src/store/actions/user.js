import Taro from '@tarojs/taro'
import http from '@/utils/http'

export const SAVE_USER_INFO = 'SAVE_USER_INFO'
export const SWITCH_TAP = 'SWITCH_TAP'

export const saveUserInfo = userInfo => {
  return {
    type: SAVE_USER_INFO,
    payload: userInfo
  }
}
export const switchTap = currentTab => {
  return {
    type: SWITCH_TAP,
    payload: currentTab
  }
}
// 异步的 action
export const login = () => {
  return async dispatch => {
    const { code } = await Taro.login()
    const { code: dcode, data } = await http.get('/login', { code })
    if(dcode == 200){
      Taro.setStorageSync('_t', data.token)
      dispatch(saveUserInfo(data.userInfo))
    }
  }
}