

import { RootState } from "@/store";
import { requestMobileAuthCode, verifyMobileAuthCode } from "@/entities/phoneAuth/phoneauth";
import { FullSizeButton } from "@/shared/ui/fullSizeButton";
import { Button, Flex, Input } from "antd"

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface IProps {
    isRunning: boolean;
    setIsRunning: Function;
}

const PhoneAuthVerify = ({ isRunning, setIsRunning }: IProps) => {
    const createUserStore = useSelector((state: RootState) => state.createUser);
    const navigate = useNavigate();
    const [authCode, setAuthCode] = useState<string>('');
    const [minutes, setMinutes] = useState<number>(3);
    const [seconds, setSeconds] = useState<number>(0);
    const [isDisabledNextButton, setIsDisabledNextButton] = useState<boolean>(true);
    const [isDisabledAuthCodeInput, setIsDisabledAuthCodeInput] = useState<boolean>(false);
    const [isWorngCode, setIsWorngCode] = useState<boolean>(false);

    useEffect(() => {
        let countdown: any;
        if (isRunning) {
            countdown = setInterval(() => {
                if (seconds === 0) {
                    if (minutes === 0) {
                        clearInterval(countdown);
                        setIsDisabledNextButton(true);
                        setIsDisabledAuthCodeInput(true);
                    } else {
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    }
                } else {
                    setSeconds(seconds - 1);
                }
            }, 1000);
        }
        return () => clearInterval(countdown);
    }, [seconds, minutes, isRunning]);

    useEffect(() => setIsDisabledNextButton(authCode.length < 6), [authCode]);

    const init = () => {
        setMinutes(3);
        setSeconds(0);
        setIsDisabledAuthCodeInput(false);
        setIsRunning(false);
    }

    const requestMobileAuthCodeSMS = async () => {
        init();
        try {
            if (!createUserStore.mobile || !createUserStore.countryCode) return;
            const res = await requestMobileAuthCode({ mobile: createUserStore.mobile, countryCode: createUserStore.countryCode });
            if (res.data.body) {
                setIsRunning(true);
            }
        } catch (e: any) {
            console.error('error', e)
        }
    }

    const verifyMobileAuthCodeSMS = async () => {
        try {
            const res = await verifyMobileAuthCode({ mobile: createUserStore.mobile, code: authCode });
            if (res.data.body) {
                setIsRunning(false);
                navigate('/createuser')
            }
        } catch (e: any) {
            console.error('error', e)
            if (e.response.data.result.code === "PN-0002") {
                setIsWorngCode(true);
            }
        }
    }

    return <>
        <div style={{ color: 'var(--Base-Base-Black)' }}>인증번호 입력</div>
        <Flex justify="space-between" style={{ marginTop: 8 }}>
            <div style={{ width: 270 }}>
                <Input
                    size="large"
                    value={authCode}
                    onChange={(e) => { setAuthCode(e.target.value); setIsWorngCode(false); }}
                    maxLength={6}
                    status={isWorngCode ? 'error' : undefined}
                    disabled={isDisabledAuthCodeInput}
                    suffix={<div style={{ color: 'var(--Error-Error)' }}>{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</div>} />
            </div>
            <div style={{ width: 65 }}>
                <Button type="primary" size="large" ghost style={{ borderRadius: "var(--Spacingxs)" }} onClick={requestMobileAuthCodeSMS}>
                    재전송
                </Button>
            </div>
        </Flex>
        {isWorngCode ? <div style={{ color: "var(--Error-Error)", fontSize: '14px', marginTop: 8 }}>유효하지 않은 인증번호 입니다.</div>
            : <div style={{ color: "var(--Neutrals-Neutrals700)", fontSize: '14px', marginTop: 8 }}>통신사에 따라 최대 1분까지 소요될 수 있습니다.</div>}
        <div style={{ marginTop: 40 }}>
            <FullSizeButton text="다음" onClick={verifyMobileAuthCodeSMS} isDisabled={isDisabledNextButton} />
        </div>
    </>
}

export default PhoneAuthVerify;