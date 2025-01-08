

import { FullSizeButton } from "@/shared/ui/fullSizeButton";
import { Button, Flex } from "antd";
import { useEffect, useState } from "react";
import PhoneAuthCodeVerify from "../inputphoneauthcode";



interface IProps {
    isWrongCode: boolean
    clickReSendPhoneAuthCodeButton: Function
    clickValidPhoneAuthCodeButton: Function
    isStartTimer: boolean
}

const ValidPhoneAuthCode = ({ isWrongCode, clickReSendPhoneAuthCodeButton, clickValidPhoneAuthCodeButton, isStartTimer }: IProps) => {
    const [authCode, setAuthCode] = useState<string>('');
    const [isDisabledValidButton, setIsDisabledValidButton] = useState<boolean>(true);

    useEffect(() => setIsDisabledValidButton(authCode.length < 6), [authCode]);

    return (
        <div>
            <div style={{ color: 'var(--Base-Base-Black)' }}>인증번호 입력</div>
            <Flex justify="space-between" style={{ marginTop: 8 }}>
                <div style={{ width: 270 }}>
                    <PhoneAuthCodeVerify isStartTimer={isStartTimer} authCode={authCode} changeAuthCode={(code: string) => setAuthCode(code)} status={isWrongCode ? 'error' : undefined} />
                </div>
                <div style={{ width: 65 }}>
                    {false ? <Button
                        type="primary"
                        size="large"
                        ghost
                        style={{ borderRadius: "var(--Spacingxs)" }}
                        onClick={() => clickReSendPhoneAuthCodeButton()}>
                        재전송
                    </Button> : <Button
                        type="primary"
                        size="large"
                        ghost style={{ borderRadius: "var(--Spacingxs)" }}
                        onClick={() => clickValidPhoneAuthCodeButton(authCode)}
                        disabled={isDisabledValidButton}
                    >
                        인증하기
                    </Button>
                    }
                </div>
            </Flex >

            {isWrongCode ? <div style={{ color: "var(--Error-Error)", fontSize: '14px', marginTop: 8 }} > 유효하지 않은 인증번호 입니다.</div >
                : <div style={{ color: "var(--Neutrals-Neutrals700)", fontSize: '14px', marginTop: 8 }}>통신사에 따라 최대 1분까지 소요될 수 있습니다.</div>}

        </div >
    )
}
export default ValidPhoneAuthCode;