 
import Taro from '@tarojs/taro'

const { statusBarHeight, screenWidth } = Taro.getSystemInfoSync()

export const navHeight = statusBarHeight + 44
export const base = 'http://192.168.1.8:7001'
export {
  screenWidth,
  statusBarHeight
}