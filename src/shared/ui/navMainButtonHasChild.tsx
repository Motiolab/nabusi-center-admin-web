
import { NavMainButton } from "./navMainButton";
import { useState } from "react";
import './navMainButtonHasChild.css';
import { useLocation } from "react-router-dom";
import { Divider } from "@/shared/index";

interface IProps {
    menu: ILayoutMenu;
    onClick?: Function;
    value: number;
    navbarState?: boolean;
}

const NavMainButtonHasChild = ({ menu, onClick, value, navbarState }: IProps) => {
    const [childerenSelectButton, setChilderenSelectButton] = useState<number | undefined>(undefined);
    const location = useLocation();
    const pathname = location.pathname;
    const menuHref = menu.children && menu.children.map((e) => e.href)
    const path = menuHref?.includes(pathname.slice(0, -1)) || menuHref?.includes(pathname);
    return <>
        {menu &&
            <>
                {value !== 0 && <Divider />}
                <div className={`nav-main-button-has-child ${path ? " clicked" : ""} ${navbarState ? 'collapsed' : ''}`} style={{ ...menu.style }} onClick={q => onClick?.(q)}>
                    {menu.iconSvg && menu.iconSvg}
                    <div className={`body-caption-accent nav-has-child-text`}>
                        {menu.text}
                    </div>
                </div>
                {(menu.children && menu.children.length > 0)
                    && <div className={`nav-child-container`}>
                        {menu.children.map((chlid, idx) => <NavMainButton key={idx} menu={chlid} selectKey={childerenSelectButton} onClick={setChilderenSelectButton} value={idx} />)}
                    </div>
                }
            </>
        }
    </>
}

export { NavMainButtonHasChild }