import { useMutationUpdateWellnessTicketIssuance, useQueryGetWellnessTicketIssuanceUpdateDetailById } from "@/entities/wellnessticketissuance/model";
import CustomColorPicker from "@/shared/ui/CustomColorPicker";
import { RootState } from "@/store";
import { useQueryClient } from "@tanstack/react-query";
import { Button, DatePicker, Divider, Flex, Input, Radio, RadioChangeEvent, Switch, message } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import UnpaidWellnessTicketPayment from "./ui/UnpaidWellnessTicketPayment";

const WellnessTicketIssuanceUpdate = () => {
    const queryClient = useQueryClient();
    const { id } = useParams();
    const numericId = id ? parseInt(id, 10) : undefined;
    const navigate = useNavigate();
    const [name, setName] = useState<string>('');
    const selectedCenterId = useSelector((state: RootState) => state.selectedCenterId)
    const [backgroundColor, setBackgroundColor] = useState<string>('#00000095');
    const [type, setType] = useState<string>('');
    const [startDate, setStartDate] = useState<Dayjs | undefined>(undefined);
    const [expireDate, setExpireDate] = useState<Dayjs | undefined>(undefined);
    const [remainingCnt, setRemainingCnt] = useState<number>(1);
    const [limitType, setLimitType] = useState<string>('NONE')
    const [limitCnt, setLimitCnt] = useState<number>(0);
    const [isDelete, setIsDelete] = useState<boolean>(false);

    const { data: wellnessTicketIssuance } = useQueryGetWellnessTicketIssuanceUpdateDetailById(selectedCenterId, numericId as number);

    const updateMutation = useMutationUpdateWellnessTicketIssuance((res: any) => {
        if (res.data) {
            message.success('발급 수강권 수정 완료되었습니다.')
            navigate(-1);
            queryClient.invalidateQueries({ queryKey: ['getWellnessTicketIssuanceListByWellnessTicketId', selectedCenterId, wellnessTicketIssuance?.wellnessTicketId] })
            queryClient.invalidateQueries({ queryKey: ['getWellnessTicketIssuanceUpdateDetailById', selectedCenterId, wellnessTicketIssuance?.id] })
            queryClient.invalidateQueries({ queryKey: ['getMemberDetailById', selectedCenterId, numericId as number] })
        }
    })

    useEffect(() => {
        if (wellnessTicketIssuance) {
            setName(wellnessTicketIssuance.ticketName)
            setBackgroundColor(wellnessTicketIssuance.backgroundColor)
            setType(wellnessTicketIssuance.type)
            setStartDate(dayjs(wellnessTicketIssuance.startDate))
            setExpireDate(dayjs(wellnessTicketIssuance.expireDate))
            setRemainingCnt(wellnessTicketIssuance.remainingCnt)
            setLimitType(wellnessTicketIssuance.limitType)
            setLimitCnt(wellnessTicketIssuance.limitCnt)
            setIsDelete(wellnessTicketIssuance.isDelete)
        }
    }, [wellnessTicketIssuance])

    const onClickUpdateButton = () => {
        if (!numericId) return message.error('발급 수강권 ID가 선택되지 않았습니다.')
        if (!startDate || !startDate.isValid()) return message.error('이용기간 시작일을 입력해주세요.')
        if (!expireDate || !expireDate.isValid()) return message.error('이용기간 종료일을 입력해주세요.')

        const request: IUpdateWellnessTicketIssuanceAdminRequestV1 = {
            id: numericId,
            centerId: selectedCenterId,
            name,
            backgroundColor,
            textColor: '#FFFFFF',
            type,
            startDate: startDate.format("YYYY-MM-DDTHH:mm:00Z"),
            expireDate: expireDate.format("YYYY-MM-DDTHH:mm:00Z"),
            remainingCnt,
            limitType,
            limitCnt,
            isDelete
        }
        updateMutation.mutate(request)
    }

    return (
        <div style={{ backgroundColor: 'white', padding: 24 }}>
            <div>발급 수강권 수정</div>
            <Divider />
            <Flex gap={12}>
                <div className="body-content-standard" style={{ width: 100 }}>이름</div>
                <div className="body-content-standard" style={{ color: 'var(--Neutrals-Neutrals700)' }}>{wellnessTicketIssuance?.memberName}</div>
            </Flex>
            <Flex gap={12} style={{ marginTop: 20 }}>
                <div className="body-content-standard" style={{ width: 100 }}>휴대폰번호</div>
                <div className="body-content-standard" style={{ color: 'var(--Neutrals-Neutrals700)' }}>{wellnessTicketIssuance?.mobile}</div>
            </Flex>

            <Flex align="center" style={{ marginTop: 16 }}>
                <div style={{ width: 124 }}>수강권명</div>
                <Input
                    placeholder="수강권 명을 입력해 주세요"
                    style={{ width: "208px", height: 44 }}
                    value={name}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
                />
            </Flex>
            <Flex align="center" style={{ marginTop: 16 }}>
                <div style={{ width: 124 }}>색상</div>
                <CustomColorPicker value={backgroundColor} setValue={(value) => setBackgroundColor(value)} />
            </Flex >
            <Flex align="center" style={{ marginTop: 16 }}>
                <div style={{ width: 124 }}>수강권 종류</div>
                <Radio.Group onChange={(e: RadioChangeEvent) => setType(e.target.value)} value={type}>
                    <Radio value={'COUNT'}>횟수권</Radio>
                    <Radio value={'PERIOD'}>기간권</Radio>
                </Radio.Group>
            </Flex>
            <Flex align="center" style={{ marginTop: 16 }}>
                <div style={{ width: 124 }}>사용 기간</div>
                <DatePicker placeholder="시작일" value={startDate} onChange={(e) => setStartDate(e ? e.startOf('date') : undefined)} size="large" />
                <div style={{ margin: 8 }}>-</div>
                <DatePicker placeholder="종료일" value={expireDate} onChange={(e) => setExpireDate(e ? e.startOf('date') : undefined)} size="large" />
                {(startDate && expireDate) && <div className="body-content-standard" style={{ color: 'var(--Neutrals-Neutrals700)', margin: 8 }}>({expireDate.diff(startDate, "day")}일)</div>}
            </Flex>
            <Flex align="center" style={{ marginTop: 16 }}>
                <div style={{ width: 124 }}>사용 가능 횟수</div>
                <Input
                    type="number"
                    style={{ width: "208px", height: 44 }}
                    value={remainingCnt}
                    min={0}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setRemainingCnt(Number(event.target.value))}
                />
                <div style={{ marginLeft: 12 }}>회</div>

                {wellnessTicketIssuance && <div className="body-caption-standardp" style={{ padding: '2px 8px', backgroundColor: 'var(--Neutrals-Neutrals100)', borderRadius: 4, marginLeft: 8 }}>총 사용 가능 횟수 : {wellnessTicketIssuance?.totalUsableCnt - (wellnessTicketIssuance?.totalUsableCnt - remainingCnt)}회</div>}

            </Flex>
            <div style={{ marginTop: 16 }}>
                <Flex align="start" >
                    <div style={{ width: 124 }}>이용 제한</div>
                    <div>
                        <Radio.Group onChange={(e: RadioChangeEvent) => setLimitType(e.target.value)} value={limitType}>
                            <Radio value={'WEEK'}>주간</Radio>
                            <Radio value={'MONTH'}>월간</Radio>
                            <Radio value={'NONE'}>이용 제한 없음</Radio>
                        </Radio.Group>
                    </div>
                </Flex>
                <div style={{ marginLeft: 124, marginTop: 16 }}>
                    <div style={{ marginTop: 16 }}>
                        <Input
                            type="number"
                            style={{ width: "160px", height: 44 }}
                            value={limitCnt}
                            min={0}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setLimitCnt(Number(event.target.value))}
                            disabled={limitType === 'NONE'}
                        />
                        <span style={{ marginLeft: 12 }}>회 이용 가능</span>
                    </div>
                </div>
            </div>
            {wellnessTicketIssuance && wellnessTicketIssuance.unpaidValue > 0 && <>
                <Flex align="center" style={{ marginTop: 16 }}>
                    <div style={{ width: 124 }}>미수금</div>
                    <div className="desktop-body-highlight-accent" style={{ color: "var(--Error-Error)" }}>
                        {wellnessTicketIssuance.unpaidValue.toLocaleString("ko-KR")}원
                    </div>
                    <div style={{ marginLeft: 24 }}>
                        {wellnessTicketIssuance && <UnpaidWellnessTicketPayment wellnessTicketIssuance={wellnessTicketIssuance} />}
                    </div>
                </Flex>
            </>}
            <Flex align="center" style={{ marginTop: 16 }}>
                <div style={{ width: 124 }}>사용 가능</div>
                <div style={{ marginTop: 8 }}>
                    <Switch checked={!isDelete} onChange={(e) => setIsDelete(!e)} />
                </div>
            </Flex>
            <Divider />
            <Flex justify="space-between">
                <Button onClick={() => navigate(-1)}>취소</Button>
                <Button type="primary" onClick={() => onClickUpdateButton()}>수정하기</Button>
            </Flex>
        </div>
    )
}

export default WellnessTicketIssuanceUpdate