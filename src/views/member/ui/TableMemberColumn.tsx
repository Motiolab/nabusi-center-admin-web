import { Flex, TableColumnsType } from "antd"
import styles from '../styles.module.css'
import { Link } from "react-router-dom"
import dayjs from 'dayjs'

const TableMemberColumn: TableColumnsType<any> = [
    { title: "no.", dataIndex: "", className: styles.tableColumnStyle + " body-content-standard", render: (_: number, __: any, index: number) => index + 1 },
    {
        title: "이름", dataIndex: "name", className: styles.tableColumnStyle + " body-content-accent", render: (value: string, record: IGetAllMemberListByCenterIdAdminResponseV1) => {
            return <>
                <Link to={`/member/detail/${record.id}`}>
                    <div className="body-content-accent">{value}</div>
                </Link>
            </>
        },
        minWidth: 100
    },
    {
        title: "휴대폰번호", dataIndex: "mobile", className: styles.tableColumnStyle + " body-content-standard"
        , minWidth: 190
    },
    {
        title: "유효한 수강권", dataIndex: "wellnessTicketIssuanceList", className: styles.tableColumnStyle + " body-content-standard", render: (value: number, record: IGetAllMemberListByCenterIdAdminResponseV1) => <>
            {record.wellnessTicketIssuanceList.length > 0 ? record.wellnessTicketIssuanceList.map((e: IWellnessTicketIssuance, index: number) =>
                <Flex gap={8} style={{ marginTop: index > 0 ? 12 : 0 }}>
                    <div className="body-caption-standardp" style={{ padding: '2px 8px', backgroundColor: 'var(--Neutrals-Neutrals100)', borderRadius: 4 }}>{e.name}</div>
                    <div className="body-caption-standardp" style={{ padding: '2px 8px', backgroundColor: 'var(--Neutrals-Neutrals100)', borderRadius: 4 }}>{e.remainingDate}일 남음</div>
                    <div className="body-caption-standardp" style={{ padding: '2px 8px', backgroundColor: 'var(--Neutrals-Neutrals100)', borderRadius: 4 }}>{e.remainingCnt}회 / {e.totalUsableCnt}회</div>
                </Flex>) : <div>-</div>
            }
        </>
        , minWidth: 120
    },
    {
        title: "메모", dataIndex: "memberMemoList", className: styles.tableColumnStyle + " body-content-standard", render: (value: string, record: IGetAllMemberListByCenterIdAdminResponseV1) => <>
            {record.memberMemoList.length > 0 ? record.memberMemoList.map((e: IMemberMemo) => <div style={{ maxWidth: '400px' }}>{e.content}</div>) : <div>-</div>}
        </>
    },
    {
        title: "역할", dataIndex: "roleName", className: styles.tableColumnStyle + " body-content-standard"
        , minWidth: 120
    },
    {
        title: "등록일", dataIndex: "createdDate", className: styles.tableColumnStyle + " body-content-standard", render: (value: string) => <>
            {dayjs(value).format("YYYY-MM-DD")}
        </>
    }
]

export default TableMemberColumn;