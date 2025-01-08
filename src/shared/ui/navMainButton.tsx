import './navMainButton.css';
import { Link, useLocation } from "react-router-dom";

interface IProps {
    menu: ILayoutMenu;
    onClick?: Function;
    selectKey?: number;
    value: number;
    navbarState?: boolean;
}

const NavMainButton = ({ menu, selectKey, onClick = () => { }, value }: IProps) => {
    const location = useLocation();
    const pathname = location.pathname;
    const pathMatch = (pathname === menu.href) || (pathname === menu.href + "/");

    return <>
        {menu
            && <Link to={menu.href ?? "#"} className={`nav-main-button ${pathMatch ? " clicked" : ""}`} style={{ ...menu.style }} onClick={() => onClick(value)}>
                {menu.iconSvg && menu.iconSvg}
                <div className="nav-text">{menu.text}</div>
            </Link >}
    </>
}

export { NavMainButton }