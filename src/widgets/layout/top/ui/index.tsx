
import './index.css'
import { Link } from "react-router-dom";
import { useState } from "react";
import { DropDownResult } from "@/features";
import { dropDownItemLis } from "../model";
import { ReactComponent as ArrowDown } from '@/assets/icon/ArrowDown.svg';
import { ReactComponent as Attend } from '@/assets/icon/Attend.svg';
import { ReactComponent as Bell } from '@/assets/icon/Bell.svg';
import { ReactComponent as BellOff } from '@/assets/icon/BellOff.svg';

const LayoutTop = ({ children }: { children: React.ReactNode }) => {
    const [newNoti, setNewNoti] = useState<boolean>(false);
    return <>
        <div className="home-layout-top-and-children" >
            <div className="home-layout-top-container" >
                <div className="home-layout-top-text-container" >
                    <div className="home-layout-top-text-main" >
                        nabusi
                    </div>
                    <div className="home-layout-top-text-sub" >
                        Admin
                    </div>
                </div>
                <div className="home-layout-top-info-container" >
                    <Link to={"#"} className="home-layout-top-info-check-in" >
                        <div>
                            출석체크
                        </div>
                        <Attend width={16} height={16} fill={"var(--Base-Base-Black"} />
                    </Link>
                    <Link to="#">
                        {newNoti ?
                            <Bell style={{ cursor: "pointer" }} width={32} height={32} />
                            : <BellOff style={{ cursor: "pointer" }} width={32} height={32} />
                        }
                    </Link>
                    <div className="home-layout-top-info-user-container"  >
                        <div className="home-layout-top-info-user-profile">
                            CN
                        </div>
                        <div className="home-layout-top-info-user-my" >
                            <DropDownResult dropDownItemList={dropDownItemLis} iconSvg={<ArrowDown width={16} height={16} fill={"var(--Base-Base-Black)"} />} styles={{ result: { border: "0px", gap: "var(--Spacings)", color: "var(--Base-Base-Black)" } }} initalObject={{ value: "홍길동", text: "홍길동 님" }} isImmutable />
                        </div>
                    </div>
                </div>
            </div>
            <div className="home-layout-top-children">
                {children}
            </div>
        </div>
    </>
}
export { LayoutTop }