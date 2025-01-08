import { ticketValueEnToKr } from "@/entities/ticket/model"
import { LectureStartTime } from "@/shared/utils/format/lectureStartTime"
import { Button, Col, Divider, Flex, Row, message } from "antd"
import dayjs from 'dayjs'
import { useState } from "react"

interface IProps {
    wellnessLectureDetail: IGetWellnessLectureDetailAdminResponseV1
    memberDetail: IGetAllMemberListByCenterIdAdminResponseV1 | undefined
    onClickBeforeButton: Function
    createReservation: Function
}

const CheckReservation = ({ wellnessLectureDetail, memberDetail, onClickBeforeButton, createReservation }: IProps) => {
    const [selectedTicketId, setSelectedTicketId] = useState<number | undefined>(undefined);

    return <>
        <div style={{ marginTop: 20 }}>
            <div style={{ padding: 10 }}>
                <div className="body-highlight-accent">수업 정보</div>
            </div>
            <Divider style={{ margin: 0 }} />
            <div style={{ padding: 24 }}>
                <Flex gap={12} >
                    <div className="body-content-bold" style={{ width: 100 }}>수업명</div>
                    <div className="body-content-standard">{wellnessLectureDetail.name}</div>
                </Flex>
                <Flex gap={12} style={{ marginTop: 8 }}>
                    <div className="body-content-bold" style={{ width: 100 }}>담당 강사</div>
                    <div className="body-content-standard">{wellnessLectureDetail.teacherName}</div>
                </Flex>
                <Flex gap={12} style={{ marginTop: 8 }}>
                    <div className="body-content-bold" style={{ width: 100 }}>수업 시간</div>
                    <div className="body-content-standard">{LectureStartTime(wellnessLectureDetail.startDateTime, wellnessLectureDetail.endDateTime)}</div>
                </Flex>
                <Flex gap={12} style={{ marginTop: 8 }}>
                    <div className="body-content-bold" style={{ width: 100 }}>수업 장소</div>
                    <div className="body-content-standard">{wellnessLectureDetail.room}</div>
                </Flex>
                <Flex gap={12} style={{ marginTop: 8 }}>
                    <div className="body-content-bold" style={{ width: 100 }}>담당 강사</div>
                    <div className="body-content-standard">{wellnessLectureDetail.teacherName}</div>
                </Flex>
            </div>
            <div style={{ padding: 10, marginTop: 10 }}>
                <div className="body-highlight-accent">예약자 정보</div>
            </div>
            <Divider style={{ margin: 0 }} />
            <div style={{ padding: 24 }}>
                {memberDetail ? <>
                    <Flex gap={12}>
                        <div className="body-content-bold" style={{ width: 100 }}>이름</div>
                        <div className="body-content-standard">{memberDetail.name}</div>
                    </Flex>
                    <Flex gap={12} style={{ marginTop: 8 }}>
                        <div className="body-content-bold" style={{ width: 100 }}>휴대폰번호</div>
                        <div className="body-content-standard">{memberDetail.mobile}</div>
                    </Flex>
                    <Flex gap={12} style={{ marginTop: 8 }}>
                        <div className="body-content-bold" style={{ width: 100 }}>생년월일</div>
                        <div className="body-content-standard">1111.11.11 11.11</div>
                    </Flex>
                    <Flex gap={12} style={{ marginTop: 8 }}>
                        <div className="body-content-bold" style={{ width: 100 }}>SNS</div>
                        <div className="body-content-standard">카카오 혹은 네이버</div>
                    </Flex>
                    <Flex gap={12} style={{ marginTop: 8 }}>
                        <div className="body-content-bold" style={{ width: 100 }}>등록일</div>
                        <div className="body-content-standard">{dayjs(memberDetail.createdDate).format('YYYY.MM.DD')}</div>
                    </Flex>

                    <div className="body-content-bold" style={{ width: 100, marginTop: 8 }}>수강권</div>
                    <div>
                        <div style={{ maxHeight: 640, overflow: 'scroll' }}>
                            <Row>
                                {memberDetail.wellnessTicketIssuanceList.length > 0 ?
                                    memberDetail.wellnessTicketIssuanceList
                                        .map((ticket: IWellnessTicketIssuance) => (
                                            <Col span={8} style={{ padding: 8 }} key={ticket.id}>
                                                <div
                                                    style={{
                                                        border: selectedTicketId && ticket.id === selectedTicketId ? '1px solid var(--Primary-Primary)' : '1px solid var(--Neutrals-Neutrals200)',
                                                        padding: '8px 12px',
                                                        cursor: 'pointer',
                                                        borderRadius: 4
                                                    }}
                                                    onClick={() => setSelectedTicketId(ticket.id)}
                                                >
                                                    <div className="body-caption-accent" style={{ color: "var(--Neutrals-Neutrals500)" }}>
                                                        {ticketValueEnToKr(ticket.type)}
                                                    </div>
                                                    <div
                                                        className="desktop-body-content-bold"
                                                        style={{ color: selectedTicketId && ticket.id === selectedTicketId ? "var(--Primary-Primary)" : "var(--Neutrals-Neutrals700)" }}
                                                    >
                                                        {ticket.name}
                                                    </div>
                                                    <div className="body-caption-standard" style={{ color: "var(--Neutrals-Neutrals700)", marginTop: 8 }}>
                                                        가격
                                                    </div>
                                                </div>
                                            </Col>
                                        ))
                                    : <Col span={24} style={{ padding: 8 }}>
                                        <div style={{ backgroundColor: 'var(--Neutrals-Neutrals50)', padding: 16, height: 50 }}>사용 가능한 수강권이 없습니다.</div>
                                    </Col>
                                }
                            </Row>
                        </div>
                    </div>
                </> : <div>예약자를 선택해주세요</div>}
            </div>
            <Divider style={{ margin: 0 }} />
            <Flex justify="space-between" style={{ marginTop: 20 }}>
                <Button onClick={() => onClickBeforeButton()}>이전</Button>
                <Button type="primary" onClick={() => {
                    if (!selectedTicketId) {
                        message.error("정기권이 선택되지 않았습니다. 예약을 진행하시겠습니까?");
                    }
                    createReservation()
                }}>예약 생성하기</Button>
            </Flex>
        </div>

    </>
}
export default CheckReservation