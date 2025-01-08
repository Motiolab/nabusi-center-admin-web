

import { BreadCrumb, PushAlaramList, PushAlaramReservationList, TabList } from "@/features";
import { useState } from "react";
import { pushAlaramTabItemList } from "../model";

const PushAlaram = () => {
    const [selectTab, setSelectTab] = useState<number>(0);

    return <>
        <div style={{ display: "flex", alignItems: 'flex-start', justifyContent: "space-between" }}>
            <TabList tabItemList={pushAlaramTabItemList} setSelectIdx={setSelectTab} />
            <BreadCrumb />
        </div>
        <div style={{ minHeight: "calc(100vh - 84px - 48px - 48px )", backgroundColor: "var(--Base-Base-White)" }}>
            {selectTab === 0 && <PushAlaramList />}
            {selectTab === 1 && <PushAlaramReservationList />}
        </div>
    </>
}

export { PushAlaram };