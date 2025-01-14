import { Button, Divider, Flex, Input, Modal, Radio, RadioChangeEvent, message } from "antd"
import { ChangeEvent, useState } from "react";
import dayjs from 'dayjs'
import { ticketValueEnToKr } from "@/entities/ticket/model";
import { useMutationCreateWellnessTicketPaymentUnpaid } from "@/entities/wellnessticketpayment/model";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useQueryClient } from "@tanstack/react-query";

interface IProps {
    wellnessTicketIssuance: IGetWellnessTicketIssuanceDetailByIdAdminResponseV1
}

const { TextArea } = Input;

const UnpaidWellnessTicketPayment = ({ wellnessTicketIssuance }: IProps) => {
    const queryClient = useQueryClient();
    const selectedCenterId = useSelector((state: RootState) => state.selectedCenterId)
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [cardPay, setCardPay] = useState<string>('');
    const [cashPay, setCashPay] = useState<string>('');
    const [isTotalCardPay, setIsTotalCardPay] = useState<boolean>(false);
    const [isTotalCashPay, setIsTotalCashPay] = useState<boolean>(false);
    const [isCardInstallment, setIsCardInstallment] = useState<boolean>(false);
    const [cardInstallment, setCardInstallment] = useState<string>('');
    const [note, setNote] = useState<string>('');
    const createMutation = useMutationCreateWellnessTicketPaymentUnpaid((res: any) => {
        if (res.data) {
            message.success("결제 성공했습니다.")
            setIsOpenModal(false)
            queryClient.invalidateQueries({ queryKey: ['getWellnessTicketIssuanceUpdateDetailById', selectedCenterId, wellnessTicketIssuance.id] })
        }
    });

    const onClickUpdateButton = () => {
        const request: ICreateWellnessTicketPaymentUnpaidAdminRequestV1 = {
            centerId: selectedCenterId,
            totalPayValue: wellnessTicketIssuance.unpaidValue,
            unpaidValue: wellnessTicketIssuance.unpaidValue - Number(cardPay.replaceAll(',', '')) - Number(cashPay.replaceAll(',', '')),
            cardInstallment: Number(cardInstallment),
            cardPayValue: Number(cardPay.replaceAll(',', '')),
            cashPayValue: Number(cashPay.replaceAll(',', '')),
            payerMemberId: wellnessTicketIssuance.memberId,
            note: note,
            wellnessTicketIssuanceId: wellnessTicketIssuance.id,

        }

        createMutation.mutate(request)
    }

    return (
        <>
            <Button type="primary" onClick={() => setIsOpenModal(true)}>결제</Button>
            <Modal
                title="수강권 결제"
                centered
                open={isOpenModal}
                onOk={() => setIsOpenModal(false)}
                onCancel={() => setIsOpenModal(false)}
                footer={null}
                width={'auto'}
            >

                <Flex gap={24} style={{ marginTop: 30, overflow: 'hidden' }}>
                    <div>
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
                                            const totalPrice = wellnessTicketIssuance.unpaidValue.toString();
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
                                            const totalPrice = wellnessTicketIssuance.unpaidValue.toString();
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
                        <div style={{ backgroundColor: 'var(--Neutrals-Neutrals50)', padding: 16, height: '95%', borderRadius: 8 }}>
                            <Flex vertical gap={30} justify="space-between" style={{ height: '100%', width: 300 }}>
                                <div>
                                    <div style={{ backgroundColor: 'white', padding: 24, border: '1px solid var(--Neutrals-Neutrals200)', borderRadius: 8 }}>
                                        <div className="body-hero-bold">{wellnessTicketIssuance.ticketName}</div>
                                        <div className="body-content-standard" style={{ color: 'var(--Neutrals-Neutrals700)' }}>{dayjs(wellnessTicketIssuance.startDate).format('YYYY-MM-DD')} - {dayjs(wellnessTicketIssuance.expireDate).format('YYYY-MM-DD')} ({dayjs(wellnessTicketIssuance.expireDate).diff(dayjs(wellnessTicketIssuance.startDate), "day")}일)</div>
                                        <div className="body-content-standard" style={{ color: "var(--Neutrals-Neutrals700)", marginTop: 24 }}>{ticketValueEnToKr(wellnessTicketIssuance.type)}</div>
                                    </div>
                                    <div style={{ marginTop: 20 }}>
                                        <div className="body-content-bold" style={{ color: "var(--Neutrals-Neutrals500)" }}>결제 금액</div>
                                        <div className="body-content-accent" style={{ marginTop: 8, color: 'var(--Neutrals-Neutrals500)' }}>{wellnessTicketIssuance.unpaidValue.toLocaleString("ko-KR")}원</div>
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
                                            {(wellnessTicketIssuance.unpaidValue - Number(cardPay.replaceAll(',', '')) - Number(cashPay.replaceAll(',', ''))).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
                                        </div>
                                    </div>
                                </div>
                                <Flex gap={16}>
                                    <Button onClick={() => setIsOpenModal(false)}>취소</Button>
                                    <Button
                                        type="primary"
                                        style={{ width: '100%' }}
                                        onClick={() => onClickUpdateButton()}>수정하기</Button>
                                </Flex>

                            </Flex>
                        </div>
                    </div>
                </Flex>
            </Modal>
        </>
    )
}

export default UnpaidWellnessTicketPayment