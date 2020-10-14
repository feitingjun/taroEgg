import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Button, Block, OpenData } from '@tarojs/components'
import { connect } from 'react-redux'
import withShare from '@/components/withShare'
import http from '@/utils/http'
import { saveUserInfo } from '@/store/actions/user'
import styles from './index.module.less'

@connect()
@withShare()
class Page extends Component {
  state = {

  }

  back = () => {
    Taro.navigateBack().catch(err => { Taro.switchTab({ url: '/pages/index/index' })})
  }
  onGetuserInfo = async e => {
    if(e.detail.errMsg === 'getUserInfo:ok'){
      const { code, data } = await http.post('/user/update', { ...e.detail.userInfo })
      if(code == 200){
        this.props.dispatch(saveUserInfo(data))
        this.back()
      }
    }
  }
  render(){
    return (
      <Block>
        {/* <Navbar title='登录' /> */}
        <View className={ styles.container }>
          <View className={styles.avatar}><OpenData type='userAvatarUrl' /></View>
          <View className={styles.nickName}><OpenData type='userNickName' /></View>
          <View className={styles.desc}>
            <View>登录后开发者将获取以下权限</View>
            <View>获取您的公开信息（昵称、头像等）</View>
          </View>
          <View className={styles.btnBox}>
            <Button onClick={this.back}>暂不登录</Button>
            <Button lang='zh_CN' openType='getUserInfo' onGetUserInfo={this.onGetuserInfo}>确认登录</Button>
          </View>
        </View>
      </Block>
    )
  }
}

export default Page