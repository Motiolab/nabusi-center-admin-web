

import { TabList } from "@/features";
import { useState } from "react";
import { tabItemList } from "./model";
import ManageRoleWidget from "@/widgets/managerolewidget";
import AdminMemberListWidget from "@/widgets/adminmemberlistwidget";


const AuthManagement = () => {
    const [selectTab, setSelectTab] = useState<number>(0);

    return <>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <TabList tabItemList={tabItemList} setSelectIdx={setSelectTab} />
        </div>
        <div style={{ minHeight: "calc(100vh - 84px - 48px - 48px )", backgroundColor: "var(--Base-Base-White)" }}>
            {selectTab === 0
                && <>
                    <AdminMemberListWidget />
                </>}
            {selectTab === 1
                && <>
                    <ManageRoleWidget />
                </>}
        </div >
    </>
}
export default AuthManagement