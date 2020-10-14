import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, ScrollView, Image, Text } from '@tarojs/components'
import { connect } from 'react-redux'
import { switchTap } from '@/store/actions/user'
import withShare from '@/components/withShare'
import styles from './index.module.less'
import http from '@/utils/http'

@connect(({ user }) => ({
  userInfo: user.userInfo
}))
@withShare()
class Index extends Component {

  state = {
    data: [],
    currentTab: 0,
    currentCon: 0,
    scrollTop: 0
  }
  componentDidMount(){
   
  }
  componentDidShow(){
    this.props.dispatch(switchTap(1))
    this.getData()
  }
  getData = async () => {
    const { code, data } = await http.get('/category')
    if(code == 200){
      this.setState({
        data
      })
    }
  }
  toGoodsDetail = id => {
    Taro.navigateTo({
      url: `/pages/goods/index?id=${id}`
    })
  }
  switchTab = active => {
    const query = Taro.createSelectorQuery()
    query.selectAll(`.tabItem`).boundingClientRect()
    query.exec(res => {
      const top = res[0].reduce((top, v, i) => {
        if(i < active - 1){
          return top + v.height
        }else{
          return top
        }
      }, 0)
      this.setState({
        scrollTop: top,
        currentCon: active,
        currentTab: active,
        type: 'click'
      },() => {
        setTimeout(() => {
          this.setState({ type: '' }) 
        }, 1000);
      })
    })
  }
  onScroll = e => {
    if(this.state.type == 'click'){
      return false
    }
    const query = Taro.createSelectorQuery()
    query.selectAll(`.conItem`).boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(res => {
      let active = this.state.currentTab
      res[0].map((v, i) => {
        if(v.top <= 15 && v.bottom > 15){
          active = i
        }
      })
      const query2 = Taro.createSelectorQuery()
      query2.selectAll(`.tabItem`).boundingClientRect()
      query2.exec(res => {
        const top = res[0].slice(0, active-1).reduce((top, v) => top + v.height, 0)
        this.setState({
          scrollTop: active == 0 ? 0 : top,
          currentTab: active
        })
      })
    })
  }
  render () {
    const { data, currentTab, scrollTop, currentCon } = this.state
    return (
      <View className={styles.container}>
        <ScrollView 
          className={styles.tabBar}
          scrollY
          enhanced={true}
          bounces={false}
          showScrollbar={false}
          pagingEnabled={false}
          // scrollIntoView={`tab_${currentTab}`}
          scrollTop={scrollTop}
          scrollWithAnimation
        >
          {data.map((v, i) => {
            return <View 
              id={`tab_${i}`}
              key={v.id}
              className={`${currentTab == i && styles.currentTab} tabItem`}
              onClick={() => { this.switchTab(i) }}
            >
                {v.name}
            </View>
          })}
        </ScrollView>
        <ScrollView
          className={styles.content}
          scrollY
          enhanced={true}
          bounces={false}
          showScrollbar={false}
          pagingEnabled={false}
          scrollIntoView={`con_${currentCon}`}
          scrollWithAnimation
          onScroll={this.onScroll}
        >
          {data.map((v, i) => {
            return <View id={`con_${i}`} key={v.id} className={`${styles.listItem} conItem`}>
              <View className={styles.title}>{v.name}</View>
              {v.goods.length >0 && <View className={styles.con}>{v.goods.map((item, index) => {
                return <View key={index} className={styles.item} onClick={() => { this.toGoodsDetail(item.id) }}>
                  <Image src={item.full_thumb} mode='aspectFit' />
                  <View>
                    <View className={styles.price}>
                      <Text>
                        <Text>￥</Text>
                        { item.price }
                      </Text>
                      {item.original_price && <Text>
                        <Text>￥</Text>
                        { item.original_price }
                      </Text>}
                    </View>
                    <View className={styles.goodsName}>{item.name}</View>
                  </View>
                </View>
              })}</View>}
              {v.goods.length == 0 && <View className={styles.not}>暂无商品</View>}
            </View>
          })}
        </ScrollView>
      </View>
    )
  }
}

export default Index
