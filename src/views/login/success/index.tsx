import { adminLoginSuccess } from "@/entities/account";
import { getRedirectUrlAfterLogin, setRedirectUrlAfterLogin } from "@/shared/utils/redirectUrlAfterLogin";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginSuccess = () => {
    const navigate = useNavigate();
    useEffect(() => {
        requestCenterListByAdminUser();
    }, [])

    const requestCenterListByAdminUser = async () => {
        await adminLoginSuccess()
        const redirectUrlAfterLogin = getRedirectUrlAfterLogin();
        if (redirectUrlAfterLogin) {
            setRedirectUrlAfterLogin('undefined');
            navigate(redirectUrlAfterLogin);
        }
        navigate('/centerselect')
    }
    return <>
        <div>로그인 성공했습니다.</div>
    </>
}

export default LoginSuccess