

import { checkUserIdAvailable } from "@/entities/account";
import { validUserId, validateUserIdInfo } from "@/shared/utils/validate/validUserId";
import { Button, Flex, Input } from "antd";
import { useState } from "react";
import { CheckOutlined } from '@ant-design/icons';

interface IProps {
    userId: string;
    setUserId: Function;
    setIsAvaliableUserId: Function;
}

const InputIdDoubleCheck = ({ userId, setUserId, setIsAvaliableUserId }: IProps) => {
    const [status, setStatus] = useState<"" | "warning" | "error" | undefined>(undefined);
    const [isValidUserId, setIsValidUserId] = useState<boolean | undefined>(undefined);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const DoubleCheckId = () => {
        const isValidUserId = validUserId(userId);
        if (!isValidUserId) {
            setStatus('error');
            setErrorMessage(validateUserIdInfo(userId))
        }
        setIsValidUserId(isValidUserId)
        if (isValidUserId) {
            requestDoubleCheckUserId()
        }
    }

    const changeUserIdInput = (e: any) => {
        setUserId(e.target.value)
        setIsValidUserId(undefined)
        setStatus(undefined)
        setIsAvaliableUserId(false)
    }

    const requestDoubleCheckUserId = async () => {
        try {
            const res = await checkUserIdAvailable(userId)

            if (res.data) {
                setIsValidUserId(true)
                setIsAvaliableUserId(true)
            } else {
                setIsValidUserId(false)
                setIsAvaliableUserId(false)
                setStatus('error');
                setErrorMessage('이미 사용중인 아이디 입니다.')
            }
        } catch (e) {
            console.error('error', e);
            setIsValidUserId(false);
            setStatus('error');
            setErrorMessage('서버 에러');
        }
    }

    return (<>
        <div style={{ color: 'var(--Base-Base-Black)', fontSize: '14px' }}>아이디</div>
        <Flex justify="space-between" style={{ marginTop: 8 }}>
            <div style={{ width: 256 }}>
                <Input
                    size="large"
                    placeholder="아이디를 입력해주세요."
                    value={userId}
                    onChange={changeUserIdInput}
                    status={status}
                />
            </div>
            <div style={{}}>
                <Button type="primary"
                    ghost
                    style={{ borderRadius: "var(--Spacingxs)", fontSize: 14, height: 40, padding: 'var(--Spacings) var(--Spacingm) var(--Spacings) var(--Spacingm)' }}
                    onClick={DoubleCheckId}>
                    중복 확인
                </Button>
            </div>
        </Flex>
        {isValidUserId === undefined ? <></> :
            !isValidUserId ? <div style={{ color: "var(--Error-Error)", fontSize: '14px', marginTop: 8 }}>{errorMessage}</div>
                : <div style={{ color: "var(--Success-Success)", fontSize: '14px', marginTop: 8 }}><CheckOutlined /> 사용 가능한 아이디입니다.</div>}
    </>
    )
}

export default InputIdDoubleCheck;