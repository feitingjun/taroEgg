import React, { Component } from 'react'
import { Provider } from 'react-redux'

import configStore from './store'
import { login } from '@/store/actions/user'

import '@/styles/custom-variables.scss'
import './app.less'
import './styles/icons/iconfont.less'

const store = configStore()

class App extends Component {

  async componentDidMount () {
    store.dispatch(login());
  }

  render () {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
