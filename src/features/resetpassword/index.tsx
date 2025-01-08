

import { useState } from "react";
import InputPasswordCheck from "../inputpasswordcheck"
import { FullSizeButton } from "@/shared/ui/fullSizeButton";
import { useNavigate } from "react-router-dom";
import { requestChangePassword } from "@/entities/account";

interface IProps {
    code: string | null
}

const ResetPassword = ({ code }: IProps) => {
    const navigate = useNavigate();
    const [password, setPassword] = useState<string>('');
    const [isAvaliablePassword, setIsAvaliablePassword] = useState<boolean>(false);

    const clickCreateUserButton = () => {
        if (isAvaliablePassword && code) {
            requestChangePassword({ code, password })
                .then((res: any) => {
                    if (res.data) {
                        alert("비밀번호가 변경되었습니다.")
                        navigate('/login')
                    } else {
                        alert("실패했습니다. 다시 시도해주세요")
                        navigate('/findaccount')
                    }
                }).catch((e: any) => console.error('e', e))
        }
    }

    return (
        <div>
            <InputPasswordCheck password={password} setPassword={setPassword} setIsAvaliablePassword={setIsAvaliablePassword} />
            <div style={{ marginTop: 53 }}>
                <FullSizeButton text="비밀번호 재설정하기" isDisabled={!isAvaliablePassword} onClick={clickCreateUserButton} />
            </div>
        </div >
    )
}

export default ResetPassword