

import CountrySelector from "@/shared/ui/countrySelector";
import { FullSizeButton } from "@/shared/ui/fullSizeButton";
import { Button, Flex, Input, Modal } from "antd";
import { useState } from "react";
import PhoneAuthVerify from "../phoneauthverify";
import { requestMobileAuthCode } from "@/entities/phoneAuth/phoneauth";
import { useDispatch, useSelector } from "react-redux";
import * as CreateUserAction from '@/entities/createUser/model/reducer'
import { RootState } from "@/store";
import { isExistUserByMobile } from "@/entities/member";
import { formatPhoneNumber } from "@/shared/utils/format/formatPhoneNumber";
import { maskUserId } from "@/shared/utils/format/maskUserId";
import { useNavigate } from "react-router-dom";

const PhoneAuthRequest = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const createUserStore = useSelector((state: RootState) => state.createUser)

    const [isSentMobileAuthCode, setIsSentMobileAuthCode] = useState<boolean>(false);
    const [isExistUserError, setIsExistUserError] = useState<string>('');

    const clickRequestMobileAuthCodeButton = async () => {
        try {
            const resIsExistUserByMobile = await isExistUserByMobile(createUserStore.mobile);
            console.log('resIsExistUserByMobile', resIsExistUserByMobile)

            if (resIsExistUserByMobile.data.body.userId) {
                return setIsExistUserError(resIsExistUserByMobile.data.body.userId)
            }

            const res = await requestMobileAuthCode({ mobile: createUserStore.mobile, countryCode: createUserStore.countryCode });
            if (res.data.body) {
                setIsSentMobileAuthCode(true);
            }
            console.log('res', res)
        } catch (e) {
            console.error('error', e)
        }
    }

    return <>
        <div style={{ color: 'var(--Base-Base-Black)' }}>휴대폰번호</div>
        <Flex justify="space-between" style={{ marginTop: 8 }}>
            <div style={{ width: 92 }}>
                <CountrySelector
                    selectedValue={createUserStore.countryCode}
                    onChangeSelector={(countryCode: string) => dispatch(CreateUserAction.setCreateUser({
                        ...createUserStore, countryCode
                    }))} />
            </div>
            <div style={{ width: 244 }}>
                <Input
                    placeholder="'-'없이 숫자만 입력해 주세요"
                    size="large"
                    value={createUserStore.mobile}
                    onChange={(e) => dispatch(CreateUserAction.setCreateUser({
                        ...createUserStore, mobile: e.target.value
                    }))} />
            </div>
        </Flex>

        {isSentMobileAuthCode && <div style={{ marginTop: 24 }}>
            <PhoneAuthVerify isRunning={isSentMobileAuthCode} setIsRunning={setIsSentMobileAuthCode} />
        </div>}
        {!isSentMobileAuthCode && <div style={{ marginTop: 40 }}>
            <FullSizeButton text="인증번호 받기" onClick={clickRequestMobileAuthCodeButton} />
        </div>}

        <Modal
            title="가입한 정보가 있습니다"
            open={isExistUserError !== ''}
            onCancel={() => setIsExistUserError('')}
            centered
            footer={
                <>
                    <Button onClick={() => navigate('/findaccount')}>
                        아이디 찾기
                    </Button>
                    <Button type="primary" size="large" onClick={() => { setIsExistUserError('') }}>
                        계속하기
                    </Button>
                </>
            }>
            <div style={{ color: 'var(--Neutrals-Neutrals700)' }}>
                <p>{formatPhoneNumber(createUserStore.mobile)}로 가입한 정보가 있습니다.</p>
                <p>가입한 아이디: {maskUserId(isExistUserError)}</p>
            </div>
        </Modal>
    </>
}

export { PhoneAuthRequest };