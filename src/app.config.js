export default {
  pages: [
    'pages/index/index',
    'pages/category/index',
    'pages/mine/index',
    'pages/login/index',
    'pages/goods/index'
  ],
  window: {
    backgroundColor: '#fff',
    navigationBarTextStyle: 'white', //导航栏标题颜色，仅支持 black / white
    backgroundTextStyle: 'light', // 下拉 loading 的样式，仅支持 dark / light
    navigationBarBackgroundColor: '#289af7', //标题栏背景色
    navigationBarTitleText: '一江明月一江秋',
    // navigationStyle: 'custom'
  },
  tabBar: {
    custom: true,
    color: '#333',
    selectedColor: '#000',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页'
      },
      {
        pagePath: 'pages/category/index',
        text: '分类'
      },
      {
        pagePath: 'pages/mine/index',
        text: '我的'
      }
    ]
  },
  sitemapLocation: 'sitemap.json',
  permission: {
    'scope.userLocation': {
      'desc': '我们需要你的位置信息以实现定位'
    }
  },
  servicemarket: true
}
