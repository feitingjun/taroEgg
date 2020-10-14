import { observable, action } from 'mobx'
import Taro from '@tarojs/taro'
import http from '@/utils/http'

class userStore {

  @observable userInfo = null
  @observable currentTab = 0
  
  @action 
  login = async () => {
    const { code } = await Taro.login()
    const { code: dcode, data } = await http.get('/login', { code })
    if(dcode == 200){
      debugger
      this.userInfo = data.userInfo;
      Taro.setStorageSync('_t', data.token)
    }
  }
  
}

export default new userStore()