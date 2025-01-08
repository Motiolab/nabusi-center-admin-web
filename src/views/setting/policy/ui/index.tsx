

import { BreadCrumb, TabList, CenterInfo, PolicyWellnessClass } from "@/features";
import { tabItemList } from "../model";
import { useState } from "react";
import { NotificationPolicy } from "@/widgets";

interface IProps {
}
const PolicyView = ({ }: IProps) => {
    const [selectTab, setSelectTab] = useState<number>(0);

    return <>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <TabList tabItemList={tabItemList} setSelectIdx={setSelectTab} />
            <BreadCrumb />
        </div>
        <div style={{ minHeight: "calc(100vh - 84px - 48px - 48px )", backgroundColor: "var(--Base-Base-White)" }}>
            {selectTab === 0
                && <CenterInfo />}
            {selectTab === 1
                && <PolicyWellnessClass />}
            {selectTab === 2
                && <NotificationPolicy />}
        </div >
    </>
}

export { PolicyView };