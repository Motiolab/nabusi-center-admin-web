import { useQueryGetWellnessTicketList } from "@/entities/wellnessticket/model";
import { BreadCrumb, TabList } from "@/features"
import { RootState } from "@/store";
import { Button, Input, Table } from "antd";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from './styles.module.css'
import { ReactComponent as Search } from '@/assets/icon/Search.svg';
import { useState } from "react";
import wellnessTicketTableColumn from "./model/wellnessTicketTableColumn";

const WellnessTicket = () => {
    const [selectTab, setSelectTab] = useState<number>(0);
    const selectedCenterId = useSelector((state: RootState) => state.selectedCenterId)
    const [searchText, setSearchText] = useState<string>("");
    const { data: wellnessTicketList } = useQueryGetWellnessTicketList(selectedCenterId);
    const emptyText = <div className="body-content-standard" style={{ display: "flex", gap: "var(--Spacingml)", alignItems: "center", color: "var(--Base-Base-Black)" }}><div>아직 등록된 수강권이 없습니다.</div><Link to="/wellness-ticket/create" ><Button style={{ height: "36px", padding: "var(--Spacingxs) var(--Spacingm) var(--Spacingxs) var(--Spacingm)" }} type="primary">수강권 추가</Button></Link><div>를 선택하여 수강권을 등록해 주세요.</div></div>;

    return <>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <TabList
                tabItemList={[{ text: "수강권" }]}
                setSelectIdx={setSelectTab}
            />
        </div>
        <div style={{ minHeight: "calc(100vh - 84px - 48px - 48px )", backgroundColor: "var(--Base-Base-White)" }}>
            {selectTab === 0
                && <div style={{ padding: '24px 24px 0 24px', backgroundColor: "var(--Base-Base-White)", height: "calc(100% - 64px)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "var(--Spacingbase)" }}>
                            <div className="body-content-accent">
                                수강권 ({wellnessTicketList ? wellnessTicketList.length : 0})
                            </div>
                            <Link to="/wellness-ticket/create" ><Button style={{ height: "36px", padding: "var(--Spacingxs) var(--Spacingm) var(--Spacingxs) var(--Spacingm)" }} type="primary">수강권 추가</Button></Link>
                        </div>
                        <div style={{ display: "flex", alignItems: 'center', gap: "var(--Spacings)" }}>
                            {wellnessTicketList && <><Input
                                classNames={{ input: styles.searchInput }}
                                placeholder="수강권명 입력"
                                value={searchText}
                                prefix={<Search />}
                                style={{ width: "310px", height: "36px", backgroundColor: "var(--Base-Base-White)" }}
                                onChange={(e) => setSearchText(e.target.value)} />
                            </>}
                        </div>
                    </div>
                    <div style={{ paddingBlock: "var(--Spacingml) 60px" }}>
                        <Table
                            className={styles.ticketProductTable}
                            columns={wellnessTicketTableColumn}
                            dataSource={wellnessTicketList?.filter((i) => i?.name?.includes(searchText)).map((e, idx) => ({ ...e, key: idx }))}
                            locale={{ emptyText }}
                            pagination={{
                                position: ["bottomCenter"],
                                className: styles.tablePagenation
                            }}
                        />
                    </div>
                </div>}
            {selectTab === 1
                && <>
                    수강권 진열 관리
                </>}
        </div >

    </>
}

export default WellnessTicket