import { Button } from 'antd';

interface IProps {
  text?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  isDisabled?: boolean;
}

const FullSizeButton = ({ text, style, onClick, isDisabled }: IProps) => {
  const baseStyle: React.CSSProperties = {
    width: '100%',
    height: 56,
    borderRadius: "var(--Spacingxs)",
  };

  const buttonStyle: React.CSSProperties = {
    ...baseStyle,
    ...style,
    ...(isDisabled ? { backgroundColor: 'var(--Primary-Primary100)', color: 'var(--Base-Base-White)', borderColor: "var(--Primary-Primary100)" } : {}),
  };

  return <>
    <Button
      type="primary"
      size='large'
      style={buttonStyle}
      onClick={() => (isDisabled !== true && onClick) && onClick()}
      disabled={isDisabled}
    >
      {text}
    </Button>
  </>
}
export { FullSizeButton };