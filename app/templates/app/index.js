import { createStore } from 'redux'
import appReducer from './reducers'
import React from 'react'
import App from './components/App'
import { Provider } from 'react-redux'
import { render } from 'react-dom'

let initialState = {
}

let store = createStore(appReducer, initialState<%if (devTool) {%>, window.devToolsExtension && window.devToolsExtension()<%}%>)

// Render the App with the store we created from before
render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'))
