import { Input } from "antd"
interface IProps {
    classNames?: {
        input?: string;
        count?: string;
    };
    styles?: {
        input?: React.CSSProperties;
        count?: React.CSSProperties;
    };
    placeholder?: string;
    prefix?: React.ReactNode;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInpit = ({ classNames, styles, placeholder = "검색", prefix, onChange }: IProps) => {
    return <>
        <Input classNames={{ ...classNames }} styles={{ ...styles }} placeholder={placeholder} prefix={prefix} style={{ width: "310px", height: "32px", backgroundColor: "var(--Base-Base-White)" }} onChange={onChange} />
    </>
}