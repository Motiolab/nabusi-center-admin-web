
import { Input } from "antd";
import { useEffect, useState } from "react";

interface IProps {
    centerName: string;
    setCenterName: Function;
}

const CenterNameInput = ({ centerName, setCenterName }: IProps) => {
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [debouncedText, setDebouncedText] = useState('');

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedText(centerName);
        }, 400); // 0.4초 후에 debouncedText 업데이트

        return () => {
            clearTimeout(handler);
        };
    }, [centerName]);

    useEffect(() => {
        if (debouncedText) {
            validateInput(debouncedText);
        }
    }, [debouncedText]);

    const validateInput = (text: string) => {
        const consonantsAndVowelsRegex = /[ㄱ-ㅎㅏ-ㅣ]/;
        const numbersRegex = /[0-9]/;

        if (consonantsAndVowelsRegex.test(text)) {
            //입력에 자음 또는 모음이 포함되어 있습니다.
            setErrorMessage('정확한 센터명을 입력해 주세요');
        } else if (numbersRegex.test(text)) {
            //입력에 숫자가 포함되어 있습니다.
            setErrorMessage('정확한 센터명을 입력해 주세요');
        } else {
            setErrorMessage('');
        }
    };

    return (
        <div>
            <div style={{ color: 'var(--Base-Base-Black}', fontSize: 14 }}>센터명</div>
            <Input
                size="large"
                placeholder="센터명을 입력해 주세요"
                value={centerName}
                onChange={(e) => setCenterName(e.target.value)}
                style={{ marginTop: 8 }}
                status={errorMessage === '' ? undefined : 'error'}
            />
            {errorMessage && <div style={{ marginTop: 8, color: 'var(--Error-Error)', fontSize: 14 }}>{errorMessage}</div>}
        </div >
    )
}
export default CenterNameInput