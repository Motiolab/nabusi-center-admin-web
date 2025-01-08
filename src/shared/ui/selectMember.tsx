import { Button, Input, Table, TableProps, message } from "antd"
import { ReactComponent as Search } from '@/assets/icon/Search.svg';
import styles from './styles.module.css'
import { ChangeEvent, useState } from "react";
import { useQueryGetAllMemberListByCenterId } from "@/entities/member/model";
import { RootState } from "@/store";
import { useSelector } from "react-redux";


interface DataType extends IGetAllMemberListByCenterIdAdminResponseV1 {
    key: React.Key;
}

interface IProps {
    onClickNextButton: Function
    setSelectedMember: Function
    selectedMember: IGetAllMemberListByCenterIdAdminResponseV1 | undefined
}

const SelectMember = ({ onClickNextButton, selectedMember, setSelectedMember }: IProps) => {
    const selectedCenterId = useSelector((state: RootState) => state.selectedCenterId)
    const [searchText, setSearchText] = useState<string>('')
    const { data: memberList } = useQueryGetAllMemberListByCenterId(selectedCenterId)
    const emptyText = <div className="body-content-standard" style={{ textAlign: "left", color: "var(--Base-Base-Black)" }}>회원이 없습니다.</div>;

    const rowSelection: TableProps<DataType>['rowSelection'] = {
        onChange: (_: React.Key[], selectedRows: DataType[]) => {
            setSelectedMember(selectedRows[0])
        },
    };

    return (
        <>
            <Input
                placeholder="이름 또는 휴대번호 검색"
                prefix={<Search />}
                style={{ width: "100%", backgroundColor: "var(--Base-Base-White)" }}
                value={searchText}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setSearchText(event.target.value)}
                size="large"
            />

            <Table<DataType>
                style={{ marginTop: 20 }}
                columns={[
                    {
                        title: "이름", dataIndex: "name", className: styles.tableColumnStyle + " body-content-accent", render: (value: string, record: DataType) => {
                            return <>{value}</>
                        }, minWidth: 100
                    },
                    { title: "휴대폰번호", dataIndex: "mobile", className: styles.tableColumnStyle + " body-content-standard", minWidth: 190 },
                    {
                        title: "유효한 수강권", dataIndex: "wellnessTicketIssuanceList", className: styles.tableColumnStyle + " body-content-standard", render: (value: number, record: DataType) => <>
                            {record.wellnessTicketIssuanceList.length > 0 ? record.wellnessTicketIssuanceList.map((e: IWellnessTicketIssuance) => <div>{e.name} {e.remainingCnt} / {e.totalUsableCnt}, {e.remainingDate}일 남음</div>) : <div>-</div>}
                        </>
                        , minWidth: 120
                    },
                    { title: "SNS", dataIndex: "soicalName", className: styles.tableColumnStyle + " body-content-standard" },
                ]}
                dataSource={memberList?.filter((member: IGetAllMemberListByCenterIdAdminResponseV1) => searchText === '' || member.mobile.includes(searchText) || member.name.includes(searchText))
                    .map((e, idx) => ({ key: e.id, ...e }))}
                pagination={{
                    position: ["bottomCenter"],
                    className: styles.tablePagenation
                }}
                locale={{ emptyText }}
                rowSelection={{ type: 'radio', ...rowSelection }}
            />

            <div style={{ textAlign: 'right' }}>
                <Button type="primary" onClick={() => {
                    if (!selectedMember) {
                        message.error('예약자를 선택해주세요.')
                        return
                    }
                    onClickNextButton()
                }}>선택</Button>
            </div>
        </>
    )
}

export default SelectMember