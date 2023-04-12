import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux'

import { store } from '@app/store'
import Login from '@pages/Login';
import Admins from '@pages/Admins';
import Users from '@pages/Users';
import Trainings from '@pages/Trainings';
import Services from '@pages/Services';
import Metrics from '@pages/Metrics';
import PrivateRoutes from '@components/PrivateRoutes';

export default function App() {
    return (
        <Provider store={store}>
            <Routes>
                {/* PUBLICAS */}
                <Route index element={<Login/>} />
                {/* PRIVADAS */}
                <Route element={<PrivateRoutes />}>
                    <Route path='/admins' element={<Admins />} />
                    <Route path='/users' element={<Users />} />
                    <Route path='/trainings' element={<Trainings />} />
                    <Route path='/services' element={<Services />} />
                    <Route path='/metrics' element={<Metrics />} />
                </Route>
            </Routes>
        </Provider>
    )
};