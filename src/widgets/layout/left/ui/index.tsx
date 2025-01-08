import { useState } from "react";
import styles from './style.module.css'
import { navMenuItemLis } from "../model";
import { NavLeftList } from "@/features";
import { ReactComponent as ArrorLeft } from "@/assets/icon/ArrorLeft.svg";

const LayoutLeft = () => {
    const [navbarState, setNavberState] = useState<boolean>(false);

    return <>
        <div className={`${navbarState ? styles.layoutLeftActive : ''} ${styles.layoutLeft} `} >
            <div className={styles.layoutCollapsedButton} onClick={() => { setNavberState(curr => !curr) }}>
                <ArrorLeft width={24} height={24} style={{ minWidth: 24 }} />
            </div>
            <NavLeftList navbarState={navbarState} menuItemList={navMenuItemLis} />
        </div >
    </>
}
export { LayoutLeft }