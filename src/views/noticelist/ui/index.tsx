

import { BreadCrumb, DropDownResult } from "@/features";
import { Button, Input, Table } from "antd";
import { ReactComponent as Search } from '@/assets/icon/Search.svg';
import styles from './styles.module.css'
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { noticeColumns, sortedNotices } from "../model";
import { getNoticeList } from "@/entities/notice/api";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const NoticeList = () => {
    const [originalDataSource, setOriginalDataSource] = useState<INotice[]>([]);
    const [filteredBranch, setFilteredBranch] = useState<INotice[]>([]);
    const [searchType, setSearchType] = useState<"title" | "creatorName">("title")
    const emptyText = <div className="body-content-standard" style={{ display: "flex", gap: "var(--Spacingml)", alignItems: "center", color: "var(--Base-Base-Black)" }}><div >아직 등록된 게시글이 없습니다.</div><Link to="/home/customercenter/noticeregister" ><Button style={{ height: "36px", padding: "var(--Spacingxs) var(--Spacingm) var(--Spacingxs) var(--Spacingm)" }} type="primary">글쓰기</Button></Link><div>를 선택하여 게시글을 등록해 주세요.</div></div>;
    const selectedCenterId = useSelector((state: RootState) => state.selectedCenterId)

    useEffect(() => {
        if (!selectedCenterId) return;
        getNoticeList(selectedCenterId)
            .then(res => { setOriginalDataSource(res.data); setFilteredBranch(res.data) })
            .catch(err => console.log(err))
    }, [])

    return <>
        <div style={{ height: "100%" }}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "var(--Spacingxs)", height: "24px", paddingBottom: "21px" }}>
                    <BreadCrumb />
                </div>
            </div>
            <div style={{ padding: '24px 24px 0 24px', backgroundColor: "var(--Base-Base-White)", height: "calc(100% - 64px)" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "var(--Spacingbase)" }}>
                        <div className="body-content-accent">
                            게시글 ({filteredBranch?.length ?? 0})
                        </div>
                        <Link to="/home/customercenter/noticeregister" ><Button style={{ height: "36px", padding: "var(--Spacingxs) var(--Spacingm) var(--Spacingxs) var(--Spacingm)" }} type="primary">글쓰기</Button></Link>
                    </div>
                    <div style={{ display: "flex", alignItems: 'center', gap: "var(--Spacings)" }}>
                        <DropDownResult styles={{ result: { width: "82px", height: "14px" } }} onChange={(e: any) => setSearchType(e)} dropDownItemList={[{ value: "title", text: "제목" }, { value: "creatorName", text: "작성자" }]} initalObject={{ value: "title", text: "제목" }} />
                        <Input classNames={{ input: styles.searchInput }} placeholder="제목 검색" prefix={<Search />} style={{ width: "310px", height: "32px", backgroundColor: "var(--Base-Base-White)" }} onChange={(e) => setFilteredBranch(originalDataSource?.filter((i) => i[searchType]?.includes(e?.target?.value)))} />
                    </div>
                </div>
                <div style={{ paddingBlock: "var(--Spacingml) 60px" }}>
                    <Table className={styles.ticketProductTable} columns={noticeColumns} dataSource={sortedNotices(filteredBranch?.map((e, idx) => ({ ...e, key: idx })))} locale={{ emptyText }} pagination={{ position: ["bottomCenter"], className: styles.tablePagenation }} />
                </div>
            </div>

        </div>
    </>
}

export { NoticeList };