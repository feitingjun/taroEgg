import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import { connect } from 'react-redux'
import withShare from '@/components/withShare'
import { switchTap } from '@/store/actions/user'
import http from '@/utils/http'
import styles from './index.module.less'

@connect(({ user }) => ({
  userInfo: user.userInfo
}))
@withShare()
class Index extends Component {

  state = {
    banner: [],
    homeNav: [],
    recommend: []
  }
  
  componentDidShow() {
    this.props.dispatch(switchTap(0))
    this.getBanner()
    this.getHomeNav()
    this.getRecommend()
  }
  getBanner = async () => {
    const { code, data } = await http.get('/banner')
    if (code == 200) {
      this.setState({
        banner: data
      })
    }
  }
  getHomeNav = async () => {
    const { code, data } = await http.get('/home_nav')
    if (code == 200) {
      this.setState({
        homeNav: data
      })
    }
  }
  getRecommend = async () => {
    const { code, data } = await http.get('/recommend')
    if (code == 200) {
      this.setState({
        recommend: data
      })
    }
  }
  toCategory = () => {
    Taro.switchTab({
      url: '/pages/category/index'
    })
  }
  toGoodsDetail = id => {
    Taro.navigateTo({
      url: `/pages/goods/index?id=${id}`
    })
  }
  render() {
    const column1 = [], column2 = []
    this.state.recommend.map((v, i) => {
      if (i % 2 == 0) {
        column1.push(v)
      } else {
        column2.push(v)
      }
    })
    return (
      <View className={ styles.container }>
        <View className={ styles.header }>
          <View className={ styles.search }>
            <AtIcon className={ styles.searchIcon } value='search' />
            <Text>请输入要搜索的商品名称</Text>
          </View>
          <AtIcon className='iconfont' prefixClass='iconcaidan' color='#fff' onClick={ this.toCategory } />
        </View>
        <Swiper
          className={ styles.swiper }
          indicatorDots
          autoplay
          circular
          indicatorColor='#bbb'
          indicatorActiveColor='#fff'
        >{ this.state.banner.map(v => {
          return <SwiperItem key={ v.id } onClick={ () => { v.goods && this.toGoodsDetail(v.goods.id) } }>
            <Image src={ v.full_url } mode='aspectFill' />
          </SwiperItem>
        }) }
        </Swiper>
        <View className={ styles.homeNav }>{ this.state.homeNav.map(v => {
          return <View key={ v.id }>
            <Image src={ v.full_icon } mode='widthFix' />
            <Text>{ v.name }</Text>
          </View>
        }) }</View>
        <View className={ styles.recommend }>
          <View className={ styles.column }>{ column1.map(v => {
            return <View key={ v.id } className={ styles.item } onClick={() => { this.toGoodsDetail(v.id) }}>
              <Image src={ v.full_thumb } mode='widthFix' />
              <View className={ styles.price }>
                <Text>
                  <Text>￥</Text>
                  { v.price }
                </Text>
                { v.original_price && <Text><Text>￥</Text>{ v.original_price } </Text> }
              </View>
              <View className={ styles.name }>{ v.name }</View>
            </View>
          }) }</View>
          <View className={ styles.column }>{ column2.map(v => {
            return <View key={ v.id } className={ styles.item } onClick={() => { this.toGoodsDetail(v.id) }}>
              <Image src={ v.full_thumb } mode='widthFix' />
              <View className={ styles.price }>
                <Text>
                  <Text>￥</Text>
                  { v.price }
                </Text>
                { v.original_price && <Text><Text>￥</Text>{ v.original_price } </Text> }
              </View>
              <View className={ styles.name }>{ v.name }</View>
            </View>
          }) }</View>
        </View>
      </View>
    )
  }
}

export default Index
