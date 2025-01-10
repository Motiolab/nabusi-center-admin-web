import { Flex, TableColumnsType, Tag } from "antd"
import styles from '../styles.module.css'
import dayjs from 'dayjs'
import { ticketValueEnToKr } from "@/entities/ticket/model"
import { Link } from "react-router-dom"

const TableWellnessTicketIssuanceColumn: TableColumnsType<any> = [
    { title: "no.", dataIndex: "", className: styles.tableColumnStyle + " body-content-standard", render: (_: number, __: any, index: number) => index + 1 },
    {
        title: "구분", dataIndex: "type", className: styles.tableColumnStyle + " body-content-standard", render: (value: string, record: IWellnessTicketIssuance) =>
            <>{ticketValueEnToKr(value)}</>
    },
    {
        title: "수강권", dataIndex: "name", className: styles.tableColumnStyle + " body-content-standard", render: (value: string, record: IWellnessTicketIssuance) => {
            return <Link to={`/wellness-ticket-issuance/update/${record.id}`}><div className="body-content-accent">{value}</div></Link>
        }
    },
    {
        title: "잔여", dataIndex: "remainingDate", className: "body-content-standard", render: (value: string, record: IWellnessTicketIssuance) => <>
            <Flex gap={8}>
                <div className="body-caption-standardp" style={{ padding: '2px 8px', backgroundColor: 'var(--Neutrals-Neutrals100)', borderRadius: 4 }}>{record.remainingDate}일 남음</div>
                <div className="body-caption-standardp" style={{ padding: '2px 8px', backgroundColor: 'var(--Neutrals-Neutrals100)', borderRadius: 4 }}>{record.remainingCnt}회 / {record.totalUsableCnt}회</div>
                {record.limitType !== 'NONE' && <div className="body-caption-standardp" style={{ padding: '2px 8px', color: '#e57373', backgroundColor: '#fff2f0', borderRadius: 4 }}>{ticketValueEnToKr(record.limitType)} {record.limitCnt}회 제한</div>}
            </Flex>
        </>
    },
    {
        title: "시작 - 종료일", dataIndex: "startDate", className: styles.tableColumnStyle + " body-content-standard", render: (value: number, record: IWellnessTicketIssuance) => <>
            <div>{dayjs(record.startDate).format("YYYY-MM-DD")} - {dayjs(record.expireDate).format("YYYY-MM-DD")}</div>
        </>
    },
    {
        title: "결제일", dataIndex: "createdDate", className: styles.tableColumnStyle + " body-content-standard", render: (value: string) => <>
            {dayjs(value).format("YYYY-MM-DD")}
        </>
    },
    {
        title: "상태", dataIndex: "isDelete", className: "body-content-standard", render: (value: boolean, record: IWellnessTicketIssuance) => {
            return <Flex>{!value ?
                <Tag bordered={false} color="processing" className="body-caption-accent">이용중</Tag> :
                record.remainingCnt > 0 ?
                    <Tag bordered={false} color="red" className="body-caption-accent">만료</Tag> :
                    <Tag bordered={false} color="red" className="body-caption-accent">사용 완료</Tag>}
                {record.unpaidValue > 0 && <Tag bordered={false} color="error" className="body-caption-accent">미수금</Tag>}
            </Flex>
        }
    }
]

export default TableWellnessTicketIssuanceColumn;