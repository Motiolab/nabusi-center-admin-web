import { useQueryGetWellnessTicketDetailById } from "@/entities/wellnessticket/model";
import { RootState } from "@/store";
import { Button, Divider, Flex, Input, Table, Tag } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import WellnessTicketDetailInfo from "./ui/WellnessTicketDetailInfo";
import { ReactComponent as Search } from '@/assets/icon/Search.svg'
import DeleteWellnessTicket from "@/features/deletewellnessticket";
import RestoreWellnessTicket from "@/features/restorewellnessticket ";
import ExtensionTicket from "@/features/extensionTicket";
import { useQueryGetWellnessTicketIssuanceListByWellnessTicketId } from "@/entities/wellnessticketissuance/model";
import dayjs from 'dayjs'
import { ticketValueEnToKr } from "@/entities/ticket/model";

const WellnessTicketDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const selectedCenterId = useSelector((state: RootState) => state.selectedCenterId)
    const [searchText, setSearchText] = useState<string>("");
    const numericId = id ? parseInt(id, 10) : undefined;
    const { data: wellnessTicketIssuanceList } = useQueryGetWellnessTicketIssuanceListByWellnessTicketId(selectedCenterId, numericId as number);
    const { data: wellnessTicketDetail, isError, error } = useQueryGetWellnessTicketDetailById(selectedCenterId, numericId as number);
    const emptyText = <div className="body-content-standard" style={{ textAlign: "left", color: "var(--Base-Base-Black)" }}>발급 수강권 이력이 없습니다.</div>;

    if (isError) {
        return <div>유효하지 않은 ID입니다. {String(error)}</div>;
    }

    return <>
        {wellnessTicketDetail && <div style={{ backgroundColor: 'white' }}>
            <WellnessTicketDetailInfo wellnessTicketDetail={wellnessTicketDetail} />
            <Divider style={{ margin: 0 }} />
            <Flex justify="end" style={{ padding: 24 }} gap={12}>
                {(selectedCenterId && numericId && wellnessTicketDetail) &&
                    !wellnessTicketDetail.isDelete ?
                    <DeleteWellnessTicket centerId={selectedCenterId} id={numericId as number} />
                    : <RestoreWellnessTicket centerId={selectedCenterId} id={numericId as number} />}
                <Button color="primary" variant="outlined" onClick={() => navigate(`/wellness-ticket/update/${numericId}`)}>수정하기</Button>
            </Flex>
        </div>}
        <div style={{ marginTop: 24, backgroundColor: 'white' }}>
            <div style={{ padding: 24 }}>
                <Flex justify="space-between">
                    <Flex align="center" gap={16}>
                        <div>발급 목록 ({wellnessTicketIssuanceList?.length})</div>
                        {wellnessTicketDetail && <ExtensionTicket wellnessTicketId={wellnessTicketDetail.id} wellnessTicketName={wellnessTicketDetail.name} />}
                    </Flex>
                    <div>
                        <Input
                            placeholder="이름 또는 휴대폰번호 검색"
                            value={searchText}
                            prefix={<Search />}
                            style={{ width: "310px", height: "36px", backgroundColor: "var(--Base-Base-White)" }}
                            onChange={(e) => setSearchText(e.target.value)} />
                    </div>
                </Flex>
                <div style={{ marginTop: 20 }}>
                    {wellnessTicketIssuanceList && <>
                        <Table
                            style={{ marginTop: 20 }}
                            columns={[
                                { title: "no.", dataIndex: "", className: "body-content-standard", render: (_: number, __: any, index: number) => index + 1 },
                                { title: "이름", dataIndex: "memberName", className: "body-content-standard", render: (value: string) => value },
                                { title: "전화번호", dataIndex: "mobile", className: "body-content-standard", render: (value: string) => value },
                                {
                                    title: "수강권", dataIndex: "wellnessTicketIssuanceName", className: "body-content-standard", render: (value: string, record: IGetWellnessTicketIssuanceListByWellnessTicketIdAdminResponseV1) => {
                                        return <Link to={`/wellness-ticket-issuance/update/${record.id}`}><div className="body-content-accent">{value}</div></Link>
                                    }
                                },
                                {
                                    title: "구분", dataIndex: "type", className: "body-content-standard", render: (value: string, record: IGetWellnessTicketIssuanceListByWellnessTicketIdAdminResponseV1) =>
                                        <>{ticketValueEnToKr(value)}</>
                                },
                                {
                                    title: "잔여", dataIndex: "remainingDate", className: "body-content-standard", render: (value: string, record: IGetWellnessTicketIssuanceListByWellnessTicketIdAdminResponseV1) => <>
                                        <Flex gap={8}>
                                            <div className="body-caption-standardp" style={{ padding: '2px 8px', backgroundColor: 'var(--Neutrals-Neutrals100)', borderRadius: 4 }}>{record.remainingDate}일 남음</div>
                                            <div className="body-caption-standardp" style={{ padding: '2px 8px', backgroundColor: 'var(--Neutrals-Neutrals100)', borderRadius: 4 }}>{record.remainingCnt}회 / {record.totalUsableCnt}회</div>
                                            {record.limitType !== 'NONE' && <div className="body-caption-standardp" style={{ padding: '2px 8px', color: '#e57373', backgroundColor: '#fff2f0', borderRadius: 4 }}>{ticketValueEnToKr(record.limitType)} {record.limitCnt}회 제한</div>}
                                        </Flex>
                                    </>
                                },
                                {
                                    title: "결제일", dataIndex: "createdDate", className: "body-content-standard", render: (value: string) => <>
                                        {dayjs(value).format("YYYY-MM-DD")}
                                    </>
                                }, {
                                    title: "상태", dataIndex: "isDelete", className: "body-content-standard", render: (value: boolean, record: IGetWellnessTicketIssuanceListByWellnessTicketIdAdminResponseV1) => {
                                        return <Flex>{!value ?
                                            <Tag bordered={false} color="processing" className="body-caption-accent">이용중</Tag> :
                                            record.remainingCnt > 0 ?
                                                <Tag bordered={false} color="red" className="body-caption-accent">사용 불가</Tag> :
                                                <Tag bordered={false} color="red" className="body-caption-accent">사용 완료</Tag>}
                                            {record.unpaidValue > 0 && <Tag bordered={false} color="error" className="body-caption-accent">미수금</Tag>}
                                        </Flex>
                                    }
                                },
                            ]}
                            dataSource={wellnessTicketIssuanceList.map((e, idx) => ({ ...e, key: idx }))}
                            locale={{ emptyText }}
                            pagination={{
                                position: ["bottomCenter"],
                                pageSize: 5
                            }}
                        />
                    </>}
                </div>
            </div>

        </div>
    </>
}

export default WellnessTicketDetail;