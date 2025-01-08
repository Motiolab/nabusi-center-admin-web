

import { BreadCrumb, TabList } from "@/features";
import { branchTabItemList } from "../model";
import { useState } from "react";
import { LinkCenterList } from "@/widgets/linkcenter/ui";
import { RequestReceived } from "@/widgets";

const LinkCenterView = () => {
    const [selectTab, setSelectTab] = useState<number>(0);

    return <>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <TabList tabItemList={branchTabItemList} setSelectIdx={setSelectTab} />
            <BreadCrumb />
        </div>
        <div style={{ minHeight: "calc(100vh - 84px - 48px - 48px )", backgroundColor: "var(--Base-Base-White)" }}>
            {selectTab === 0 && <LinkCenterList />}
            {selectTab === 1 && <RequestReceived />}
        </div>
    </>
}

export { LinkCenterView };