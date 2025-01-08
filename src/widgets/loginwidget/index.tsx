import { Button, Checkbox, Flex, Input } from "antd";
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import { FullSizeButton } from "@/shared/ui/fullSizeButton";
import { useState } from "react";
import { login, logout } from "@/entities/account";
import { getLocalAccessToken, removeLocalAccessToken, setLocalAccessToken } from "@/shared/utils/token";
import { useNavigate } from "react-router-dom";

const LoginWidget = () => {
    const navigate = useNavigate();
    const [id, setId] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [idError, setIdError] = useState<string>('')
    const [passwordError, setPasswordError] = useState<string>('')

    const clickLoginButton = async () => {
        try {
            const resLogin = await login(id, password)
            setLocalAccessToken(resLogin.data.body.accessToken);
        } catch (e: any) {
            if (e.response.data.result.code === 'SA-0001') {
                setIdError(e.response.data.result.frontMessage)
            } else if (e.response.data.result.code === 'SA-0002') {
                setPasswordError(e.response.data.result.frontMessage)
            }
        }
    }
    const clickLogoutButton = () => {
        removeLocalAccessToken()
        logout()
    }

    return (
        <div>
            {getLocalAccessToken()
                ? <Flex
                    justify='center'
                >
                    <Button style={{ marginRight: '20px' }} onClick={() => navigate('/centerselect')}>센터 선택</Button>
                    <Button onClick={clickLogoutButton}>로그아웃</Button>
                </Flex>
                : <>
                    <Input
                        placeholder="아이디"
                        size="large"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                    {idError !== '' && <div style={{ marginTop: 8, fontSize: 'var(--Size-caption)', color: 'var(--Error-Error)' }}>
                        {idError}
                    </div>}
                    <Input.Password
                        placeholder="비밀번호를 입력해 주세요"
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        size="large"
                        style={{ marginTop: 24 }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {passwordError !== '' && <div style={{ marginTop: 8, fontSize: 'var(--Size-caption)', color: 'var(--Error-Error)' }}>
                        {passwordError}
                    </div>}
                    <Flex
                        justify='space-between'
                        style={{ marginTop: 24, fontSize: '14px' }} >
                        <div><Checkbox onChange={() => { }} style={{ color: 'var(--Base-Base-Black)' }}>자동 로그인</Checkbox></div>
                        <div style={{ color: 'var(--Neutrals-Neutrals400)', cursor: 'pointer' }} onClick={() => navigate('/findaccount')}>
                            <span>아이디</span> ·
                            <span> 비밀번호</span>
                            <span> 찾기</span>
                        </div>
                    </Flex>
                    <FullSizeButton text="로그인" style={{ marginTop: 40 }} onClick={clickLoginButton} />
                </>
            }
        </div>
    )
}

export default LoginWidget;