

import { DropDownResult } from "@/features/dropdownresult";
import { Button, ConfigProvider, DatePicker, Input, Table } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ReactComponent as Check } from '@/assets/icon/Check.svg';
import styles from './styles.module.css'
import { pushAlarmListColumns } from "../model";
import { ReactComponent as Search } from '@/assets/icon/Search.svg';
import { ReactComponent as Schedule } from '@/assets/icon/Schedule.svg';
import { ReactComponent as ArrowDown } from '@/assets/icon/ArrowDown.svg';


const PushAlaramList = () => {
    const mockData = [{ id: 1, sendDate: '2024-08-12T18:22:00', title: '8월 14일 홍길동 강사님 수업 대강 안내 드립니다.', sendMemberNameList: ['윤정준', '권준학', '권준학', '권준학', '권준학', '권준학', '권준학', '권준학', '권준학', '권준학', '권준학', '권준학', '권준학', '권준학', '권준학', '권준학', '권준학', '권준학', '권준학', '권준학', '권준학', '권준학', '권준학', '윤정준', '윤정준', '윤정준', '윤정준', '윤정준', '윤정준', '윤정준', '윤정준', '윤정준', '윤정준', '윤정준', '윤정준', '윤정준', '윤정준', '윤정준', '윤정준', '윤정준', '윤정준', '윤정준', '윤정준', '윤정준', '윤정준', '윤정준', '윤정준', '윤정준', '윤정준'], sender: '홍길동' }, { id: 2, sendDate: '2024-04-12T18:22:00', title: '4월 15일 윤정준 강사님 수업 대강 안내 드립니다.', sendMemberNameList: ['권준학', '권준학', '권준학', '권준학', '권준학', '권준학', '권준학', '권준학', '권준학', '권준학', '권준학'], sender: '윤정준' }]
    const [originalDataSource, setOriginalDataSource] = useState<IPushSendAlaramData[]>([]);
    const [filteredDataSource, setFilteredDataSource] = useState<IPushSendAlaramData[]>([]);
    const [dateRange, setDateRange] = useState<[Dayjs, Dayjs]>([dayjs().add(-30, 'd'), dayjs()]);
    const [searchType, setSearchType] = useState<"title" | "sendMemberName">("title")
    const [searchValue, setSearchValue] = useState<string>('');
    const [textByRange, setTextByRange] = useState('');
    const [isRangePickerCalendarStatus, setIsRangePickerCalendarStatus] = useState<boolean>(false);
    const emptyText = <div className="body-content-standard" style={{ textAlign: "left", color: "var(--Base-Base-Black)" }}>발송한 알림 내역이 없습니다.</div>;
    const rangePresets: { label: string; value: [Dayjs, Dayjs] }[] = [
        { label: '최근 7일', value: [dayjs().add(-7, 'd'), dayjs()] },
        { label: '최근 14일', value: [dayjs().add(-14, 'd'), dayjs()] },
        { label: '최근 30일', value: [dayjs().add(-30, 'd'), dayjs()] },
        { label: '최근 90일', value: [dayjs().add(-90, 'd'), dayjs()] },
    ];
    const sendDateFilter = (sendDate: string) => dayjs(sendDate).isAfter(dateRange[0]) && dayjs(sendDate).isBefore(dateRange[1])
    const searchAndDateFilter = (data: IPushSendAlaramData[], e?: string) => { setFilteredDataSource(data.filter((item) => sendDateFilter(item.sendDate)).filter((item) => !e ? true : searchType === 'sendMemberName' ? item.sendMemberNameList?.some(name => name?.includes(e)) : item[searchType]?.includes(e))) }
    const textByRangePresets = () => {
        var rangeText = '특정 기간';
        rangePresets.forEach((q) => { if (q.value[0].format("YYYY-MM-DD") === dateRange[0].format("YYYY-MM-DD") && (q.value[1].format("YYYY-MM-DD") === dateRange[1].format("YYYY-MM-DD"))) { rangeText = q.label; setTextByRange(rangeText); }; })
    }
    const rangePickerExtraFooter = () => <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "60px" }}><div className="body-content-standard" style={{ color: "var(--Base-Base-Black)" }}>{dateRange[0].format("YYYY.MM.DD")} - {dateRange[1].format("YYYY.MM.DD")} <span style={{ color: "var(--Neutrals-Neutrals500)" }}>({dateRange[1].diff(dateRange[0], 'd')}일)</span></div> <Button style={{ height: "36px", padding: "var(--Spacingxs) var(--Spacingm) var(--Spacingxs) var(--Spacingm)" }} type="primary" onClick={() => setIsRangePickerCalendarStatus(false)}>적용</Button></div>

    useEffect(() => {
        textByRangePresets()
        searchAndDateFilter(originalDataSource, searchValue)
    }, [dateRange, searchValue])

    useEffect(() => {
        setOriginalDataSource(mockData)
        searchAndDateFilter(mockData, searchValue)
    }, [])
    return <>
        <div style={{ padding: '24px 24px 0 24px', backgroundColor: "var(--Base-Base-White)", height: "calc(100% - 64px)" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--Spacingm)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "var(--Spacingbase)" }}>
                    <div className="body-content-accent">
                        보낸 알림 ({filteredDataSource.length})
                    </div>
                    <Link to="/home/customercenter/pushalarm/pushalarmsend/">
                        <Button style={{ height: "36px", padding: "var(--Spacingxs) var(--Spacingm) var(--Spacingxs) var(--Spacingm)" }} type="primary" >알림 보내기</Button>
                    </Link>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ position: "relative" }}>
                        <div style={{ position: "absolute", top: 9, left: 8, zIndex: 0, display: "flex", alignItems: "center", justifyContent: "center" }}><Schedule width={16} height={16} fill={"var(--Neutrals-Neutrals500)"} /><span style={{ paddingInline: "8px", borderRight: "1px solid var(--Neutrals-Neutrals200)" }}>{textByRange}</span></div>
                        <DatePicker.RangePicker onClick={() => !isRangePickerCalendarStatus && setIsRangePickerCalendarStatus(true)} open={isRangePickerCalendarStatus} renderExtraFooter={rangePickerExtraFooter} presets={rangePresets.map(q => q.label === textByRange ? { label: <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>{q.label}<Check width={16} height={16} /> </div>, value: q.value } : { label: q.label, value: q.value })} separator={<div style={{ padding: 0 }}>-</div>} format={"YYYY.MM.DD"} value={dateRange} suffixIcon={<ArrowDown width={16} height={16} fill={"var(--Neutrals-Neutrals500)"} />} className={styles.customDatePicker} style={{ width: "333px", height: "36px", backgroundColor: "transparent", paddingLeft: "90px" }} onCalendarChange={e => (e?.[0] && e?.[1]) && setDateRange([e[0], e[1]])} allowClear={false} />
                    </div>
                    <div style={{ display: "flex", alignItems: 'center', gap: "var(--Spacings)" }}>
                        <DropDownResult styles={{ result: { width: "82px", height: "14px" } }} onChange={(e: any) => setSearchType(e)} dropDownItemList={[{ value: "title", text: "제목" }, { value: "sendMemberName", text: "회원명" }]} initalObject={{ value: "title", text: "제목" }} />
                        <Input classNames={{ input: styles.searchInput }} placeholder="제목 검색" prefix={<Search />} value={searchValue} style={{ width: "310px", height: "32px", backgroundColor: "var(--Base-Base-White)" }} onChange={(e) => setSearchValue(e.target.value)} />
                    </div>
                </div>
            </div >
            <div style={{ paddingBlock: "var(--Spacingml) 60px" }}>
                <ConfigProvider
                    theme={{
                        components: {
                            Table: {
                                cellPaddingInline: 14,
                                cellPaddingBlock: 16,
                            },
                        },
                    }}>
                    <Table className={styles.pushAlaramTable} columns={pushAlarmListColumns} dataSource={filteredDataSource?.map((e, idx) => ({ ...e, key: idx }))} locale={{ emptyText }} pagination={{ position: ["bottomCenter"], className: styles.tablePagenation }} />
                </ConfigProvider>
            </div>
        </div >
    </>
}

export { PushAlaramList };