import TableWellnessLectureList from "@/entities/wellnesslecture/ui/TableWellnessLectureList";
import { TabList } from "@/features";

import { DatePicker, Divider, Flex } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";

const WellnessClass = () => {
    const [selectTab, setSelectTab] = useState<number>(0);
    const [startDateTime, setStartDateTime] = useState<Dayjs>(dayjs());

    return <>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <TabList
                tabItemList={[{ text: "수업" }, { text: "그룹 수업" }]}
                setSelectIdx={setSelectTab}
            />
        </div>
        <div style={{ minHeight: "calc(100vh - 84px - 48px - 48px )", backgroundColor: "var(--Base-Base-White)" }}>
            {selectTab === 0
                && <div style={{ padding: 24 }}>
                    <Flex align="center" style={{ marginTop: 16 }}>
                        <div style={{ width: 124 }}>수업일</div>
                        <DatePicker placeholder="수업일" value={startDateTime} onChange={(e) => setStartDateTime(e.startOf('date'))} size="large" />
                    </Flex>
                    <Divider />
                    <div style={{ marginTop: 16 }}>
                        <TableWellnessLectureList startDate={startDateTime.format('YYYY-MM-DDTHH:mm:ssZ')} />
                    </div>
                </div>}
            {selectTab === 1
                && <>
                    그룹수업
                </>}
        </div >
    </>
}

export default WellnessClass