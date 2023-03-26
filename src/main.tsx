import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux'
import { store } from '@app/store'
import React from 'react'
import ReactDOM from 'react-dom/client'
import Main from '@layouts/Main';
import Home from '@pages/Home';
import Login from '@pages/Login';
import Error404 from '@components/errors/Error404';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />} errorElement={<Error404 />}>
            <Route index element={<Home />}></Route>
            <Route path='login' element={<Login />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
