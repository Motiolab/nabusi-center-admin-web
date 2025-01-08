
import { NavMainButton, NavMainButtonHasChild } from "@/shared";
import { useState } from "react";

interface IProps {
    menuItemList: ILayoutMenu[];
    navbarState?: boolean;
}

const NavLeftList = ({ menuItemList, navbarState }: IProps) => {
    const [selectButton, setSelectButton] = useState<number | undefined>(undefined);
    const onClick = (value: number) => { setSelectButton(value); }

    return <>
        {(menuItemList.length > 0) && menuItemList.map((menu, idx) =>
            menu.isHaveChild
                ? <NavMainButtonHasChild key={idx} menu={menu} navbarState={navbarState} onClick={onClick} value={idx} />
                : <NavMainButton key={idx} menu={menu} selectKey={selectButton} navbarState={navbarState} onClick={onClick} value={idx} />
        )}
    </>

}

export { NavLeftList }