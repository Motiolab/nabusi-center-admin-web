import { ticketValueEnToKr } from "@/entities/ticket/model"
import { Flex } from "antd"

interface IProps {
    wellnessTicketDetail: IGetWellnessTicketDetailAdminResponseV1
}

const WellnessTicketDetailInfo = ({ wellnessTicketDetail }: IProps) => {
    return <>
        <div style={{ padding: 24 }}>
            <Flex>
                <div style={{ flex: 1 }}>
                    <Flex gap={16} style={{ alignItems: 'center' }}>
                        <div className="body-content-bold" style={{ width: 124 }}>수강권명</div>
                        <div>{wellnessTicketDetail.name}</div>
                    </Flex>
                    <Flex gap={16} style={{ alignItems: 'center', marginTop: 20 }}>
                        <div className="body-content-bold" style={{ width: 124 }}>판매가</div>
                        <div>{wellnessTicketDetail.salesPrice}원</div>
                    </Flex>
                    <Flex gap={16} style={{ alignItems: 'center', marginTop: 20 }}>
                        <div className="body-content-bold" style={{ width: 124 }}>사용 가능 횟수</div>
                        <div>{wellnessTicketDetail.totalUsableCnt}회</div>
                    </Flex>
                    <Flex gap={16} style={{ alignItems: 'center', marginTop: 20 }}>
                        <div className="body-content-bold" style={{ width: 124 }}>예약 가능 수업 종류</div>
                        {wellnessTicketDetail.wellnessClassNameList.map((e: IGetWellnessClassIdAndName) => <>
                            <div style={{ padding: '2px 8px', borderRadius: 'var(--BorderRadiuss)', backgroundColor: 'var(--Neutrals-Neutrals100)' }}>
                                <div className="body-caption-standardp">{e.name}</div>
                            </div>
                        </>)}
                    </Flex>
                </div>
                <div style={{ flex: 1 }}>
                    <Flex gap={16} style={{ alignItems: 'center' }}>
                        <div className="body-content-bold" style={{ width: 124 }}>수강권 종류</div>
                        <div>{ticketValueEnToKr(wellnessTicketDetail.type)}</div>
                    </Flex>
                    <Flex gap={16} style={{ alignItems: 'center', marginTop: 20 }}>
                        <div className="body-content-bold" style={{ width: 124 }}>사용 기한</div>
                        <div>{wellnessTicketDetail.usableDate}일</div>
                    </Flex>
                    <Flex gap={16} style={{ alignItems: 'center', marginTop: 20 }}>
                        <div className="body-content-bold" style={{ width: 124 }}>이용 제한</div>
                        <div>
                            {wellnessTicketDetail.limitType === 'NONE' ?
                                ticketValueEnToKr(wellnessTicketDetail.limitType) :
                                `${ticketValueEnToKr(wellnessTicketDetail.limitType)} ${wellnessTicketDetail.limitCnt}일`}
                        </div>
                    </Flex>
                    <Flex gap={16} style={{ alignItems: 'center', marginTop: 20 }}>
                        <div className="body-content-bold" style={{ width: 124 }}>상태</div>
                        <div>{wellnessTicketDetail.isDelete ?
                            <div className='body-caption-accent' style={{ color: "var(--Error-Error)", backgroundColor: "var(--Error-Error50)", border: "1px solid var(--Error-Error)", borderRadius: "var(--Radiuss)", padding: 'var(--Spacingxxs) var(--Spacings) var(--Spacingxxs) var(--Spacings)', width: "49px" }}>판매정지</div> :
                            <div className='body-caption-accent' style={{ color: "var(--Primary-Primary)", backgroundColor: "var(--Primary-Primary50)", border: "1px solid var(--Primary-Primary)", borderRadius: "var(--Radiuss)", padding: 'var(--Spacingxxs) var(--Spacings) var(--Spacingxxs) var(--Spacings)', width: "37px" }}>판매중</div>}
                        </div>
                    </Flex>
                </div>
            </Flex>
        </div>
    </>
}

export default WellnessTicketDetailInfo;