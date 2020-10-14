import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { useSelector  } from 'react-redux'

export default props => {
  const userInfo = useSelector(state => state.user.userInfo)
  const click = e => {
    if(!userInfo || !userInfo.nickName){
      Taro.navigateTo({
        url: '/pages/login/index'
      })
      return false
    }
    props.children.props.onClick(e)
  }
  return React.cloneElement(props.children, { onClick: click })
}