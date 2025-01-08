

import { RootState } from "@/store";
import { requestMobileAuthCode, verifyMobileAuthCode } from "@/entities/phoneAuth/phoneauth";
import { FullSizeButton } from "@/shared/ui/fullSizeButton";
import { Button, Flex, Input } from "antd"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface IProps {
    isStartTimer: boolean;
    authCode: string;
    changeAuthCode: Function;
    status: 'error' | undefined;
}

const InputPhoneAuthCode = ({ isStartTimer, authCode, changeAuthCode, status }: IProps) => {
    const [minutes, setMinutes] = useState<number>(3);
    const [seconds, setSeconds] = useState<number>(0);
    const [isDisabledAuthCodeInput, setIsDisabledAuthCodeInput] = useState<boolean>(false);

    useEffect(() => {
        let countdown: any;
        if (isStartTimer) {
            countdown = setInterval(() => {
                if (seconds === 0) {
                    if (minutes === 0) {
                        clearInterval(countdown);
                        setIsDisabledAuthCodeInput(true);
                    } else {
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    }
                } else {
                    setSeconds(seconds - 1);
                }
            }, 1000);
        } else {
            clearInterval(countdown);
            setIsDisabledAuthCodeInput(true);
        }
        return () => clearInterval(countdown);
    }, [seconds, minutes, isStartTimer]);

    return <>
        <Input
            size="large"
            value={authCode}
            onChange={(e) => changeAuthCode(e.target.value)}
            maxLength={6}
            status={status}
            disabled={isDisabledAuthCodeInput}
            suffix={<div style={{ color: 'var(--Error-Error)' }}>{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</div>} />
    </>
}

export default InputPhoneAuthCode;