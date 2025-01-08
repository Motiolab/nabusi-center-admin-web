import { useQueryGetAllMemberListByCenterId } from "@/entities/member/model";
import { RootState } from "@/store";
import { Button, DatePicker, Flex, Input, Table, message } from "antd";
import { useSelector } from "react-redux";
import styles from './styles.module.css'
import { ReactComponent as Search } from '@/assets/icon/Search.svg';
import TableMemberColumn from "./ui/TableMemberColumn";
import { ChangeEvent, useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs"
const { RangePicker } = DatePicker;

const Member = () => {
    const selectedCenterId = useSelector((state: RootState) => state.selectedCenterId)
    const { data: memberList } = useQueryGetAllMemberListByCenterId(selectedCenterId)
    const emptyText = <div className="body-content-standard" style={{ textAlign: "left", color: "var(--Base-Base-Black)" }}>해당 회원이 없습니다.</div>;
    const [period, setPeriod] = useState<[Dayjs | undefined, Dayjs | undefined]>([undefined, undefined]);
    const [searchText, setSearchText] = useState<string>('');
    const [remainingDateMin, setRemainingDateMin] = useState<string>('');
    const [remainingDateMax, setRemainingDateMax] = useState<string>('');
    const [remainingCntMin, setRemainingCntMin] = useState<string>('');
    const [remainingCntMax, setRemainingCntMax] = useState<string>('');
    const [applyFilterMemberList, setApplyFilterMemberList] = useState<IGetAllMemberListByCenterIdAdminResponseV1[]>([]);

    useEffect(() => {
        if (memberList) {
            setApplyFilterMemberList(memberList)
        }
    }, [memberList])

    const clickSearchButton = () => {
        if (!memberList) return message.error('회원 데이터가 없습니다.');

        setApplyFilterMemberList(
            memberList
                .filter((member: IGetAllMemberListByCenterIdAdminResponseV1) => remainingDateMin === '' || member.wellnessTicketIssuanceList.some((ticket: IWellnessTicketIssuance) => ticket.remainingDate >= Number(remainingDateMin)))
                .filter((member: IGetAllMemberListByCenterIdAdminResponseV1) => remainingDateMax === '' || member.wellnessTicketIssuanceList.some((ticket: IWellnessTicketIssuance) => ticket.remainingDate <= Number(remainingDateMax)))
                .filter((member: IGetAllMemberListByCenterIdAdminResponseV1) => remainingCntMin === '' || member.wellnessTicketIssuanceList.some((ticket: IWellnessTicketIssuance) => ticket.remainingCnt >= Number(remainingCntMin)))
                .filter((member: IGetAllMemberListByCenterIdAdminResponseV1) => remainingCntMax === '' || member.wellnessTicketIssuanceList.some((ticket: IWellnessTicketIssuance) => ticket.remainingCnt <= Number(remainingCntMax)))
                .filter((member: IGetAllMemberListByCenterIdAdminResponseV1) => period[0] === undefined || period[1] === undefined || (dayjs(member.createdDate).isAfter(period[0].startOf('date')) && dayjs(member.createdDate).isBefore(period[1].endOf('date'))))
                .filter((member: IGetAllMemberListByCenterIdAdminResponseV1) => searchText === '' || member.mobile.includes(searchText) || member.name.includes(searchText))
        );
    }

    return <>
        <div style={{ backgroundColor: 'white', padding: 24 }}>
            <Flex>
                <div style={{ flex: 1 }}>
                    <Flex gap={24} align="center">
                        <div className="body-content-bold" style={{ width: 110 }}>수강권 잔여 기간</div>
                        <div>
                            <Flex gap={12} align="center">
                                <div>
                                    <Input
                                        style={{ width: "88px", backgroundColor: "var(--Base-Base-White)" }}
                                        value={remainingDateMin}
                                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                            if (/^\d*$/.test(event.target.value)) {
                                                setRemainingDateMin(event.target.value)
                                            } else {
                                                message.error("숫자만 입력 가능합니다.")
                                            }
                                        }}
                                        size="large"
                                    />
                                </div>
                                <div>일 이상</div>
                                <div>
                                    <Input
                                        style={{ width: "88px", backgroundColor: "var(--Base-Base-White)" }}
                                        value={remainingDateMax}
                                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                            if (/^\d*$/.test(event.target.value)) {
                                                setRemainingDateMax(event.target.value)
                                            } else {
                                                message.error("숫자만 입력 가능합니다.")
                                            }
                                        }}
                                        size="large"
                                    />
                                </div>
                                <div>일 이하</div>
                            </Flex>
                        </div>
                    </Flex>
                    <Flex gap={24} align="center" style={{ marginTop: 24 }}>
                        <div className="body-content-bold" style={{ width: 110 }}>검색</div>
                        <div>
                            <Input
                                placeholder="이름 또는 휴대번호 검색"
                                prefix={<Search />}
                                style={{ width: "370px", backgroundColor: "var(--Base-Base-White)" }}
                                value={searchText}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => setSearchText(event.target.value)}
                                size="large"
                            />
                        </div>
                    </Flex>
                </div>
                <div style={{ flex: 1 }}>
                    <Flex gap={24} align="center">
                        <div className="body-content-bold" style={{ width: 110 }}>수강권 잔여 횟수</div>
                        <Flex gap={12} align="center">
                            <div>
                                <Input
                                    style={{ width: "88px", backgroundColor: "var(--Base-Base-White)" }}
                                    value={remainingCntMin}
                                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                        if (/^\d*$/.test(event.target.value)) {
                                            setRemainingCntMin(event.target.value)
                                        } else {
                                            message.error("숫자만 입력 가능합니다.")
                                        }
                                    }}
                                    size="large"
                                />
                            </div>
                            <div>회 이상</div>
                            <div>
                                <Input
                                    style={{ width: "88px", backgroundColor: "var(--Base-Base-White)" }}
                                    value={remainingCntMax}
                                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                        if (/^\d*$/.test(event.target.value)) {
                                            setRemainingCntMax(event.target.value)
                                        } else {
                                            message.error("숫자만 입력 가능합니다.")
                                        }
                                    }}
                                    size="large"
                                />
                            </div>
                            <div>회 이하</div>
                        </Flex>
                    </Flex>
                    <Flex gap={24} align="center" style={{ marginTop: 24 }}>
                        <div className="body-content-bold" style={{ width: 110 }}>센터 등록일</div>
                        <div>
                            <RangePicker
                                value={period}
                                onChange={(i) => (i && i[0] && i[1]) && setPeriod([i[0], i[1]])}
                                size="large"
                            />
                        </div>
                    </Flex>
                </div>
            </Flex>
            <div style={{ marginTop: 24 }}>
                <Button type="primary" onClick={clickSearchButton}>검색하기</Button>
            </div>
        </div>
        <div style={{ padding: 24, backgroundColor: 'white', marginTop: 24 }}>
            {memberList && <>
                <Table
                    style={{ marginTop: 20 }}
                    columns={TableMemberColumn}
                    dataSource={applyFilterMemberList.map((e, idx) => ({ ...e, key: idx }))}
                    pagination={{
                        position: ["bottomCenter"],
                        className: styles.tablePagenation
                    }}
                    locale={{ emptyText }}
                />
            </>}
        </div>
    </>
}

export default Member