import React, { Component } from 'react'
import Taro, { Current } from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem, Image, ScrollView } from '@tarojs/components'
import { connect } from 'react-redux'
import { AtRate } from 'taro-ui'
import AuthBlock from '@/components/authBlock/index'
import withLogin from '@/components/withLogin'
import '@tarojs/taro/html5.css'
import http from '@/utils/http'
import styles from './index.module.less'
import canshuImg from '@/assets/canshu.png'
import xqImg from '@/assets/xq.png'
import scImg from '@/assets/sc.png'
import yscImg from '@/assets/sc1.png'
import plImg from '@/assets/pl.png'
import RightImg from '@/assets/right.png'
import txImg from '@/assets/tx.png'

@connect(({ user }) => ({
  userInfo: user.userInfo
}))
@withLogin
class Index extends Component {
  state = {
    full_banner: [],
    comments: [],
    total: 0
  }
  componentDidMount() {
    this.getData()
    this.getComments()
    // 修改所有 img 标签的mode属性
    const imgs = [];
    Taro.options.html.voidElements.add('img')
    Taro.options.html.transformElement = (el) => {
      if (el.nodeName === 'image') {
        imgs.push(el.props.src);
        el.addEventListener('tap', () => {
          Taro.previewImage({
            urls: imgs,
            current: el.props.src
          })
        })
        el.setAttribute('mode', 'widthFix')
      }
      return el
    }
  }
  // 或其商品信息
  getData = async () => {
    const { code, data } = await http.get(`/goods/${Current.router.params.id}`);
    if (code == 200) {
      Taro.setNavigationBarTitle({
        title: data.name
      })
      this.setState({
        ...data
      })
    }
  }
  // 获取评论
  getComments = async () => {
    const { data, code } = await http.get(`/comment/${Current.router.params.id}`, { pageSize: 3 });
    if(code == 200){
      this.setState({
        comments: data.data,
        total: data.total,
        good: data.good
      })
    }
  }
  // 收藏
  handleCollect = async () => {
    const { code } = await http.post('/collect/goods', { id: Current.router.params.id });
    if (code == 200) {
      this.getData();
    }
  }
  // 取消收藏
  cancelCollect = async () => {
    const { code } = await http.post('/collect/cancel', { record_id: Current.router.params.id });
    if (code == 200) {
      this.getData();
    }
  }
  // 预览
  previewImage = url => {
    Taro.previewImage({
      urls: this.state.full_banner,
      current: url
    })
  }
  render() {
    const property = this.state.property && JSON.parse(this.state.property) || []
    let full_detail = this.state.full_detail;
    if (full_detail) {
      full_detail = full_detail.replace(RegExp('&emsp', 'g'), ` `)
      full_detail = full_detail.replace(RegExp('&nbsp;', 'g'), ` `)
    }
    const html = { __html: full_detail }
    return (
      <View className={ styles.container }>
        <Swiper
          className={ styles.swiper }
          indicatorDots
          autoplay
          circular
          indicatorColor='#bbb'
          indicatorActiveColor='#fff'
        >{ this.state.full_banner.map((v, i) => {
          return <SwiperItem key={ i } onClick={() => { this.previewImage(v) }}>
            <Image src={ v } mode='aspectFill' />
          </SwiperItem>
        }) }
        </Swiper>
        <View className={ styles.goodsNameBox }>
          <View className={ styles.priceBox }>
            <View className={ styles.price }>
              <View>￥<Text>{ this.state.price }</Text></View>
              { this.state.original_price && <View>￥<Text>{ this.state.original_price }</Text></View> }
            </View>
            <View className={ styles.collectBox }>
              { !this.state.isCollect ?
                <AuthBlock>
                  <View className={ styles.collect } onClick={ this.handleCollect }>
                    <Image src={ scImg } mode='widthFix' />
                    <Text>{ this.state.collectNum }</Text>
                  </View>
                </AuthBlock>
                :
                <AuthBlock>
                  <View className={ styles.collect } onClick={ this.cancelCollect }>
                    <Image src={ yscImg } mode='widthFix' />
                    <Text className={ styles.red }>已收藏</Text>
                  </View>
                </AuthBlock>
              }
            </View>
          </View>
          <View className={ styles.goodsName }>{ this.state.name }</View>
          <View className={ styles.sales }>已售{ this.state.sales || 0 }件</View>
        </View>
        <View className={ styles.commentBox }>
          <View className={ styles.title }>
            <View>
              <Image src={ plImg } mode='widthFix'></Image>
              <Text>评论</Text>
              <Text className={styles.commentTotal}>{ this.state.total ? this.state.total + '条' : ''}</Text>
            </View>
            <View>
              <Text className={styles.goodComment}>{ this.state.total > 0 ? `好评度 ${parseInt((this.state.good/this.state.total * 100).toFixed(1))}%` : '' }</Text>
              <Image src={RightImg} mode='widthFix' />
            </View>
          </View>
          {(this.state.comments && this.state.comments.length>0) ? <View className={ styles.commentList }>{this.state.comments.map(v => {
            return <View className={styles.commentItem} key={v.id}>
              <View className={styles.commentUser}>
                <Image src={v.from_user && v.is_anonymity != 1? v.from_user.avatarUrl : txImg} mode='aspectFill' />
                <View>
                  <View className={styles.userName}>{v.from_user && v.is_anonymity != 1? v.from_user.nickName : '匿名'}</View>
                  <View><AtRate className={styles.rate} value={v.grade} /></View>
                </View>
              </View>
              <View className={styles.content}>{ v.content }</View>
              {v.full_picture && <View className={styles.picture}>{v.full_picture.map((v,i) => (
                <Image src={v} mode='aspectFill' key={i} />
              ))}</View>}
            </View>
          })}</View> : <View className={styles.not}>暂无评论</View>}
        </View>
        <View className={ styles.parameter }>
          <View className={ styles.title }>
            <Image src={ canshuImg } mode='widthFix'></Image>
            <Text>规格参数</Text>
          </View>
          {property && property.length>0 ? <View className={ styles.parameterList }>{ property.map((v, i) => {
            return <View className={ styles.parameterItem }>
              <View>{ v.name }</View>
              <View>{ v.value }</View>
            </View>
          }) }</View> : <View className={styles.not}>暂无参数</View>}
        </View>
        <View className={ styles.detailBox }>
          <View className={ styles.title }>
            <Image src={ xqImg } mode='widthFix'></Image>
            <Text>商品介绍</Text>
          </View>
          { this.state.detail ? <View key={this.state.detail} decode space className='taro_html' dangerouslySetInnerHTML={ html }></View>
          :
          <View className={styles.not}>暂无介绍</View>
          }
        </View>
      </View>
    )
  }
}

export default Index
