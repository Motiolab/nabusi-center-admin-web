

import { Button, Input, Table } from "antd";
import styles from './style.module.css';
import { linkCenterSetColumns } from '../model';
import { useEffect, useState } from "react";
import { DeleteLinkCenter, LinkCenterInfo, RequestLinkCeter } from "@/features";
import { ReactComponent as Warning } from "@/assets/icon/Warning.svg"
import { ReactComponent as Info } from "@/assets/icon/Info.svg"
import { ReactComponent as Search } from "@/assets/icon/Search.svg"
import { getCenterDataLinkListForRequestTableById } from "../api";
import { linkCenterEnumToKr } from "@/entities";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface ITableDataSource extends ILinkCenter {
    key: number;
}

const LinkCenterList = () => {
    const [moreBtnClickStatusList, setMoreBtnClickStatusList] = useState<boolean[]>([]);
    const [selectCenter, setSelectCenter] = useState();
    const [linkCenterModalStatus, setLinkCenterModalStatus] = useState<boolean>(false);
    const [centerCode, setCenterCode] = useState<string[]>(['', '', '', '']);
    const [loading, setLoading] = useState<boolean>(false);
    const [branchDeleteModalStatus, setBranchDeleteModalStatus] = useState<boolean>(false);
    const [originalDataSource, setOriginalDataSource] = useState<ITableDataSource[]>();
    const [filteredBranch, setFilteredBranch] = useState<ITableDataSource[]>();
    const [rerender, setRerender] = useState<boolean>(false);
    const selectedCenterId = useSelector((state: RootState) => state.selectedCenterId)
    const columns = linkCenterSetColumns({ styles, setBranchDeleteModalStatus, setMoreBtnClickStatusList, moreBtnClickStatusList, setSelectCenter, setRerender, selectedCenterId })
    const emptyText = <div style={{ display: "flex", flexDirection: "column", gap: "var(--Spacingml)", alignItems: "center", justifyContent: "center" }}><Warning width={32} height={32} fill={"var(--Neutrals-Neutrals300)"} /><div className="desktop-body-feature-standard">아직 연동된 지점이 없습니다</div><Button style={{ width: "112px", height: '40px', padding: "var(--Spacingxs) var(--Spacingm) var(--Spacingxs) var(--Spacingm)" }} type="primary" onClick={() => setLinkCenterModalStatus(true)}>지점 연동 하기</Button></div>;


    useEffect(() => {
        requestCenterDataLinkList()
    }, [])

    const requestCenterDataLinkList = () => {
        getCenterDataLinkListForRequestTableById(selectedCenterId)
            .then((res) => {
                setOriginalDataSource(res.data.map((e, idx) => ({ ...e, key: idx, status: linkCenterEnumToKr(e.status) })))
                setFilteredBranch(res.data.map((e, idx) => ({ ...e, key: idx, status: linkCenterEnumToKr(e.status) })))
            })
            .catch((err) => {
                console.error(err);
                if (err.response?.data?.result?.code === "SMT-0008") {
                    setOriginalDataSource([])
                    setFilteredBranch([])
                }
            })
    }
    useEffect(() => {
        if (branchDeleteModalStatus || linkCenterModalStatus || (centerCode.join("").length !== 4 && centerCode.join("").length !== 0)) return;
        requestCenterDataLinkList()
    }, [branchDeleteModalStatus, linkCenterModalStatus, rerender])

    return <>
        <div style={{ padding: "24px" }}>
            <LinkCenterInfo title="지점연동" content={<>지점을 추가하면 &apos;통계&apos; 메뉴에서 지점별 통계 (매출통계, 회원통계) 데이터가 연동됩니다. <br />연동된 지점은 {"{사마타 요가 강남점}"}의 통계를 볼 수 없습니다.</>} icon={<Info style={{ paddingTop: "5px" }} width={16} height={16} />} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBlock: "24px", height: "36px" }}>
                <RequestLinkCeter setModalStatus={setLinkCenterModalStatus} modalStatus={linkCenterModalStatus} setCenterCode={setCenterCode} centerCode={centerCode} setLoading={setLoading} loading={loading} />
                <Input classNames={{ input: styles.searchInput }} placeholder="지점명 검색" prefix={<Search width={16} height={16} />} style={{ width: "310px", height: "36px", backgroundColor: "var(--Base-Base-White)" }} onChange={(e) => setFilteredBranch(originalDataSource?.filter((i) => i.centerName.includes(e.target.value)))} />
            </div>
            <Table pagination={false} className={styles.linkCenterListTable} columns={columns} dataSource={filteredBranch} locale={{ emptyText }} />
        </div>
        <DeleteLinkCenter setBranchDeleteModalStatus={setBranchDeleteModalStatus} branchDeleteModalStatus={branchDeleteModalStatus} selectCenter={selectCenter} />
    </>
}

export { LinkCenterList };