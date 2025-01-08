import { BreadCrumb, TableFilter } from "@/features";
import { Button, Input, Table } from "antd";
import { ReactComponent as Search } from '@/assets/icon/Search.svg';
import { ReactComponent as Filter } from '@/assets/icon/Filter.svg';
import { useEffect, useState } from "react";
import styles from './styles.module.css'
import { categoryKrToEn, ticketProductColumns } from "../model";
import { Link } from "react-router-dom";
import { getTicketProductListByCenterId } from "@/entities";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const TicketProductListView = () => {
    const [originalDataSource, setOriginalDataSource] = useState<IGetTicketProduct[]>([]);
    const [filteredBranch, setFilteredBranch] = useState<IGetTicketProduct[]>([]);
    const [displayState, setDisplayState] = useState<boolean>(false);
    const [optionList, setOptionList] = useState<ITableFilterItem[]>([]);
    const [selectList, setSelectList] = useState<ITableFilterItem[]>([]);
    const selectedCenterId = useSelector((state: RootState) => state.selectedCenterId)
    const emptyText = <div className="body-content-standard" style={{ display: "flex", gap: "var(--Spacingml)", alignItems: "center", color: "var(--Base-Base-Black)" }}><div>아직 등록된 수강권이 없습니다.</div><Link to="/wellness-ticket/create" ><Button style={{ height: "36px", padding: "var(--Spacingxs) var(--Spacingm) var(--Spacingxs) var(--Spacingm)" }} type="primary">수강권 추가</Button></Link><div>를 선택하여 수강권을 등록해 주세요.</div></div>;

    useEffect(() => {
        setFilteredBranch(originalDataSource)
    }, [])

    useEffect(() => {
        getTicketProductListByCenterId(selectedCenterId)
            .then((res) => {
                if (!res.data.body || res.data.body.length < 1) {
                    return;
                }
                setOriginalDataSource(res.data.body)
                setFilteredBranch(res.data.body)
            })
            .catch((err) => {
                console.error(err)
            })
        setOptionList([{ category: "수업 종류", valueList: ["그룹", "프라이빗", "TTC", "종류 4", "종류 5", "종류 6", "종류 7"] }, { category: "유형", valueList: ["PERIOD", "COUNT"] }, { category: "상태", valueList: ["판매중", "판매정지"] }].map((q => ({ ...q, category: categoryKrToEn(q.category) }))))
    }, [])
    const filteredBranchOnSumit = () => {
        setDisplayState(false);
        setFilteredBranch(originalDataSource.filter(product => selectList.every(filterItem => (filterItem.category === "classType") ? filterItem.valueList.map((q) => product["classTypeIdList"]?.includes(q)).some(w => w) : filterItem.valueList.includes(product[filterItem.category as keyof IGetTicketProduct]?.toString() ?? ""))));
    }
    return <>
        <div style={{ height: "100%" }}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "var(--Spacingxs)", height: "24px", paddingBottom: "21px" }}>
                    <div style={{ color: "var(--Neutrals-Neutrals500)", fontSize: "14px" }}>
                        수강권
                    </div>
                    <div style={{ color: "var(--Neutrals-Neutrals500)", fontSize: "14px" }}>
                        /
                    </div>
                    <BreadCrumb />
                </div>
            </div>
            <div style={{ padding: '24px 24px 0 24px', backgroundColor: "var(--Base-Base-White)", height: "calc(100% - 64px)" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "var(--Spacingbase)" }}>
                        <div className="body-content-accent">
                            수강권 ({filteredBranch.length})
                        </div>
                        <Link to="/wellness-ticket/create" ><Button style={{ height: "36px", padding: "var(--Spacingxs) var(--Spacingm) var(--Spacingxs) var(--Spacingm)" }} type="primary">수강권 추가</Button></Link>
                    </div>
                    <div style={{ display: "flex", alignItems: 'center', gap: "var(--Spacings)" }}>
                        <Input classNames={{ input: styles.searchInput }} placeholder="수강권명 입력" prefix={<Search />} style={{ width: "310px", height: "36px", backgroundColor: "var(--Base-Base-White)" }} onChange={(e) => setFilteredBranch(originalDataSource?.filter((i) => i?.name?.includes(e?.target?.value)))} />
                        <Button style={{ height: "36px", padding: "var(--Spacingxs) var(--Spacingm) var(--Spacingxs) var(--Spacingm)", display: "flex", alignItems: "center", gap: "var(--Spacings)" }} onClick={() => setDisplayState((e) => !e)}>필터<Filter /></Button>
                    </div>
                </div>
                <TableFilter displayState={displayState} optionList={optionList} setSelectList={setSelectList} onCancelClick={() => setDisplayState(false)} onSubmitClick={() => filteredBranchOnSumit()} />
                <div style={{ paddingBlock: "var(--Spacingml) 60px" }}>
                    <Table className={styles.ticketProductTable} columns={ticketProductColumns} dataSource={filteredBranch?.map((e, idx) => ({ ...e, key: idx }))} locale={{ emptyText }} pagination={{ position: ["bottomCenter"], className: styles.tablePagenation }} />
                </div>
            </div>
        </div>
    </>
}


export { TicketProductListView };