import React, { Component } from 'react'
import { useShareAppMessage } from '@tarojs/taro'
import shareImg from '@/assets/share.jpg'

/**
 * @withShare需要在所有装饰器最后面，
 * 否则会导致小程序页面相关的生命周期不生效，
 * 因为在withShare里面需要通过forwardedRef引用你的页面组件，
 * 否则withShare才是实际的页面组件，被withShare包裹的其实是withShare的子组件
 * 
 */
export default (opt={}) => {
  return Component => {
    return props => {
      useShareAppMessage(() => ({
        title: '小程序工具dome',
        path: '/pages/index/index',
        imageUrl: shareImg,
        ...opt
      }))
      return <Component { ...props } ref={props.forwardedRef} />
    }
  }
  // return Component => {
  //   class withShare extends React.Component {
  //     onShareAppMessage(){
  //       return {
  //         title: '一江明月一江秋',
  //         path: '/pages/index/index',
  //         imageUrl: shareImg,
  //         ...opt
  //       }
  //     }
  //     render(){
  //       return <Component />
  //     }
  //   }
  //   return withShare
  // }
}