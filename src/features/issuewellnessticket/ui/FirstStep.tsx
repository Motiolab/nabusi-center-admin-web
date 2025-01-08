import { Button, Col, Flex, Input, Row } from "antd"
import { ReactComponent as Search } from '@/assets/icon/Search.svg';
import { ChangeEvent, useEffect, useState } from "react";
import { ticketValueEnToKr } from "@/entities/ticket/model";

interface IProps {
    wellnessTicketList: IGetWellnessTicketAdminResponseV1[]
    onClickNextButton: (step: number, discountValue: number, selectedTicket: IGetWellnessTicketAdminResponseV1) => void
}

const FirstStep = ({ wellnessTicketList, onClickNextButton }: IProps) => {
    const [searchText, setSearchText] = useState<string>("");
    const [selectedTicket, setSelectedTicket] = useState<IGetWellnessTicketAdminResponseV1>(wellnessTicketList[0]);
    const [discountValue, setDiscountValue] = useState<number>(0);

    useEffect(() => {
        if (!selectedTicket) return;
        setDiscountValue(selectedTicket.discountValue)
    }, [selectedTicket])

    const calculateFinalPrice = (price: number, discountValue: number): number => {
        if (!price || discountValue < 0) return 0;
        return discountValue === 0 ? price : price - (price * (discountValue / 100));
    };

    return (
        <div>
            <Flex gap={24} style={{ marginTop: 30, overflow: 'hidden' }}>
                <div style={{ flex: 2 }}>
                    <div style={{ paddingInline: 8 }}>
                        <Input
                            placeholder="수강권명 검색"
                            prefix={<Search />}
                            style={{ width: '100%', backgroundColor: "var(--Base-Base-White)" }}
                            value={searchText}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setSearchText(event.target.value)}
                            size="large"
                        />
                    </div>
                    <div style={{ maxHeight: 640, overflow: 'scroll' }}>
                        <Row>
                            {wellnessTicketList.length > 0 ?
                                wellnessTicketList
                                    .map((ticket: IGetWellnessTicketAdminResponseV1) => (
                                        <Col span={8} style={{ padding: 8 }} key={ticket.id}>
                                            <div
                                                style={{
                                                    border: selectedTicket && ticket.id === selectedTicket.id ? '1px solid var(--Primary-Primary)' : '1px solid var(--Neutrals-Neutrals200)',
                                                    padding: '8px 12px',
                                                    cursor: 'pointer',
                                                    borderRadius: 4
                                                }}
                                                onClick={() => setSelectedTicket(ticket)}
                                            >
                                                <div className="body-caption-accent" style={{ color: "var(--Neutrals-Neutrals500)" }}>
                                                    {ticketValueEnToKr(ticket.type)}
                                                </div>
                                                <div
                                                    className="desktop-body-content-bold"
                                                    style={{ color: selectedTicket && ticket.id === selectedTicket.id ? "var(--Primary-Primary)" : "var(--Neutrals-Neutrals700)" }}
                                                >
                                                    {ticket.name}
                                                </div>
                                                <div className="body-caption-standard" style={{ color: "var(--Neutrals-Neutrals700)", marginTop: 8 }}>
                                                    {ticket.price.toLocaleString("ko-KR")}원
                                                </div>
                                            </div>
                                        </Col>
                                    ))
                                : <Col span={24} style={{ padding: 8 }}>
                                    <div style={{ backgroundColor: 'var(--Neutrals-Neutrals50)', padding: 16, width: '100%', height: 200 }}>활성화된 수강권이 없습니다</div>
                                </Col>
                            }
                        </Row>
                    </div>
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{ backgroundColor: 'var(--Neutrals-Neutrals50)', padding: 16, height: '90%', borderRadius: 8 }}>
                        <Flex vertical gap={30} justify="space-between" style={{ height: '100%' }}>
                            {selectedTicket ? <><div>
                                <div style={{ backgroundColor: 'white', padding: 24, border: '1px solid var(--Neutrals-Neutrals200)', borderRadius: 8 }}>
                                    <div className="body-hero-bold">{selectedTicket.name}</div>
                                    <div className="body-content-standard" style={{ color: "var(--Neutrals-Neutrals700)", marginTop: 24 }}>{ticketValueEnToKr(selectedTicket.type)}</div>
                                </div>
                                <div style={{ marginTop: 20 }}>
                                    <div className="body-content-bold" style={{ color: "var(--Neutrals-Neutrals500)" }}>판매가</div>
                                    <div className="desktop-body-highlight-accent" style={{ marginTop: 8 }}>{selectedTicket.price.toLocaleString("ko-KR")}원</div>
                                </div>
                                <div style={{ marginTop: 20 }}>
                                    <div className="body-content-bold" style={{ color: "var(--Neutrals-Neutrals500)" }}>할인</div>
                                    <Flex align="center" style={{ marginTop: 8 }}>
                                        <Input
                                            type="number"
                                            style={{ width: "208px", height: 44 }}
                                            min={0}
                                            value={discountValue}
                                            max={100}
                                            onChange={(event: ChangeEvent<HTMLInputElement>) => setDiscountValue(Number(event.target.value))}
                                        />
                                        <div className="body-content-standard" style={{ marginLeft: 12, color: "var(--Neutrals-Neutrals700)" }}>%</div>
                                    </Flex>
                                </div>
                            </div>
                                <Button type="primary" onClick={() => onClickNextButton(2, discountValue, selectedTicket)}>수강권 결제 (총 {calculateFinalPrice(selectedTicket.price, discountValue).toLocaleString("ko-KR")}원)</Button>
                            </> : <div>수강권이 선택되지 않았습니다.</div>}
                        </Flex>
                    </div>
                </div>
            </Flex>
        </div>
    )
}

export default FirstStep