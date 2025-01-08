import './tab.css'

interface IProps {
    text?: string;
    style?: React.CSSProperties;
    selected: boolean;
    onClick?: () => void;
}

const Tab = ({ text, style, selected = false, onClick }: IProps) => {
    const proprsStyle = style ?? {}
    return <>
        <div className={`tab-item ${selected ? " select" : ""}`} style={proprsStyle} onClick={onClick}>{text}</div>
    </>
}
export { Tab };