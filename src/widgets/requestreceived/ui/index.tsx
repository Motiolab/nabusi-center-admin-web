

import { ReactComponent as Warning } from "@/assets/icon/Warning.svg";
import styles from './style.module.css';
import { Table } from "antd";
import { useEffect, useState } from "react";
import { linkRequestCenterColumns } from "../model";
import { LinkCenterInfo, RequestLinkCenterAcceptModal } from "@/features";
import { getCenterDataLinkListForResponseTableById } from "../api";
import { requestLinkCenterEnumToKr } from "@/entities";
import { patchCenterDataLink } from "@/widgets/linkcenter/api";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface ITableDataSource extends IRequestLinkCenter {
    key: number;
}


const RequestReceived = () => {
    const [moreBtnClickStatusList, setMoreBtnClickStatusList] = useState<boolean[]>([]);
    const [acceptRequestModalStatus, setAcceptRequestModalStatus] = useState<boolean>(false);
    const [acceptRequestLoading, setAcceptRequestLoading] = useState<boolean>(false);
    const [dataSource, setDataSource] = useState<ITableDataSource[]>();
    const [selectCenter, setSelectCenter] = useState<any>();
    const selectedCenterId = useSelector((state: RootState) => state.selectedCenterId)
    const columns = linkRequestCenterColumns({ styles, setMoreBtnClickStatusList, moreBtnClickStatusList, setAcceptRequestModalStatus, selectCenter, setSelectCenter, selectedCenterId })
    const emptyText = <div style={{ display: "flex", flexDirection: "column", gap: "var(--Spacingml)", alignItems: "center", justifyContent: "center" }}><Warning width={32} height={32} fill={"var(--Neutrals-Neutrals300)"} /><div className="desktop-body-feature-standard">요청 받은 센터가 업습니다.</div></div>;

    const getCenterDataLinkList = (): Promise<void> => {
        return getCenterDataLinkListForResponseTableById(selectedCenterId)
            .then((res) => { setDataSource(res.data.map((e, idx) => ({ ...e, key: idx, status: requestLinkCenterEnumToKr(e.status) }))) })
            .catch((err) => { console.log(err) })
    }
    const onAcceptOnClick = () => {
        if (acceptRequestLoading || !selectCenter) return;
        setAcceptRequestLoading(true);
        setMoreBtnClickStatusList([]);
        patchCenterDataLink({ id: selectCenter.id, status: "COMPLETE" }, selectedCenterId)
            .then((res) => { console.log(res.data) })
            .catch((err) => { console.error(err); })
            .finally(() => { getCenterDataLinkList().then(() => { setAcceptRequestLoading(false); setAcceptRequestModalStatus(false); }) })
    }
    const onBackOnClick = () => {
        setAcceptRequestModalStatus(false)
    }
    useEffect(() => {
        getCenterDataLinkList()
    }, [])

    useEffect(() => {
        getCenterDataLinkList()
        setMoreBtnClickStatusList([])
    }, [selectCenter])

    return <>
        <div style={{ padding: "24px" }}>
            <LinkCenterInfo
                title="연동 수락"
                content={<div>연동을 수락할 경우 요청한 센터에게 통계 정보가 전달됩니다.<br />연동을 원하지 않는 경우 [거절]을 선택하세요.</div>}
                icon={<Warning style={{ paddingTop: "5px" }} width={16} height={16} fill={"var(--Warning-Warning300)"} />}
                styles={{ container: { backgroundColor: "#F4C7901A" }, title: { color: "var(--Warning-Warning300)" }, border: { border: "1px solid var(--Warning-Warning200)" } }}
            />
            <Table pagination={false} className={styles.linkCenterListTable} columns={columns} dataSource={dataSource?.map((e, idx) => ({ ...e, key: idx }))} locale={{ emptyText }} />
        </div>
        <RequestLinkCenterAcceptModal setAcceptRequestModalStatus={setAcceptRequestModalStatus} acceptRequestModalStatus={acceptRequestModalStatus} acceptRequestLoading={acceptRequestLoading} onAcceptOnClick={onAcceptOnClick} onBackOnClick={onBackOnClick} />
    </>
}

export { RequestReceived };