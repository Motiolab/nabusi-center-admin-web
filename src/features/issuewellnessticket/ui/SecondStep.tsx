import { Button, DatePicker, Divider, Flex, Input, Radio, RadioChangeEvent, message } from "antd"
import { ChangeEvent, useState } from "react";
import { ticketValueEnToKr } from "@/entities/ticket/model";
import dayjs, { Dayjs } from "dayjs";
import { useMutationCreateWellnessTicketIssuance } from "@/entities/wellnessticketissuance/model";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useQueryClient } from "@tanstack/react-query";

interface IProps {
    wellnessTicket: IGetWellnessTicketAdminResponseV1
    setStep: (step: number) => void
    discountValue: number
    memberId: number
    setIsOpenModal: Function
}

const { TextArea } = Input;

const SecondStep = ({ wellnessTicket, setStep, discountValue, memberId, setIsOpenModal }: IProps) => {
    const queryClient = useQueryClient();
    const selectedCenterId = useSelector((state: RootState) => state.selectedCenterId)
    const [startDateTime, setStartDateTime] = useState<Dayjs | undefined>(dayjs());
    const [endDateTime, setEndDateTime] = useState<Dayjs | undefined>(dayjs().add(wellnessTicket.usableDate, "day"));
    const [totalUsableCnt, setTotalUsableCnt] = useState<number>(wellnessTicket.totalUsableCnt);
    const [limitType, setLimitType] = useState<string>(wellnessTicket.limitType)
    const [limitCnt, setLimitCnt] = useState<number>(wellnessTicket.limitCnt);
    const [cardPay, setCardPay] = useState<string>('');
    const [cashPay, setCashPay] = useState<string>('');
    const [isCardInstallment, setIsCardInstallment] = useState<boolean>(false);
    const [cardInstallment, setCardInstallment] = useState<string>('');
    const [isTotalCashPay, setIsTotalCashPay] = useState<boolean>(false);
    const [isTotalCardPay, setIsTotalCardPay] = useState<boolean>(false);
    const [note, setNote] = useState<string>('');

    const createMutation = useMutationCreateWellnessTicketIssuance((res: any) => {
        if (res.data) {
            message.success('수강권 발급이 완료되었습니다.')
            setStep(1)
            setIsOpenModal(false)
            queryClient.invalidateQueries({ queryKey: ['getMemberDetailById', selectedCenterId, memberId] })
            queryClient.invalidateQueries({ queryKey: ['getWellnessTicketIssuanceListByWellnessTicketId', selectedCenterId, wellnessTicket.id] })
        }
    })
    const calculateFinalPrice = (price: number, discountValue: number): number => {
        if (!price || discountValue < 0) return 0;
        return discountValue === 0 ? price : price - (price * (discountValue / 100));
    };

    const createWellnessTicketIssuance = () => {
        if (!startDateTime || !startDateTime.isValid()) return message.error('이용기간 시작일을 입력해주세요.')
        if (!endDateTime || !endDateTime.isValid()) return message.error('이용기간 종료일을 입력해주세요.')

        if (Number(cardPay) + Number(cashPay) === 0) {
            if (!window.confirm("결제 금액 없이 수강권을 발급하시겠습니까?")) {
                return;
            }
        }

        const request: ICreateWellnessTicketIssuanceAdminRequestV1 = {
            centerId: selectedCenterId,
            startDate: startDateTime.format("YYYY-MM-DDTHH:mm:00Z"),
            expireDate: endDateTime.format("YYYY-MM-DDTHH:mm:00Z"),
            limitType: limitType,
            limitCnt: limitCnt,
            totalUsableCnt: totalUsableCnt,
            memberId: memberId,
            wellnessTicketId: wellnessTicket.id,
            paymentMethod: "ON_SITE",
            discountRate: discountValue,
            totalPayValue: calculateFinalPrice(wellnessTicket.price, discountValue),
            unpaidValue: calculateFinalPrice(wellnessTicket.price, discountValue) - Number(cardPay.replaceAll(',', '')) - Number(cashPay.replaceAll(',', '')),
            cardInstallment: Number(cardInstallment),
            cardPayValue: Number(cardPay),
            cashPayValue: Number(cashPay),
            payerMemberId: memberId,
            note: note
        }
        createMutation.mutate(request)
    }

    return (
        <div>
            <Flex gap={24} style={{ marginTop: 30, overflow: 'hidden' }}>
                <div style={{ flex: 1 }}>
                    <div className="body-content-bold" style={{ color: 'var(--Neutrals-Neutrals500)' }}>수강권 설정</div>
                    <Flex align="center" style={{ marginTop: 16 }}>
                        <div style={{ width: 124 }}>이용 기간</div>
                        <DatePicker placeholder="시작일" value={startDateTime} onChange={(e) => setStartDateTime(e ? e.startOf('date') : undefined)} size="large" />
                        <div style={{ margin: 8 }}>-</div>
                        <DatePicker placeholder="종료일" value={endDateTime} onChange={(e) => setEndDateTime(e ? e.startOf('date') : undefined)} size="large" />
                        <div className="body-content-standard" style={{ margin: 8 }}>({endDateTime?.diff(startDateTime, "day")}일)</div>
                    </Flex>
                    <Flex align="center" style={{ marginTop: 16 }}>
                        <div style={{ width: 124 }}>사용 가능 횟수</div>
                        <Input
                            type="number"
                            style={{ width: "208px", height: 44 }}
                            value={totalUsableCnt}
                            min={0}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setTotalUsableCnt(Number(event.target.value))}
                        />
                        <div className="body-content-standard" style={{ marginLeft: 12 }}>회</div>
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
                    <Divider />
                    <div className="body-content-bold" style={{ color: 'var(--Neutrals-Neutrals500)' }}>결제 방법</div>
                    <Flex align="center" style={{ marginTop: 16 }}>
                        <div style={{ width: 124 }}>카드</div>
                        <Input
                            placeholder="금액을 입력해 주세요."
                            value={cardPay}
                            style={{ width: "208px", height: 44 }}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                const input = event.target.value;
                                const numericValue = input.replace(/[^0-9]/g, "");
                                const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                setCardPay(formattedValue);
                                setIsTotalCardPay(false);
                                setIsTotalCashPay(false);
                            }}
                        />
                        <div className="body-content-standard" style={{ marginLeft: 24 }}>원</div>
                        <div style={{ marginLeft: 24 }}>
                            <Radio
                                checked={isTotalCardPay}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        const totalPrice = calculateFinalPrice(wellnessTicket.price, discountValue).toString();
                                        const formattedValue = totalPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                        setCardPay(formattedValue)
                                        setCashPay('0')
                                        setIsTotalCardPay(e.target.checked)
                                        setIsTotalCashPay(false)
                                    }
                                }}>전액</Radio>
                        </div>
                    </Flex>
                    <Flex style={{ marginTop: 16 }} align="center">
                        <div style={{ width: 124 }}></div>
                        <Radio.Group
                            onChange={(e: RadioChangeEvent) => setIsCardInstallment(e.target.value)}
                            value={isCardInstallment}>
                            <Radio value={false}>일시불</Radio>
                            <Radio value={true}>할부</Radio>
                        </Radio.Group>
                        <Input
                            style={{ width: "60px", height: 44 }}
                            value={cardInstallment}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                const input = event.target.value;
                                let numericValue = input.replace(/[^0-9]/g, "");
                                if (Number(numericValue) > 99) {
                                    numericValue = '99'
                                }
                                setCardInstallment(numericValue);
                            }}
                            disabled={!isCardInstallment}
                        />
                        <span style={{ marginLeft: 12 }}>개월</span>
                    </Flex>
                    <Flex align="center" style={{ marginTop: 24 }}>
                        <div style={{ width: 124 }}>현금(계좌이체)</div>
                        <Input
                            placeholder="금액을 입력해 주세요."
                            value={cashPay}
                            style={{ width: "208px", height: 44 }}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                const input = event.target.value;
                                const numericValue = input.replace(/[^0-9]/g, "");
                                const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                setCashPay(formattedValue);
                                setIsTotalCardPay(false);
                                setIsTotalCashPay(false);
                            }}
                        />
                        <div className="body-content-standard" style={{ marginLeft: 24 }}>원</div>
                        <div style={{ marginLeft: 24 }}>
                            <Radio
                                checked={isTotalCashPay}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        const totalPrice = calculateFinalPrice(wellnessTicket.price, discountValue).toString();
                                        const formattedValue = totalPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                        setCashPay(formattedValue)
                                        setCardPay('0')
                                        setIsTotalCashPay(e.target.checked)
                                        setIsTotalCardPay(false)
                                        setIsCardInstallment(false)
                                        setCardInstallment('')
                                    }
                                }}>전액</Radio>
                        </div>
                    </Flex>
                    <Divider />

                    <Flex align="center" style={{ marginTop: 16 }}>
                        <div style={{ width: 124 }}>비고</div>
                        <TextArea
                            rows={3}
                            placeholder=""
                            style={{ width: 400 }}
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                        />
                    </Flex>
                </div>
                <div>
                    <div style={{ backgroundColor: 'var(--Neutrals-Neutrals50)', padding: 16, height: '90%', borderRadius: 8 }}>
                        <Flex vertical gap={30} justify="space-between" style={{ height: '100%', width: 300 }}>
                            {wellnessTicket ? <><div>
                                <div style={{ backgroundColor: 'white', padding: 24, border: '1px solid var(--Neutrals-Neutrals200)', borderRadius: 8 }}>
                                    <div className="body-hero-bold">{wellnessTicket.name}</div>
                                    {(startDateTime && endDateTime) && <div className="body-content-standard" style={{ color: 'var(--Neutrals-Neutrals700)' }}>{startDateTime.format('YYYY-MM-DD')} - {endDateTime.format('YYYY-MM-DD')} ({endDateTime.diff(startDateTime, "day")}일)</div>}
                                    <div className="body-content-standard" style={{ color: "var(--Neutrals-Neutrals700)", marginTop: 24 }}>{ticketValueEnToKr(wellnessTicket.type)}</div>
                                </div>
                                <div style={{ marginTop: 20 }}>
                                    <div className="body-content-bold" style={{ color: "var(--Neutrals-Neutrals500)" }}>결제 금액</div>
                                    <div className="body-content-accent" style={{ marginTop: 8, color: 'var(--Neutrals-Neutrals500)' }}><span style={{ textDecoration: 'line-through' }}>{wellnessTicket.price.toLocaleString("ko-KR")}원</span> {discountValue}%</div>
                                    <div className="desktop-body-highlight-accent" style={{ color: "var(--Neutrals-Neutrals700)", marginTop: 8 }}>
                                        {calculateFinalPrice(wellnessTicket.price, discountValue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
                                    </div>
                                </div>
                                <div style={{ marginTop: 20 }}>
                                    <div className="body-content-bold" style={{ color: "var(--Neutrals-Neutrals500)" }}>결제 완료</div>
                                    <div className="desktop-body-highlight-accent" style={{ color: "var(--Neutrals-Neutrals700)", marginTop: 8 }}>
                                        {(Number(cardPay.replaceAll(',', '')) + Number(cashPay.replaceAll(',', ''))).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
                                    </div>
                                </div>
                                <div style={{ marginTop: 20 }}>
                                    <div className="body-content-bold" style={{ color: "var(--Neutrals-Neutrals500)" }}>미수금</div>
                                    <div className="desktop-body-highlight-accent" style={{ color: "var(--Error-Error)", marginTop: 8 }}>
                                        {(calculateFinalPrice(wellnessTicket.price, discountValue) - Number(cardPay.replaceAll(',', '')) - Number(cashPay.replaceAll(',', ''))).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
                                    </div>
                                </div>
                            </div>
                                <Flex gap={16}>
                                    <Button onClick={() => setStep(1)}>이전</Button>
                                    <Button
                                        type="primary"
                                        style={{ width: '100%' }}
                                        onClick={() => createWellnessTicketIssuance()}>수강권 발급</Button>
                                </Flex>
                            </> : <div>수강권이 선택되지 않았습니다.</div>
                            }
                        </Flex>
                    </div>
                </div>
            </Flex>
        </div>
    )
}

export default SecondStep