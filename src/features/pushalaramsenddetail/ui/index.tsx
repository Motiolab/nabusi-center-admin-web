import { useEffect, useRef, useState } from "react";
import { Button, ConfigProvider, DatePicker, Input, InputNumber, Modal, Radio, Table, TimePicker } from "antd";
import { ReactComponent as ArrowDown } from '@/assets/icon/ArrowDown.svg';
import { ReactComponent as Search } from '@/assets/icon/Search.svg';
import { ReactComponent as Schedule } from '@/assets/icon/Schedule.svg';
import { ReactComponent as Clock } from '@/assets/icon/Clock.svg';
import { ReactComponent as Plus } from '@/assets/icon/Plus.svg';
import dayjs from "dayjs";

import styles from './styles.module.css'
import { useNavigate } from "react-router-dom";
import { pushAlaramMemberSendColumn as pushAlaramMemberSendColumns, sendMemberSelectColumns } from "../model";

const PushAlaramSendDetail = () => {
    const mockData: IMemberForNotificationSend[] = [{ id: 1, memberName: '윤정준', mobile: '82 010-5851-3100', ticketListForNotificationSend: [{ id: 2, name: 'ticket1', remainingDate: '30', usableCnt: 30, totalCnt: 50 }, { id: 3, name: 'ticket1', remainingDate: '70', usableCnt: null, totalCnt: null }] }, { id: 4, memberName: '권준학', mobile: '82 010-8889-3457', ticketListForNotificationSend: [{ id: 5, name: 'ticket1', remainingDate: '14', usableCnt: 30, totalCnt: 50 }, { id: 6, name: 'ticket2', remainingDate: '354', usableCnt: 10, totalCnt: 150 }, { id: 7, name: 'ticket3', remainingDate: '4', usableCnt: null, totalCnt: null }] }]
    const [originalDataSource, setOriginalDataSource] = useState<IMemberForNotificationSend[]>([]);
    const [sendMemberList, setSendMemberList] = useState<IMemberForNotificationSend[]>([]);
    const [selectSendMemberIdList, setSelectSendMemberIdList] = useState<number[]>([]);
    const [fillterSendMemberList, setFillterSendMemberList] = useState<IMemberForNotificationSend[]>([]);
    const targetDateFormat = "       YYYY.MM.DD";
    const targetTimeFormat = "        a hh:mm";
    const [sendTargerDate, setSendTargerDate] = useState(dayjs());
    const [sendTargerTime, setSendTargerTime] = useState(dayjs());
    const [sendType, setSendType] = useState<"IMMEDIATELY" | "RESERVATION">("IMMEDIATELY");
    const [isSendMemberListModalStatus, setIsSendMemberListModalStatus] = useState<boolean>(false);
    const [isSendPushAlaramModalStatus, setIsSendPushAlaramModalStatus] = useState<boolean>(false);
    const [isTicketRemainingDateDropDownStatus, setIsTicketRemainingDateDropDownStatus] = useState<boolean>(false);
    const [isTicketRemainingCntDropDownStatus, setIsTicketRemainingCntDropDownStatus] = useState<boolean>(false);
    const [ticketRemainingDateForSearch, setTicketRemainingDateForSearch] = useState<number>();
    const [ticketRemainingCntForSearch, setTicketRemainingCntForSearch] = useState<number>();
    const navigate = useNavigate();
    const ticketRemainingDateRef = useRef<HTMLDivElement>(null);
    const ticketRemainingCntRef = useRef<HTMLDivElement>(null);
    const emptyText = <div className="body-content-standard" style={{ textAlign: "left", color: "var(--Base-Base-Black)", display: "flex", alignItems: "center", gap: "var(--Spacings)" }}><Plus style={{ cursor: "pointer", backgroundColor: "var(--Primary-Primary)", width: "Hug (24px)px", height: "Hug (24px)px", padding: "var(--Spacingxs)", borderRadius: "var(--Spacingxs)" }} width={16} height={16} fill={"var(--Base-Base-White)"} onClick={() => setIsSendMemberListModalStatus(true)} /> 을 눌러 발송 대상을 추가해 주세요.</div>;
    const onFilterClick = (filterId: number) => { setSendMemberList(q => q?.filter(w => w?.id !== filterId)) }
    const onFinish = () => {
        navigate('/home/customercenter/pushalarm/')
    }
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ticketRemainingDateRef.current && !ticketRemainingDateRef.current.contains(event.target as Node)) {
                setIsTicketRemainingDateDropDownStatus(false)
            }
            if (ticketRemainingCntRef.current && !ticketRemainingCntRef.current.contains(event.target as Node)) {
                setIsTicketRemainingCntDropDownStatus(false)
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setOriginalDataSource(mockData)
        setFillterSendMemberList(mockData)
    }, [])

    return <>
        <div style={{ backgroundColor: 'var(--Neutrals-Neutrals50)' }}>
            <div style={{ minHeight: "calc(100vh - 84px - 48px - 48px )", display: "flex", gap: "24px" }}>
                <div style={{ width: "436px", backgroundColor: "var(--Base-Base-White)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "Hug (30px)", padding: "var(--Spacingml) var(--Spacingl) var(--Spacingm) var(--Spacingl)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                            <div className="body-highlight-accent" style={{ color: "var(--Base-Base-Black)" }}>
                                발송 대상
                            </div>
                            <Plus style={{ cursor: "pointer", backgroundColor: "var(--Primary-Primary)", width: "Hug (24px)px", height: "Hug (24px)px", padding: "var(--Spacingxs)", borderRadius: "var(--Spacingxs)" }} width={16} height={16} fill={"var(--Base-Base-White)"} onClick={() => setIsSendMemberListModalStatus(true)} />
                        </div>

                        <div className="body-caption-accent" style={{ color: "var(--Primary-Primary)" }}>
                            총 {sendMemberList?.length?.toLocaleString()}명
                        </div>
                    </div>
                    <div style={{ paddingInline: "var(--Spacingl)" }}>
                        <ConfigProvider theme={{ components: { Table: { cellPaddingInline: 0, cellPaddingBlock: 8 }, }, }}>
                            <Table columns={pushAlaramMemberSendColumns(onFilterClick)} dataSource={sendMemberList.map(q => ({ ...q, key: q.id }))} locale={{ emptyText }} scroll={{ y: "484px" }} pagination={false} />
                        </ConfigProvider>
                    </div>
                </div>
                <div style={{ width: "calc(100% - 436px - 24px)", backgroundColor: "var(--Base-Base-White)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "var(--Spacingl)" }}>
                        <div className="body-highlight-accent" style={{ padding: "var(--Spacingml) var(--Spacingl) var(--Spacingm) var(--Spacingl)", color: "var(--Base-Base-Black)" }}>
                            발송 내용
                        </div>
                        <div style={{ padding: "0px var(--Spacingl) 0px var(--Spacingl)", color: "var(--Base-Base-Black)", display: "flex", flexDirection: "column", gap: "48px" }}>
                            <div style={{ display: "flex", flexDirection: "column", gap: "var(--Spacings)" }}>
                                <div className="body-content-bold">
                                    제목
                                </div>
                                <div>
                                    <Input placeholder="제목을 입력해 주세요." />
                                </div>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: "var(--Spacings)" }}>
                                <div className="body-content-bold">
                                    내용
                                </div>
                                <div>
                                    <Input.TextArea placeholder="내용을 입력해 주세요." />
                                </div>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: "var(--Spacings)" }}>
                                <div className="body-content-bold">
                                    발송 유형
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: "var(--Spacingl)" }}>
                                    <Radio.Group defaultValue={"IMMEDIATELY"} value={sendType} onChange={q => setSendType(q.target.value)} style={{ display: 'flex', gap: 'var(--Spacings)' }}>
                                        <Radio value={"IMMEDIATELY"} className="body-content-standard">즉시 발송</Radio>
                                        <Radio value={"RESERVATION"} className="body-content-standard">예약 발송</Radio>
                                    </Radio.Group>
                                    <div style={{ display: "flex", gap: "8px" }}>
                                        <div style={{ position: "relative" }}>
                                            <div style={{ position: "absolute", top: 10.5, left: 8, zIndex: 0, display: "flex", alignItems: "center", justifyContent: "center" }} ><Schedule width={16} height={16} fill={"var(--Neutrals-Neutrals500)"} /></div>
                                            <DatePicker format={targetDateFormat} value={sendTargerDate} suffixIcon={<ArrowDown width={16} height={16} fill={"var(--Neutrals-Neutrals500)"} />} className={styles.customDatePicker} style={{ width: "160px", height: "36px", backgroundColor: "transparent", cursor: "pointer" }} onChange={(e) => { setSendTargerDate(e) }} allowClear={false} />
                                        </div>
                                        <div style={{ position: "relative" }}>
                                            <div style={{ position: "absolute", top: 10.5, left: 8, zIndex: 0, display: "flex", alignItems: "center", justifyContent: "center" }}><Clock width={16} height={16} style={{ display: "flex", alignItems: "center" }} fill={"var(--Neutrals-Neutrals500)"} /></div>
                                            <TimePicker format={targetTimeFormat} value={sendTargerTime} suffixIcon={<ArrowDown width={16} height={16} fill={"var(--Neutrals-Neutrals500)"} />} className={styles.customDatePicker} style={{ width: "160px", height: "36px", backgroundColor: "transparent", cursor: "pointer" }} onCalendarChange={(e) => !Array.isArray(e) && setSendTargerTime(e)} allowClear={false} needConfirm={false} use12Hours />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--Neutrals-Neutrals200)", height: "44px", padding: "var(--Spacingl)" }}>
                        <Button onClick={() => navigate(-1)}>취소</Button>
                        <Button type="primary" onClick={() => setIsSendPushAlaramModalStatus(true)}>발송하기</Button>
                    </div>
                </div>
            </div>
        </div>
        <Modal centered styles={{ content: { padding: "var(--Spacingml) var(--Spacingl) var(--Spacingml) var(--Spacingl)" } }} open={isSendMemberListModalStatus} footer={false} closeIcon={false} width={896} onCancel={() => setIsSendMemberListModalStatus(false)}>
            <div className="body-highlight-accent" style={{ color: "var(--Base-Base-Black)", marginBottom: "20px" }}>
                발송 대상 추가
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", gap: "var(--Spacingbase)" }}>
                    <div ref={ticketRemainingDateRef} style={{ position: "relative" }}>
                        <Input placeholder="수강권 잔여 기간" value={ticketRemainingDateForSearch ? ticketRemainingDateForSearch + ' 일 이하' : ticketRemainingDateForSearch} styles={{ input: { cursor: "default", caretColor: "transparent" } }} style={{ cursor: "default", backgroundColor: "var(--Base-Base-White)", height: "36px", width: "160px" }} suffix={<ArrowDown width={16} height={16} fill={"var(--Neutrals-Neutrals500)"} onClick={() => { setIsTicketRemainingDateDropDownStatus(q => !q) }} />} onClick={() => { setIsTicketRemainingDateDropDownStatus(q => !q) }} />
                        <div className="body-caption-standard" style={{ position: "absolute", zIndex: 9999, top: 40, padding: "var(--Spacingxs) var(--Spacingsm) var(--Spacingxs) var(--Spacingsm)", boxShadow: "0px 2px 8px 0px #0000001A", borderRadius: "var(--Radiuss)", backgroundColor: "var(--Base-Base-White)", display: isTicketRemainingDateDropDownStatus ? "flex" : "none", gap: "var(--Spacingsm)", alignItems: "center", height: "36px", width: "136px", color: "var(--Neutrals-Neutrals700)" }}><InputNumber controls={false} min={0} placeholder="숫자 입력" style={{ width: "84px" }} onChange={q => setTicketRemainingDateForSearch(q ?? undefined)} />일 이하</div>
                    </div>
                    <div ref={ticketRemainingCntRef} style={{ position: "relative" }}>
                        <Input placeholder="수강권 잔여 횟수" value={ticketRemainingCntForSearch ? ticketRemainingCntForSearch + ' 회 이하' : ticketRemainingCntForSearch} styles={{ input: { cursor: "default", caretColor: "transparent" } }} style={{ cursor: "default", backgroundColor: "var(--Base-Base-White)", height: "36px", width: "160px" }} suffix={<ArrowDown width={16} height={16} fill={"var(--Neutrals-Neutrals500)"} onClick={() => { setIsTicketRemainingCntDropDownStatus(q => !q) }} />} onClick={() => setIsTicketRemainingCntDropDownStatus(q => !q)} />
                        <div className="body-caption-standard" style={{ position: "absolute", zIndex: 9999, top: 40, padding: "var(--Spacingxs) var(--Spacingsm) var(--Spacingxs) var(--Spacingsm)", boxShadow: "0px 2px 8px 0px #0000001A", borderRadius: "var(--Radiuss)", backgroundColor: "var(--Base-Base-White)", display: isTicketRemainingCntDropDownStatus ? "flex" : "none", gap: "var(--Spacingsm)", alignItems: "center", height: "36px", width: "136px", color: "var(--Neutrals-Neutrals700)" }}><InputNumber controls={false} min={0} placeholder="숫자 입력" style={{ width: "84px" }} onChange={q => setTicketRemainingCntForSearch(q ?? undefined)} />회 이하</div>
                    </div>
                    <Button className="ody-content-accent" style={{ color: "var(--Primary-Primary)", borderColor: "var(--Primary-Primary)", height: "36px", padding: "var(--Spacingxs) var(--Spacingm) var(--Spacingxs) var(--Spacingm)" }} onClick={() => setFillterSendMemberList(originalDataSource.filter(q => (ticketRemainingDateForSearch ? q.ticketListForNotificationSend.some((w) => Number(w.remainingDate) <= ticketRemainingDateForSearch) : true) && (ticketRemainingCntForSearch ? q.ticketListForNotificationSend.some(w => (w.usableCnt ?? 0) <= ticketRemainingCntForSearch) : true)))}>적용</Button>
                </div>
                <div>
                    <Input placeholder="이름 또는 휴대폰번호 검색" prefix={<Search />} style={{ width: "310px", height: "32px", backgroundColor: "var(--Base-Base-White)" }} onChange={(e) => setFillterSendMemberList(originalDataSource.filter(q => q.mobile.includes(e.target.value) || q.memberName.includes(e.target.value)))} />
                </div>
            </div>
            <div style={{ color: "var(--Neutrals-Neutrals700)", marginBlock: "20px" }}>
                <div className="body-content-standard">
                    <ConfigProvider theme={{ components: { Table: { cellPaddingInline: 9, }, }, }}>
                        <Table columns={sendMemberSelectColumns} dataSource={fillterSendMemberList.map(q => ({ ...q, key: q.id }))} className={styles.tableCheckBox} rowSelection={{ type: "checkbox", onChange: selectedRowKeys => setSelectSendMemberIdList(selectedRowKeys.map(q => Number(q))), selectedRowKeys: selectSendMemberIdList }} scroll={{ y: "610px" }} pagination={false} />
                    </ConfigProvider>
                </div>
            </div>
            <div style={{ textAlign: "right" }}>
                <Button className="body-content-accent" style={{ height: "44px", width: "128px", padding: "var(--Spacings) var(--Spacingbase) var(--Spacings) var(--Spacingbase)" }} onClick={() => { setSendMemberList(originalDataSource?.filter(q => selectSendMemberIdList?.includes(q?.id))); setIsSendMemberListModalStatus(false); setSelectSendMemberIdList([]) }} type="primary">({selectSendMemberIdList?.length?.toLocaleString()}명) 추가하기</Button>
            </div>
        </Modal >
        <Modal centered styles={{ content: { padding: "var(--Spacingml) var(--Spacingbase) var(--Spacingml) var(--Spacingbase)" } }} open={isSendPushAlaramModalStatus} footer={false} closeIcon={false} width={436} onCancel={() => setIsSendPushAlaramModalStatus(false)}>
            {sendType === 'IMMEDIATELY'
                ? <>
                    <div className="body-highlight-accent" style={{ color: "var(--Base-Base-Black)" }}>
                        알림 발송하기
                    </div>
                    <div style={{ color: "var(--Neutrals-Neutrals700)", marginBlock: "20px" }}>
                        <div className="body-content-standard">
                            총 {sendMemberList?.length?.toLocaleString()}의 회원에게 알림을 발송하시겠습니까?
                        </div>
                    </div>
                    <div style={{ display: "flex", gap: "var(--Spacingbase)" }}>
                        <Button className="body-content-accent" style={{ height: "52px", width: "50%" }} onClick={() => setIsSendPushAlaramModalStatus(false)}>취소</Button>
                        <Button className="body-content-accent" style={{ height: "52px", width: "50%" }} onClick={onFinish} type="primary">발송하기</Button>
                    </div>
                </>
                : <>
                    <div className="body-highlight-accent" style={{ color: "var(--Base-Base-Black)" }}>
                        알림 예약하기
                    </div>
                    <div style={{ color: "var(--Neutrals-Neutrals700)", marginBlock: "20px" }}>
                        <div className="body-content-standard">
                            총 {sendMemberList?.length?.toLocaleString()}의 회원에게 알림을 발송하시겠습니까?<br />
                            ・  예약 일시: {sendTargerDate.format('YYYY.MM.DD')} {sendTargerTime.get('h') < 12 ? "오전" : "오후"} {sendTargerTime.format('hh:mm')}
                        </div>
                    </div>
                    <div style={{ display: "flex", gap: "var(--Spacingbase)" }}>
                        <Button className="body-content-accent" style={{ height: "52px", width: "50%" }} onClick={() => setIsSendPushAlaramModalStatus(false)}>취소</Button>
                        <Button className="body-content-accent" style={{ height: "52px", width: "50%" }} onClick={onFinish} type="primary">예약하기</Button>
                    </div>
                </>}
        </Modal>
    </>
}


export { PushAlaramSendDetail }