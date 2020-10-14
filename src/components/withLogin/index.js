import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { useSelector  } from 'react-redux'
import styles from './index.module.less'

export default Component => {
  return props => {
    const userInfo = useSelector(state => state.user.userInfo)
    return (
      userInfo ? 
      <Component {...props} ref={props.forwardedRef} /> 
      :
      <View className={styles.loadingBox}>
        <View class={styles.circle}>
          <View class={`${styles.circle1} ${styles.circle}`}></View>
          <View class={`${styles.circle2} ${styles.circle}`}></View>
          <View class={`${styles.circle3} ${styles.circle}`}></View>
          <View class={`${styles.circle4} ${styles.circle}`}></View>
          <View class={`${styles.circle5} ${styles.circle}`}></View>
          <View class={`${styles.circle6} ${styles.circle}`}></View>
          <View class={`${styles.circle7} ${styles.circle}`}></View>
          <View class={`${styles.circle8} ${styles.circle}`}></View>
          <View class={`${styles.circle9} ${styles.circle}`}></View>
          <View class={`${styles.circle10} ${styles.circle}`}></View>
          <View class={`${styles.circle11} ${styles.circle}`}></View>
          <View class={`${styles.circle12} ${styles.circle}`}></View>
        </View>
        <View className={styles.text}>加载中...</View>
      </View>
    )
  }
}