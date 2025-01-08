import { Input } from "antd";

interface IProps {
    mobile: string;
    setMobile: Function;
}

const MobileInput = ({ mobile, setMobile }: IProps) => {
    return (
        <div>
            <div style={{ color: 'var(--Base-Base-Black}', fontSize: 14 }}>휴대폰 번호</div>
            <Input
                placeholder="'-'없이 숫자만 입력해 주세요"
                size="large"
                value={mobile}
                style={{ marginTop: 8 }}
                onChange={(e: any) => setMobile(e.target.value)} />
        </div>
    )
}

export default MobileInput;