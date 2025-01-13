import { useMutationCreateReservation } from "@/entities/reservation/model"
import { ticketValueEnToKr } from "@/entities/ticket/model"
import { LectureStartTime } from "@/shared/utils/format/lectureStartTime"
import { RootState } from "@/store"
import { useQueryClient } from "@tanstack/react-query"
import { Button, Col, Divider, Flex, Row, Tag, message } from "antd"
import dayjs from 'dayjs'
import { useState } from "react"
import { useSelector } from "react-redux"

interface IProps {
    wellnessLectureDetail: IGetWellnessLectureDetailAdminResponseV1
    memberDetail: IGetAllMemberListByCenterIdAdminResponseV1 | undefined
    onClickBeforeButton: Function
    closeModal: Function
}

const CheckReservation = ({ wellnessLectureDetail, memberDetail, onClickBeforeButton, closeModal }: IProps) => {
    const queryClient = useQueryClient();
    const [selectedTicketId, setSelectedTicketId] = useState<number | undefined>(undefined);
    const selectedCenterId = useSelector((state: RootState) => state.selectedCenterId)
    const createMutation = useMutationCreateReservation((res: any) => {
        if (res.data) {
            message.success("수업 예약 성공하였습니다.")
            onClickBeforeButton();
            queryClient.invalidateQueries({ queryKey: ['getWellnessLectureDetailById', selectedCenterId, wellnessLectureDetail.id] })
        }
    })

    const onClickCreateButton = () => {
        if (!selectedTicketId) {
            if (!window.confirm("정기권 없이 예약을 진행하시겠습니까?")) {
                return;
            }
        }

        if (!memberDetail) return message.error("선택된 유저가 없습니다.");

        const request: ICreateReservationAdminRequestV1 = {
            centerId: selectedCenterId,
            memberId: memberDetail.id,
            wellnessLectureId: wellnessLectureDetail.id,
            wellnessTicketIssuanceId: selectedTicketId
        }
        createMutation.mutate(request)
        closeModal();
    }

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

                    <Flex gap={12} style={{ marginTop: 8 }}>
                        <div className="body-content-bold" style={{ width: 100, }}>수강권</div>
                        <div style={{ width: '100%', }}>
                            <div style={{ overflow: 'scroll' }}>
                                <Row>
                                    {memberDetail.wellnessTicketIssuanceList.length > 0 &&
                                        memberDetail.wellnessTicketIssuanceList
                                            .map((ticket: IWellnessTicketIssuance) => (
                                                <Col span={10} style={{ padding: 8 }} key={ticket.id}>
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
                                                        <div className="desktop-body-highlight-accent">
                                                            <Flex gap={8} style={{ marginTop: 12 }}>
                                                                <div className="body-caption-standardp" style={{ padding: '2px 8px', backgroundColor: 'var(--Neutrals-Neutrals100)', borderRadius: 4 }}>{ticket.remainingDate}일 남음</div>
                                                                <div className="body-caption-standardp" style={{ padding: '2px 8px', backgroundColor: 'var(--Neutrals-Neutrals100)', borderRadius: 4 }}>{ticket.remainingCnt}회 / {ticket.totalUsableCnt}회</div>
                                                            </Flex>
                                                            {ticket?.unpaidValue > 0 &&
                                                                <Tag bordered={false} color="error" className="body-caption-accent">미수금 {ticket.unpaidValue.toLocaleString("ko-KR")}원</Tag>
                                                            }
                                                        </div>
                                                    </div>
                                                </Col>
                                            ))
                                    }
                                    <Col span={10} style={{ padding: 8 }}>
                                        <div
                                            style={{
                                                border: !selectedTicketId ? '1px solid var(--Primary-Primary)' : '1px solid var(--Neutrals-Neutrals200)',
                                                padding: '8px 12px',
                                                cursor: 'pointer',
                                                borderRadius: 4
                                            }}
                                            onClick={() => setSelectedTicketId(undefined)}
                                        >
                                            <div className="body-caption-accent" style={{ color: "var(--Neutrals-Neutrals500)" }}>
                                                {'횟수권'}
                                            </div>
                                            <div
                                                className="desktop-body-content-bold"
                                                style={{ color: "var(--Primary-Primary)" }}
                                            >
                                                {'무료 예약'}
                                            </div>
                                            <div className="desktop-body-highlight-accent">
                                                <Flex gap={8} style={{ marginTop: 12 }}>
                                                    <div className="body-caption-standardp" style={{ padding: '2px 8px', backgroundColor: 'var(--Neutrals-Neutrals100)', borderRadius: 4 }}>무제한</div>
                                                </Flex>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Flex>
                </> : <div>예약자를 선택해주세요</div>}
            </div>
            <Divider style={{ margin: 0 }} />
            <Flex justify="space-between" style={{ marginTop: 20 }}>
                <Button onClick={() => onClickBeforeButton()}>이전</Button>
                <Button type="primary" onClick={() => onClickCreateButton()}>예약 생성하기</Button>
            </Flex>
        </div>

    </>
}
export default CheckReservation