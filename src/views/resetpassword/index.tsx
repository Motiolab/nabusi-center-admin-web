

import ResetPassword from '@/features/resetpassword'
import { checkChangePasswordCode } from '@/entities/account';
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from 'react';

const ResetPasswordView = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const code = searchParams.get('code');

    useEffect(() => {
        const validateCode = async () => {
            if (!code) {
                alert('유효하지 않은 페이지입니다.');
                navigate(-1);
                return;
            }
            try {
                const res = await checkChangePasswordCode(code);
                if (!res.data) {
                    alert('유효하지 않은 코드입니다.');
                    navigate(-1);
                }
            } catch (err) {
                alert('오류가 발생했습니다. 다시 시도해주세요.');
                navigate(-1);
            }
        };

        validateCode();
    }, [code, navigate]);

    return (
        <div style={{ width: 344, margin: '78px auto', color: 'var(--Neutrals-Neutrals700)' }}>
            <div style={{ fontSize: 24, color: 'var(--Neutrals-Neutrals700)', textAlign: 'center' }}>비밀번호 재설정</div>
            <div style={{ marginTop: 16, fontSize: 16, color: 'var(--Neutrals-Neutrals500)', textAlign: 'center' }}>비밀번호를 다시 설정해 주세요</div>
            <div style={{ marginTop: 32 }}>
                <ResetPassword code={code} />
            </div>
        </div>
    )
}

export default ResetPasswordView;