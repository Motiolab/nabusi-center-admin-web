import { Flex, Input } from "antd";
import { EyeTwoTone, EyeInvisibleOutlined, CheckOutlined } from '@ant-design/icons';
import { useState } from "react";
import { validatePassword } from "@/shared/utils/validate/validPassword";

interface IProps {
    password: string;
    setPassword: Function;
    setIsAvaliablePassword: Function;
}

const InputPasswordCheck = ({ password, setPassword, setIsAvaliablePassword }: IProps) => {
    const [isCheckedPasswordLength, setIsCheckedPasswordLength] = useState<Boolean>(false)
    const [isCheckedPasswordStrong, setIsCheckedPasswordStrong] = useState<Boolean>(false)
    const [isDoubleCheck, setIsDoubleCheck] = useState<Boolean>(false)

    const changePassword = (e: any) => {
        const password = e.target.value
        const { isLengthValid, isStrong } = validatePassword(password)

        setIsCheckedPasswordLength(isLengthValid)
        setIsCheckedPasswordStrong(isStrong)
        setPassword(password)
        setIsDoubleCheck(false)
        setIsAvaliablePassword(false)
    }

    const changePasswordDoubleCheck = (e: any) => {
        setIsDoubleCheck(isCheckedPasswordLength && isCheckedPasswordStrong && password === e.target.value)
        setIsAvaliablePassword(isCheckedPasswordLength && isCheckedPasswordStrong && password === e.target.value)
    }

    return (
        <div>
            <div style={{ fontSize: 14 }}>비밀번호</div>
            <div style={{ marginTop: 8 }}>
                <Input.Password
                    placeholder="비밀번호를 입력해 주세요"
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    size="large"
                    onChange={changePassword}
                />
            </div>
            <Flex style={{ marginTop: 8, fontSize: '14px', color: 'var(--Neutrals-Neutrals700)' }}>
                <div><CheckOutlined style={{ color: isCheckedPasswordLength ? 'var(--Success-Success)' : 'var(--Neutrals-Neutrals700)' }} /> 8~16자</div>
                <div style={{ marginLeft: 8 }}><CheckOutlined style={{ color: isCheckedPasswordStrong ? 'var(--Success-Success)' : 'var(--Neutrals-Neutrals700)' }} /> 영어 대소문자, 숫자, 특수기호 중 2개 이상</div>
            </Flex>
            <div style={{ fontSize: 14, marginTop: 20 }}>비밀번호 확인</div>
            <div style={{ marginTop: 8 }}>
                <Input.Password
                    placeholder="다시 한번 입력해 주세요"
                    iconRender={() => <></>}
                    size="large"
                    onChange={changePasswordDoubleCheck}
                />
            </div>
            {isDoubleCheck && <div style={{ color: 'var(--Success-Success)', fontSize: 14, marginTop: 8 }}><CheckOutlined /> 비밀번호가 동일합니다.</div>}
        </div>
    )
}
export default InputPasswordCheck;