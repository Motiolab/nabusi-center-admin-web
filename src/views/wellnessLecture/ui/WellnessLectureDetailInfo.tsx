import { formatTimeRange } from "@/shared/utils/format/timeRange"
import { Button, Flex, Input, Popover, Table } from "antd"
import { ReactComponent as Info } from '@/assets/icon/Info.svg';
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowRight } from '@/assets/icon/ArrowRight.svg';
import DeleteWellnessLecture from "@/features/deleteWellnessLecture";
import RestoreWellnessLecture from "@/features/restorewellnesslecture";
import { ReactComponent as Search } from '@/assets/icon/Search.svg';
import { ChangeEvent, useState } from "react";
import styles from './styles.module.css'
import CreateReservation from "@/features/createreservation";

interface IProps {
    wellnessLectureDetail: IGetWellnessLectureDetailAdminResponseV1
}
const WellnessLectureDetailInfo = ({ wellnessLectureDetail }: IProps) => {
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState<string>('')
    const emptyText = <div className="body-content-standard" style={{ textAlign: "left", color: "var(--Base-Base-Black)" }}>해당 수업 예약자가 없습니다.</div>;

    return <>
        <div style={{ padding: 24, backgroundColor: 'white' }}>
            <Flex>
                <div style={{ flex: 1 }}>
                    <Flex gap={16} style={{ alignItems: 'center' }}>
                        <div className="body-content-bold" style={{ width: 124 }}>수업명</div>
                        <div>{wellnessLectureDetail.name}</div>
                    </Flex>
                    <Flex gap={16} style={{ alignItems: 'center', marginTop: 20 }}>
                        <div className="body-content-bold" style={{ width: 124 }}>담당강사</div>
                        <Link
                            to={`/teacher/detail/${wellnessLectureDetail.teacherId}`}
                            style={{ textDecorationLine: "none", color: "var(--Base-Base-Black)" }}>
                            <Flex align="center">
                                <div>{wellnessLectureDetail.teacherName}</div>
                                <ArrowRight style={{ width: 16, height: 16 }} />
                            </Flex>
                        </Link>
                    </Flex>
                    <Flex gap={16} style={{ alignItems: 'center', marginTop: 20 }}>
                        <div className="body-content-bold" style={{ width: 124 }}>수업일</div>
                        <div>{formatTimeRange(wellnessLectureDetail.startDateTime, wellnessLectureDetail.endDateTime)}</div>
                    </Flex>
                    <Flex gap={16} style={{ alignItems: 'center', marginTop: 20 }}>
                        <div className="body-content-bold" style={{ width: 124 }}>수업 소개</div>
                        <div>{wellnessLectureDetail.description}</div>
                    </Flex>
                </div>
                <div style={{ flex: 1 }}>
                    <Flex gap={16} style={{ alignItems: 'center' }}>
                        <div className="body-content-bold" style={{ width: 124 }}>수업종류</div>
                        <Flex align="center" gap={5}>
                            <div>{wellnessLectureDetail.wellnessLectureTypeName}</div>
                            <Popover content={<div>{wellnessLectureDetail.wellnessLectureTypeDescription}</div>} title={'설명'}>
                                <Info />
                            </Popover>
                        </Flex>
                    </Flex>
                    <Flex gap={16} style={{ alignItems: 'center', marginTop: 20 }}>
                        <div className="body-content-bold" style={{ width: 124 }}>수업장소</div>
                        <div>{wellnessLectureDetail.room}</div>
                    </Flex>
                    <Flex gap={16} style={{ alignItems: 'center', marginTop: 20 }}>
                        <div className="body-content-bold" style={{ width: 124 }}>정원</div>
                        <div>{wellnessLectureDetail.maxReservationCnt}명</div>
                    </Flex>
                    <Flex gap={16} style={{ alignItems: 'center', marginTop: 20 }}>
                        <div className="body-content-bold" style={{ width: 124 }}>진행여부</div>
                        <div>{!wellnessLectureDetail.isDelete ? <div className='body-caption-accent' style={{ textAlign: 'center', color: "var(--Primary-Primary)", backgroundColor: "var(--Primary-Primary50)", border: "1px solid var(--Primary-Primary)", borderRadius: "var(--Radiuss)", padding: 'var(--Spacingxxs) var(--Spacings) var(--Spacingxxs) var(--Spacings)', width: "37px" }}>진행</div> : <div className='body-caption-accent' style={{ textAlign: 'center', color: "var(--Error-Error)", backgroundColor: "var(--Error-Error50)", border: "1px solid var(--Error-Error)", borderRadius: "var(--Radiuss)", padding: 'var(--Spacingxxs) var(--Spacings) var(--Spacingxxs) var(--Spacings)', width: "49px" }}>폐강</div>}</div>
                    </Flex>
                </div>
            </Flex >
            <Flex gap={16} style={{ alignItems: 'center', marginTop: 20 }}>
                <div className="body-content-bold" style={{ width: 124 }}>예약 가능 정기권</div>
                <div>
                    <Flex>
                        {wellnessLectureDetail.wellnessTicketAvailableList.map((ticket: IWellnessTicketAvailable) => {
                            return <div className="body-caption-standardp" style={{ backgroundColor: ticket.backgroundColor, color: ticket.textColor, borderRadius: 4, padding: '2px 8px', marginRight: 8 }}>{ticket.wellnessTicketIssuanceName}</div>
                        })}
                    </Flex>
                </div>
            </Flex>
            <Flex gap={16} style={{ alignItems: 'center', marginTop: 20 }}>
                <div className="body-content-bold" style={{ width: 124 }}>수업 이미지</div>
                <div>
                    {wellnessLectureDetail.lectureImageUrlList.length > 0 ? <Flex>
                        {wellnessLectureDetail.lectureImageUrlList.map((imageUrl: string) => {
                            return <img src={imageUrl} className="body-caption-standardp" style={{ marginRight: 8 }} alt="수업 이미지" />
                        })}
                    </Flex>
                        : <div> 수업 이미지가 없습니다.</div>
                    }
                    {wellnessLectureDetail.lectureImageUrlList}</div>
            </Flex>
            <div style={{ textAlign: 'right' }}>
                {wellnessLectureDetail.isDelete ?
                    <RestoreWellnessLecture centerId={wellnessLectureDetail.centerId} id={wellnessLectureDetail.id} /> :
                    <DeleteWellnessLecture centerId={wellnessLectureDetail.centerId} id={wellnessLectureDetail.id} />}
                <Button style={{ marginLeft: 18 }} color="primary" variant="outlined" onClick={() => navigate(`/wellness-lecture/update/${wellnessLectureDetail.id}`)}>수정하기</Button>
            </div>
        </div>

        <div style={{ marginTop: 24, padding: 24, backgroundColor: 'white' }}>
            <Flex justify="space-between">
                <Flex align="center" gap={24}>
                    <div className="body-content-accent">예약자 (0)</div>
                    <CreateReservation wellnessLectureDetail={wellnessLectureDetail} />
                </Flex>
                <Input
                    placeholder="이름 또는 휴대번호 검색"
                    prefix={<Search />}
                    style={{ width: "370px", backgroundColor: "var(--Base-Base-White)" }}
                    value={searchText}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setSearchText(event.target.value)}
                    size="large"
                />
            </Flex>
            <Table
                style={{ marginTop: 20 }}
                columns={[
                    { title: "no.", dataIndex: "", className: styles.tableColumnStyle + " body-content-standard", render: (_: number, __: any, index: number) => index + 1 },
                    {
                        title: "회원명", dataIndex: "memberName", className: styles.tableColumnStyle + " body-content-standard", render: (value: string, record: IGetWellnessLectureAdminResponseV1) => {
                            return <>
                                <Link
                                    to={`/member/detail/${record.id}`}
                                    style={{ textDecorationLine: "none", color: "var(--Base-Base-Black)" }}>
                                    {value}
                                </Link>
                            </>
                        }
                    },
                    {
                        title: "휴대폰번호", dataIndex: "mobile", className: styles.tableColumnStyle + " body-content-accent"
                    },
                    {
                        title: "예약 정기권", dataIndex: "wellnessTicketIssuance", className: styles.tableColumnStyle + " body-content-accent"
                    },
                    {
                        title: "상태", dataIndex: "status", className: styles.tableColumnStyle + " body-content-accent"
                    },
                    {
                        title: "회원 메모", dataIndex: "memberMemo", className: styles.tableColumnStyle + " body-content-accent"
                    },
                    {
                        title: "예약 일시", dataIndex: "reservationDateTime", className: styles.tableColumnStyle + " body-content-accent"
                    }
                ]}
                // dataSource={wellnessLectureList.filter((i) => i.name.includes(searchText) || i.teacherName.includes(searchText)).map((e, idx) => ({ ...e, key: idx }))}
                locale={{ emptyText }}
                pagination={{
                    position: ["bottomCenter"],
                    className: styles.tablePagenation
                }}
            />
        </div>

    </>
}

export default WellnessLectureDetailInfo