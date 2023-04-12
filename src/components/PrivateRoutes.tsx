import { Navigate, Outlet } from 'react-router-dom';
import { selectCredential } from '@state/credential';
import { useAppSelector } from '@app/hooks';

export default function PrivateRoutes() {
    const { accessToken } = useAppSelector(selectCredential);
    // const location = useLocation();

    return (
        <>
            { accessToken? <Outlet /> : <Navigate to="/" /*state={{ from: location }} replace*/></Navigate> }
        </>
    )
};
