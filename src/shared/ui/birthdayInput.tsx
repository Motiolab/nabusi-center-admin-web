

import { Input } from "antd"
import { useState } from "react"
import { validateBirthDay } from "@/shared/utils/validate/validateBirthday"

interface IProps {
    birthDay: string
    setBirthDay: Function
}

const BirthDayInput = ({ birthDay, setBirthDay }: IProps) => {
    const [errorMessage, setErrorMessage] = useState<string>('')

    const changeBirthDay = (birthDay: string) => {
        setBirthDay(birthDay)
        if (birthDay.length === 8) {
            const year = birthDay.substring(0, 4);
            const month = birthDay.substring(4, 6);
            const day = birthDay.substring(6, 8);
            const formatBirthDay = `${year}.${month}.${day}`;
            setBirthDay(formatBirthDay);

            const isValidBirtday = validateBirthDay(formatBirthDay);
            if (!isValidBirtday) {
                setErrorMessage('정확한 생년월일을 입력해 주세요.')
            } else {
                setErrorMessage('')
            }
        } else {
            setBirthDay(birthDay.replace(/\./g, ''))
            setErrorMessage('생년월일을 입력해주세요.')
        }
    }

    return (
        <div>
            <div style={{ color: 'var(--Base-Base-Black}', fontSize: 14 }}>생년 월일</div>
            <Input
                placeholder="년도(4자리)"
                size="large"
                style={{ width: 344, marginTop: 8 }}
                value={birthDay}
                onChange={(e) => changeBirthDay(e.target.value)}
            />
            {errorMessage && <div style={{ marginTop: 8, color: 'var(--Error-Error)', fontSize: 14 }}>{errorMessage}</div>}
        </div>
    )
}

export default BirthDayInput