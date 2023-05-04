import { ROUTES } from 'constants/routes'
import { RequiredAuth } from 'layouts/RequiredAuth/RequiredAuth'
import { HomePage } from 'pages/HomePage/HomePage'
import {LoginPage} from 'pages/LoginPage/LoginPage'
import React, { FC } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { store } from 'store'

const App: FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.login} element={<LoginPage/>}> </Route>
        

            <Route element={<RequiredAuth/>}>

              <Route path={ROUTES.home} element={<HomePage/>} />
            </Route>
          

          <Route path='*' element={<div>Not found</div>}/>

        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
