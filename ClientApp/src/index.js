import React from 'react'
import { render as ReactDOMRender } from 'react-dom'
import App from './App'

ReactDOMRender(<App />, document.querySelector('[data-js="app"]'))

if (process.env.node_env === 'development' && module.hot) {
  module.hot.accept('./App.js', () => {
    const NextApp = require('./App.js').default
    ReactDOMRender(<NextApp />, document.querySelector('[data-js="app"]'))
  })
}
