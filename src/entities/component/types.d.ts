interface IBasicProps {
    text?: string;
    value?: string | number;
    onClick?: () => void;
    style?: React.CSSProperties;
    className?: string;
}
interface ILayoutMenu extends IBasicProps {
    iconSvg?: JSX.Element;
    isHaveChild?: boolean;
    style?: React.CSSProperties;
    url?: string;
    children?: ILayoutMenu[];
    href?: string;
}
interface IDropDown extends IBasicProps {
    href?: string;
    value: string | number;
    iconSvg?: string;
    iconWidth?: number;
    iconHeight?: number;
}
interface ITab extends IBasicProps { }