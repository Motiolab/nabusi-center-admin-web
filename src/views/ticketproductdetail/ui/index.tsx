

import { BreadCrumb, TableFilter } from "@/features";
import { ReactComponent as Search } from '@/assets/icon/Search.svg';
import { ReactComponent as Filter } from '@/assets/icon/Filter.svg';
import { ReactComponent as Close } from '@/assets/icon/Close.svg';
import { ReactComponent as ArrowDown } from '@/assets/icon/ArrowDown.svg';
import styles from './styles.module.css'
import { Button, DatePicker, Input, InputNumber, Modal, Table } from "antd";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ticketExtendMemberColumns, ticketMemberColumns } from "../model";
import { ReactComponent as Plus } from '@/assets/icon/Plus.svg';
import { ReactComponent as Minus } from '@/assets/icon/Minus.svg';
import { ReactComponent as Schedule } from '@/assets/icon/Schedule.svg';
import dayjs from "dayjs";
import { editIsSalesTicketProduct, getTicketProductById, getTicketProductForDetailById } from "@/entities";
import { getTicketExtendListByTicketProductId, ticketExtendByProductId } from "@/entities";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { ticketValueEnToKr } from "@/entities/ticket/model";

const TicketProductDetailView = () => {
    const [ticketProductData, setTicketProductData] = useState<IRegisterAndUpdateTicketProduct>();
    const [originalDataSource, setOriginalDataSource] = useState<ITicketAndMemberForDetail>();
    const [filteredBranch, setFilteredBranch] = useState<ITicketAndMemberForDetail>();
    const [displayState, setDisplayState] = useState<boolean>(false);
    const [optionList, setOptionList] = useState<ITicketAndMemberTableFilterItem[]>([{ category: "status", valueList: ['USABLE', 'PAUSED', 'UNAVAILABLE', 'REFUND', 'COUNT_EXPIRED', 'PERIOD_EXPIRED'], gird: true, }]);
    const [selectList, setSelectList] = useState<ITicketAndMemberTableFilterItem[]>([]);
    const [ticektStopSellingModalStatus, setTicektStopSellingModalStatus] = useState<boolean>(false);
    const [ticketExtendModalStatus, setTicketExtendModalStatus] = useState<boolean>(false);
    const [ticketExtendDay, setTicketExtendDay] = useState<number>(0);
    const [ticketExtendDate, setTicketExtendDate] = useState<string>(dayjs().format("YYYY-MM-DD"));
    const [ticketExtendData, setTicketExtendData] = useState<any[]>([]);
    const [isSalesLoding, setIsSalesLoding] = useState<boolean>(false);
    const [memo, setMemo] = useState<string>("");
    const navigate = useNavigate();
    const emptyText = <div className="body-content-standard" style={{ display: "flex", gap: "var(--Spacingml)", alignItems: "center", color: "var(--Base-Base-Black)", justifyContent: "center" }}><div>아직 발급된 수강권이 없습니다.</div></div>;
    const [searchParams] = useSearchParams();
    const queryId = searchParams.get('id');
    const queryIsSales = searchParams.get('isSales');
    const selectedCenterId = useSelector((state: RootState) => state.selectedCenterId)

    const filteredBranchOnSumit = () => {
        setDisplayState(false);
        setFilteredBranch({ id: originalDataSource?.id ?? 0, memberAndTicket: originalDataSource?.memberAndTicket.filter(data => selectList.every(filterItem => filterItem.valueList.includes(data["status"]?.toString()))) ?? [] });
    }
    const onClickTicketExtendModalOpen = () => {
        if (!ticketProductData?.id) return;
        getTicketExtendListByTicketProductId(ticketProductData?.id, selectedCenterId)
            .then(res => { setTicketExtendData(res.data.body); setTicketExtendModalStatus(true) })
    }

    const onClickTicketExtend = () => {
        if ((filteredBranch?.memberAndTicket.filter(q => q.status === "USABLE")?.length ?? 0) === 0) return;
        if (!queryId) return;
        const value: ITicketExtend = { ticketProductId: queryId, targetDate: ticketExtendDate, day: ticketExtendDay, memo }
        ticketExtendByProductId(value, selectedCenterId)
            .then(res => { navigate("/home/wellness-ticket"); })
            .catch(err => console.error(err))

    }
    useEffect(() => {
        if (!queryId) return;
        getTicketProductById(queryId, selectedCenterId)
            .then(res => {
                setTicketProductData(res.data.body);
                getTicketProductForDetailById(queryId, selectedCenterId)
                    .then(res2 => {
                        const value: ITicketAndMemberForDetail = { ...res2.data, memberAndTicket: [...res2.data.memberAndTicket.map(q => ({ ...q, totalCnt: res.data.body?.usableCnt ?? null }))] };
                        setOriginalDataSource(value);
                        setFilteredBranch(value);
                    })
                    .catch(err => console.error(err))
            })
            .catch(err => console.error(err))
    }, [])

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
                    <BreadCrumb importContent={ticketProductData?.name} />
                </div>
            </div>
            <div style={{ height: "100%", display: "flex", gap: "24px", flexDirection: "column" }}>
                <div style={{ backgroundColor: "var(--Base-Base-White)", height: "172px", display: "flex", flexDirection: "column", gap: "var(--Spacingl)", padding: "var(--Spacingl) 0px var(--Spacingl) 0px" }}>
                    <div style={{ display: "flex", gap: "var(--Spacingl)" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "var(--Spacingml)", padding: "0px var(--Spacingl) 0px var(--Spacingl)", width: "480px" }}>
                            <div style={{ display: "flex", gap: "var(--Spacingbase)" }}>
                                <div className="body-content-bold" style={{ width: "124px", height: "28px" }}>
                                    수강권명
                                </div>
                                <div className="body-content-standard">
                                    {ticketProductData?.name}
                                </div>
                            </div>
                            <div style={{ display: "flex", gap: "var(--Spacingbase)" }}>
                                <div className="body-content-bold" style={{ width: "124px", height: "28px" }}>
                                    판매가
                                </div>
                                <div className="body-content-standard">
                                    {ticketProductData?.price.toLocaleString()} 원
                                </div>
                            </div>
                            <div style={{ display: "flex", gap: "var(--Spacingbase)" }}>
                                <div className="body-content-bold" style={{ width: "124px", height: "28px" }}>
                                    사용 가능 횟수
                                </div>
                                <div className="body-content-standard">
                                    {ticketProductData?.usableCnt?.toLocaleString()} 회
                                </div>
                            </div>
                            <div style={{ display: "flex", gap: "var(--Spacingbase)" }}>
                                <div className="body-content-bold" style={{ width: "124px", height: "28px" }}>
                                    예약 가능 수업 종류
                                </div>
                                <div style={{ display: "flex", gap: "12px" }}>
                                    {ticketProductData?.classTypeNameList?.map(name =>
                                        <div key={name} className="body-caption-standard" style={{ borderRadius: "var(--Radiuss)", backgroundColor: "var(--Neutrals-Neutrals100)", padding: "var(--Spacingxxs) var(--Spacings) var(--Spacingxxs) var(--Spacings)" }}>
                                            {name}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "var(--Spacingml)", padding: "0px var(--Spacingl) 0px var(--Spacingl)", width: "480px" }}>
                            <div style={{ display: "flex", gap: "var(--Spacingbase)" }}>
                                <div className="body-content-bold" style={{ width: "124px", height: "28px" }}>
                                    수강권 종류
                                </div>
                                <div className="body-content-standard">
                                    {ticketValueEnToKr(ticketProductData?.type ?? "")}
                                </div>
                            </div>
                            <div style={{ display: "flex", gap: "var(--Spacingbase)" }}>
                                <div className="body-content-bold" style={{ width: "124px", height: "28px" }}>
                                    사용 기한
                                </div>
                                <div className="body-content-standard">
                                    {ticketProductData?.usableDate}일
                                </div>
                            </div>
                            <div style={{ display: "flex", gap: "var(--Spacingbase)" }}>
                                <div className="body-content-bold" style={{ width: "124px", height: "28px" }}>
                                    이용 제한
                                </div>
                                <div className="body-content-standard">
                                    {ticketProductData?.limitCntPeriod && (ticketProductData?.limitTypePeriod ?? "" + ticketProductData?.limitCntPeriod)}회
                                </div>
                            </div>
                            <div style={{ display: "flex", gap: "var(--Spacingbase)" }}>
                                <div className="body-content-bold" style={{ width: "124px", height: "28px" }}>
                                    상태
                                </div>
                                {queryIsSales === "true" ? <div className='body-caption-accent' style={{ color: "var(--Primary-Primary)", backgroundColor: "var(--Primary-Primary50)", border: "1px solid var(--Primary-Primary)", borderRadius: "var(--Radiuss)", padding: 'var(--Spacingxxs) var(--Spacings) var(--Spacingxxs) var(--Spacings)', width: "37px" }}>판매중</div> : <div className='body-caption-accent' style={{ color: "var(--Error-Error)", backgroundColor: "var(--Error-Error50)", border: "1px solid var(--Error-Error)", borderRadius: "var(--Radiuss)", padding: 'var(--Spacingxxs) var(--Spacings) var(--Spacingxxs) var(--Spacings)', width: "49px" }}>판매정지</div>}
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ backgroundColor: "var(--Base-Base-White)", height: "calc(100% - 40px - 24px - 220px)", display: "flex", flexDirection: "column", gap: "var(--Spacingl)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "26px 24px 16px 24px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "var(--Spacingbase)" }}>
                            <div className="body-content-accent">
                                발급 목록 ({filteredBranch?.memberAndTicket?.length ?? 0})
                            </div>
                            <Button style={{ height: "36px", padding: "var(--Spacingxs) var(--Spacingm) var(--Spacingxs) var(--Spacingm)" }} type="primary" onClick={() => { onClickTicketExtendModalOpen() }}>수강권 일괄 연장</Button>
                        </div>
                        <div style={{ display: "flex", alignItems: 'center', gap: "var(--Spacings)" }}>
                            <Input classNames={{ input: styles.searchInput }} placeholder="이름 또는 휴대번호 검색" prefix={<Search />} style={{ width: "310px", height: "36px", backgroundColor: "var(--Base-Base-White)" }} onChange={(e) => setFilteredBranch({ id: originalDataSource?.id ?? 0, memberAndTicket: originalDataSource?.memberAndTicket.filter((i: any) => i?.name?.includes(e?.target?.value) || i?.mobile?.includes(e?.target?.value)) ?? [] })} />
                            <Button style={{ height: "36px", padding: "var(--Spacingxs) var(--Spacingm) var(--Spacingxs) var(--Spacingm)", display: "flex", alignItems: "center", gap: "var(--Spacings)" }} onClick={() => setDisplayState((e) => !e)}>필터<Filter /></Button>
                        </div>
                    </div>
                    <TableFilter displayState={displayState} optionList={optionList} setSelectList={setSelectList} onCancelClick={() => setDisplayState(false)} onSubmitClick={() => filteredBranchOnSumit()} isSimple={true} />
                    <div style={{ padding: "var(--Spacingml) var(--Spacingl) 60px var(--Spacingl)" }}>
                        <Table className={styles.ticketProductTable} columns={ticketMemberColumns} dataSource={filteredBranch?.memberAndTicket?.map((e, idx) => ({ ...e, key: idx }))} locale={{ emptyText }} pagination={{ position: ["bottomRight"], className: styles.tablePagenation }} />
                    </div>
                    <div style={{ display: "flex", padding: "var(--Spacingl)", justifyContent: "space-between", borderTop: "1px solid var(--Neutrals-Neutrals200)" }}>
                        {queryIsSales === "true" ? <Button className="body-content-accent" style={{ border: "1px solid var(--Error-Error)", color: "var(--Error-Error)", padding: "var(--Spacings) var(--Spacingbase) var(--Spacings) var(--Spacingbase)" }} onClick={() => setTicektStopSellingModalStatus(q => !q)}>수강권 판매정지</Button> : <div></div>}
                        <div style={{ display: "flex", gap: "var(--Spacingml)" }}>
                            <Link to={"/home/wellness-ticket"} ><Button>목록</Button></Link>
                            <Link to={{ pathname: `/home/ticketproductedit?id=${ticketProductData?.id}` }} ><Button style={{ border: "1px solid var(--Primary-Primary)", color: "var(--Primary-Primary)" }}>수정하기</Button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Modal centered open={ticketExtendModalStatus} styles={{ content: { padding: "var(--Spacingml) var(--Spacingl)" }, footer: { margin: 0 } }} width={620} onCancel={() => setTicketExtendModalStatus(false)} footer={false} closeIcon={false}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div className="body-highlight-accent" style={{ color: "var(--Base-Base-Black)" }}>
                    수강권 일괄 연장
                </div>
                <Close style={{ cursor: "pointer" }} width={24} height={24} onClick={() => setTicketExtendModalStatus(false)} />
            </div>
            <div>
                <div className="body-content-standard" style={{ color: "var(--Neutrals-Neutrals700)" }}>
                    연장 기준일에 이용중인 수강권만 일괄 연장됩니다. (정지중, 사용정지 제외)
                </div>
                <div className="body-content-accent" style={{ display: "flex", gap: "4px", marginBottom: "20px" }}>
                    <div style={{ color: "var(--Neutrals-Neutrals700)" }}>
                        예상 인원:
                    </div>
                    <div style={{ color: "var(--Primary-Primary)" }}>
                        {filteredBranch?.memberAndTicket.filter(q => q.status === "USABLE")?.length ?? 0}명
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--Spacingbase)" }}>
                    <div style={{ display: "flex", gap: "(--Spacingsm)", alignItems: "center", height: "44px" }}>
                        <div className="body-content-bold" style={{ width: "100px" }}>
                            연장 기준일
                        </div>
                        <div style={{ position: "relative" }}>
                            <div style={{ position: "absolute", top: 14, left: 8, zIndex: 0, display: "flex", alignItems: "center", justifyContent: "center" }}><Schedule width={16} height={16} fill={"var(--Neutrals-Neutrals500)"} /></div>
                            <DatePicker format={"        YYYY.MM.DD"} value={dayjs(ticketExtendDate)} suffixIcon={<ArrowDown width={16} height={16} fill={"var(--Neutrals-Neutrals500)"} />} className={styles.customDatePicker} style={{ width: "160px", height: "44px", backgroundColor: "transparent" }} onChange={(e) => setTicketExtendDate(e.format("YYYY-MM-DD"))} allowClear={false} />
                        </div>
                    </div>
                    <div style={{ display: "flex", gap: "(--Spacingsm)", alignItems: "center", height: "44px" }}>
                        <div className="body-content-bold" style={{ width: "100px" }}>
                            연장일
                        </div>
                        <div style={{ display: "flex", alignItems: 'center', gap: "12px" }}>
                            <InputNumber min={0} max={365} onChange={(e) => setTicketExtendDay(Number(e))} value={ticketExtendDay} className={styles.inputNumberFocusWithin} controls={false} style={{ position: "sticky", zIndex: 10000, width: "160px", height: "44px" }} addonBefore={<div style={{ position: "absolute", zIndex: 10000, borderRadius: "var(--Radiuss)", top: 0, left: 0, backgroundColor: "var(--Base-Base-White)", cursor: "pointer", width: "36px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setTicketExtendDay(q => q <= 0 ? 0 : q - 1)}><Minus width={16} height={16} fill="var(--Neutrals-Neutrals500)" /></div>} addonAfter={<div style={{ position: "absolute", zIndex: 10000, borderRadius: "var(--Radiuss)", top: 0, right: 0, backgroundColor: "var(--Base-Base-White)", cursor: "pointer", width: "36px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setTicketExtendDay(q => q >= 365 ? 365 : q + 1)}><Plus width={16} height={16} fill="var(--Neutrals-Neutrals500)" /></div>} />
                            <div>일</div>
                        </div>
                    </div>
                    <div style={{ display: "flex", gap: "(--Spacingsm)", alignItems: "center", height: "80px" }}>
                        <div className="body-content-bold" style={{ width: "100px" }}>
                            연장 사유
                        </div>
                        <div>
                            <Input.TextArea onChange={(e) => setMemo(e.target.value)} className="body-content-standard" placeholder="연장 사유를 입력 해주세요." style={{ width: "460px", height: "80px" }} />
                        </div>
                    </div>
                    <div style={{ marginBottom: "20px" }}>
                        <Table columns={ticketExtendMemberColumns} dataSource={ticketExtendData.map((q) => ({ ...q, key: q.id }))} scroll={{ y: "230px" }} pagination={false} />
                    </div>
                </div>
                <div style={{ textAlign: "right" }}>
                    <Button disabled={(filteredBranch?.memberAndTicket.filter(q => q.status === "USABLE")?.length ?? 0) === 0} style={{ width: "119px" }} type="primary" onClick={() => onClickTicketExtend()}>일괄 연장하기</Button>
                </div>
            </div>
        </Modal>
        <Modal centered open={ticektStopSellingModalStatus} styles={{ content: { padding: "var(--Spacingml) var(--Spacingbase) var(--Spacingml) var(--Spacingbase)" } }} width={436} onCancel={() => setTicektStopSellingModalStatus(false)} footer={false} closeIcon={false}>
            <div className="body-highlight-accent" style={{ color: "var(--Base-Base-Black)" }}>
                수강권 판매 정지
            </div>
            <div className="body-content-standard" style={{ color: "var(--Neutrals-Neutrals700)", marginBlock: "20px" }}>
                수강권을 보유한 회원이 {originalDataSource?.memberAndTicket?.length ?? 0}명 있습니다.<br />
                수강권을 판매 정지하시겠습니까?<br />
                <div style={{ display: "flex" }}>
                    <div style={{ paddingInline: "8px" }}>
                        &middot;
                    </div>
                    <div> 판매 정지되어도 회원은 수강권을 만료일까지 사용할 수 있습니다.<br /></div>
                </div>
            </div>
            <div style={{ display: "flex", gap: "var(--Spacingbase)" }}>
                <Button className="body-content-accent" style={{ height: "52px", width: "50%" }} onClick={() => setTicektStopSellingModalStatus(false)}>돌아가기</Button>
                <Button className="body-content-accent" style={{ height: "52px", width: "50%" }} onClick={() => { setIsSalesLoding(true); editIsSalesTicketProduct({ id: ticketProductData?.id, isSales: false }, selectedCenterId).then(res => { setIsSalesLoding(false); navigate("/home/ticketproductlist") }); }} type="primary" danger>{isSalesLoding ? "판매정지 중" : "판매 정지하기"}</Button>
            </div>
        </Modal>
    </>
}

export { TicketProductDetailView };