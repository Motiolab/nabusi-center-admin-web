
import { Input } from "antd";
import { useEffect, useState } from "react";
import { validateName } from "../utils/validate/validateName";

interface IProps {
    nameText: string;
    setNameText: Function;
}

const NameInput = ({ nameText, setNameText }: IProps) => {
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [debouncedText, setDebouncedText] = useState('');

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedText(nameText);
        }, 400); // 0.4초 후에 debouncedText 업데이트

        return () => {
            clearTimeout(handler);
        };
    }, [nameText]);

    useEffect(() => {
        if (debouncedText) {
            const isValidName = validateName(debouncedText);
            setErrorMessage(isValidName ? '' : '정확한 성함을 입력해 주세요');
        }
    }, [debouncedText]);

    return (
        <div>
            <div style={{ color: 'var(--Base-Base-Black}', fontSize: 14 }}>성함</div>
            <Input
                size="large"
                placeholder="성함을 입력해 주세요"
                value={nameText}
                onChange={(e) => setNameText(e.target.value)}
                style={{ marginTop: 8 }}
                status={errorMessage === '' ? undefined : 'error'}
            />
            {errorMessage && <div style={{ marginTop: 8, color: 'var(--Error-Error)', fontSize: 14 }}>{errorMessage}</div>}
        </div >
    )
}
export default NameInput