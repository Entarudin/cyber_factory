import React, { FC } from 'react'
import { Provider } from 'react-redux'

import { store } from 'store'

const App: FC = () => {
  return (
    <Provider store={store}>
      <div>I am frontend</div>
    </Provider>
  )
}

export default App
