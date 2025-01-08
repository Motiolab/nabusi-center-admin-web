import { CSSProperties } from "react";

interface IProps {
    width?: string | number;
    minHeight?: string | number;
    style?: CSSProperties;
    backgroundColor?: CSSProperties['backgroundColor']
    onClick?: Function
}


const Divider = ({ width, minHeight = '1px', style, backgroundColor = 'var(--Neutrals-Neutrals200)', onClick }: IProps) => {
    return <div style={{ width, minHeight, backgroundColor, ...style }} onClick={(q) => onClick?.(q)} />
};

export { Divider };