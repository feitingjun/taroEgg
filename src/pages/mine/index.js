import React, { Component } from 'react'
import { View, Button } from '@tarojs/components'
import { connect } from 'react-redux'
import withShare from '@/components/withShare'
import { switchTap } from '@/store/actions/user'
import http from '@/utils/http'

@connect(({ user }) => ({
  userInfo: user.userInfo
}))
@withShare()
class Index extends Component {

  componentDidMount(){
    
  }
  componentDidShow(){
    this.props.dispatch(switchTap(2))
  }
  render () {
    return (
      <View className='index'>
        我的
      </View>
    )
  }
}

export default Index
