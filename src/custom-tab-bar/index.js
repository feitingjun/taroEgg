import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import { connect  } from 'react-redux'
import styles from './index.module.less'

@connect(({ user }) => ({
  user
}))
class Page extends Component{
  static options = {
    addGlobalClass: true
  }
  switchTab = (v, i) => {
    Taro.switchTab({
      url: v.page
    })
  }
  render(){
    const currentTab = this.props.user.currentTab;
    const list = [{
      page: '/pages/index/index',
      icon: 'iconshouye',
      name: '首页'
    },{
      page: '/pages/category/index',
      icon: 'iconcaidan',
      name: '分类'
    },{
      page: '/pages/mine/index',
      icon: 'iconwode',
      name: '我的'
    }]
    return (
      <View className={styles.tabbar}>{list.map((v, i) => {
        return <View key={i} onClick={() => { this.switchTab(v, i) }}>
          <AtIcon className='iconfont' prefixClass={v.icon} color={currentTab == i ? '#289af7' : '#333'} />
          <Text style={{ color: currentTab == i ? '#289af7' : '#333' }}>{v.name}</Text>
        </View>
      })}</View>
    )
  }
}
export default Page;