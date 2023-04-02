import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux'
import { store } from '@app/store'
import React from 'react'
import ReactDOM from 'react-dom/client'
import Main from '@layouts/Main';
import Management from '@layouts/Management';
import Home from '@pages/Home';
import Login from '@pages/Login';
import Error404 from '@components/errors/Error404';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import Admins from '@pages/Admins';
import Users from '@pages/Users';
import Trainings from '@pages/Trainings';
import Services from '@pages/Services';
import Metrics from '@pages/Metrics';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />} errorElement={<Error404 />}>
            <Route index element={<Home />} />
            <Route path='login' element={<Login />} />
            <Route path='management' element={<Management />}>
              <Route path='admins' element={<Admins />} />
              <Route path='users' element={<Users />} />
              <Route path='trainings' element={<Trainings />} />
              <Route path='services' element={<Services />} />
              <Route path='metrics' element={<Metrics />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
