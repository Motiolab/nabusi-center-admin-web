import React from "react";

interface IconProps {
    src: string;
    width: number;
    height: number;
    alt: string;
    style?: React.CSSProperties;
    color?: string
    onClick?: Function
}

const Icon: React.FC<IconProps> = ({ src, width, height, alt, style, color, onClick }) => {
    return <img src={src} width={width} height={height} alt={alt} style={{ ...style, color }} onClick={() => onClick?.()} />;
};

export default Icon;