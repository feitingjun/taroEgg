 
import Taro from '@tarojs/taro'

const { statusBarHeight, screenWidth } = Taro.getSystemInfoSync()

export const navHeight = statusBarHeight + 44
export const base = 'http://fei.ngrok2.xiaomiqiu.cn'
export {
  screenWidth,
  statusBarHeight
}