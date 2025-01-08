import AdminUserRegister from '@/views/adminuserregister';
import CenterSelect from '@/views/centerselect';
import CenterRegister from '@/views/centerregister';
import CreateUserView from '@/views/createuser';
import FindAccount from '@/views/findaccount';
import InviteAdmin from '@/views/invite/admin';
import Login from '@/views/login';
import { PhoneAuth } from '@/views/phoneauth';
import ResetPasswordView from '@/views/resetpassword';
import SuccessFindId from '@/views/successfindid';
import SuccessSignupCenterOwner from '@/views/successsignupcenterowner';
import SuccessSignupManager from '@/views/successsignupmanager';
import UserType from '@/views/usertype';
import { Outlet } from 'react-router-dom';

const LoginRoutes = {
    path: '/',
    element: <Outlet />,
    children: [
        { path: '/adminuserregister', element: <AdminUserRegister /> },
        { path: '/centerregister', element: <CenterRegister /> },
        { path: '/centerselect', element: <CenterSelect /> },
        { path: '/createuser', element: <CreateUserView /> },
        { path: '/findaccount', element: <FindAccount /> },
        { path: '/invite/admin', element: <InviteAdmin /> },
        { path: '/login', element: <Login /> },
        { path: '/phoneauth', element: <PhoneAuth /> },
        { path: '/resetpassword', element: <ResetPasswordView /> },
        { path: '/successfindid', element: <SuccessFindId /> },
        { path: '/successsignupcenterowner', element: <SuccessSignupCenterOwner /> },
        { path: '/successsignupmanager', element: <SuccessSignupManager /> },
        { path: '/usertype', element: <UserType /> },
    ]
};

export default LoginRoutes;