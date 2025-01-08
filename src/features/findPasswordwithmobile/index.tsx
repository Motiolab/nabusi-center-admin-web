import MobileInput from "@/shared/ui/mobileInput";
import NameInput from "@/shared/ui/nameInput";
import { useState } from "react";
import { FullSizeButton } from "@/shared/ui/fullSizeButton";
import { requestPhoneAuthCodeToFindPassword } from '@/entities/member';
import ValidPhoneAuthCode from "../validphoneauthcode";
import { useNavigate } from "react-router-dom";
import { getChangePasswordIdAfterVerifyMobileAuthCode, getUserIdAfterVerifyMobileAuthCode, verifyMobileAuthCode } from "@/entities/phoneAuth/phoneauth";
import { Input } from "antd";

const FindPasswordWithMobile = () => {
    const navigate = useNavigate();
    const [id, setId] = useState<string>('');
    const [idError, setIdError] = useState<string>('');
    const [mobile, setMobile] = useState<string>('');
    const [mobileError, setMobileError] = useState<string>('');
    const [isClickPhoneAuthCodeRequest, setIsClickPhoneAuthCodeRequest] = useState<boolean>(false);
    const [isStartTimer, setIsStartTimer] = useState<boolean>(false);
    const [isWrongCode, setIsWrongCode] = useState<boolean>(false);
    const [isDisabledNextButton, setIsDisabledNextButton] = useState<boolean>(true);
    const [changePasswordCode, setChangePasswordCode] = useState<string>('');
    const clickRequestPhoneAuthCodeButton = () => {
        getPhoneAuthCodeToFindId()
    }

    const getPhoneAuthCodeToFindId = async () => {
        try {
            const res = await requestPhoneAuthCodeToFindPassword({ userId: id, mobile });
            setIsClickPhoneAuthCodeRequest(true);
            setIsStartTimer(true);
        } catch (e: any) {
            console.error('error', e);
            if (!e.response.data.result) {
                return
            }
            if (e.response.data.result.code === 'PU-0006') {
                setIdError(e.response.data.result.frontMessage)
            }
            if (e.response.data.result.code === 'PU-0005') {
                setMobileError(e.response.data.result.frontMessage)
            }
        }
    }
    const validPhoneAuthCodeWithServer = async (code: string) => {
        try {
            const res = await getChangePasswordIdAfterVerifyMobileAuthCode({ mobile: mobile, code });
            if (res.data.body) {
                setIsStartTimer(false)
                setIsDisabledNextButton(false)
                setChangePasswordCode(res.data.body)
                setIsWrongCode(false)
            }
        } catch (e: any) {
            console.error('error', e)
            if (e.response.data.result.code === "PN-0002") {
                setIsWrongCode(true);
            }
        }
    }

    const clickNextButton = () => navigate(`/resetpassword?code=${changePasswordCode}`)

    return (
        <div style={{ marginTop: 8 }}>
            <div style={{ marginTop: 20 }}>
                <div style={{ color: 'var(--Base-Base-Black}', fontSize: 14 }}>아이디</div>
                <Input
                    placeholder="아이디"
                    size="large"
                    value={id}
                    style={{ marginTop: 8 }}
                    onChange={(e) => {
                        setId(e.target.value)
                        setIdError('')
                    }}
                />
                {idError !== '' && <div style={{ marginTop: 8, fontSize: 'var(--Size-caption)', color: 'var(--Error-Error)' }}>
                    {idError}
                </div>}
            </div>
            <div style={{ marginTop: 20 }}>
                <MobileInput mobile={mobile} setMobile={(mobile: string) => {
                    setMobile(mobile)
                    setMobileError('')
                }} />
                {mobileError !== '' && <div style={{ marginTop: 8, color: 'var(--Error-Error)', fontSize: 14 }}>{mobileError}</div>}
            </div>
            <div style={{ marginTop: 30 }}>
                {isClickPhoneAuthCodeRequest ? <>
                    <ValidPhoneAuthCode
                        isWrongCode={isWrongCode}
                        clickReSendPhoneAuthCodeButton={() => getPhoneAuthCodeToFindId()}
                        clickValidPhoneAuthCodeButton={(code: string) => validPhoneAuthCodeWithServer(code)}
                        isStartTimer={isStartTimer}
                    />
                    <div style={{ marginTop: 40 }}>
                        <FullSizeButton text="다음" onClick={(clickNextButton)} isDisabled={isDisabledNextButton} />
                    </div>
                </>
                    : <FullSizeButton text="인증번호 받기" onClick={() => {
                        clickRequestPhoneAuthCodeButton();
                    }} />
                }
            </div>

        </div>
    )
}

export default FindPasswordWithMobile;