import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux'

import { store } from '@app/store'
import Login from '@pages/Login';
import Home from '@pages/Home';
import Users from '@pages/Users';
import Trainings from '@pages/Trainings';
import Services from '@pages/Services';
import Metrics from '@pages/Metrics';

export default function App() {
    return (
        <Provider store={store}>
            <Routes>
                {/* PUBLICAS */}
                <Route index element={<Login/>} />
                <Route path='/login' element={<Login />} />
                {/* PRIVADAS */}
                <Route path='/home' element={<Home />} />
                <Route path='/users' element={<Users />} />
                <Route path='/trainings' element={<Trainings />} />
                <Route path='/services' element={<Services />} />
                <Route path='/metrics' element={<Metrics />} />
            </Routes>
        </Provider>
    )
};