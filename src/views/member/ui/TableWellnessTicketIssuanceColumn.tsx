import { TableColumnsType } from "antd"
import styles from '../styles.module.css'
import { Link } from "react-router-dom"
import dayjs from 'dayjs'
import { ticketValueEnToKr } from "@/entities/ticket/model"

const TableWellnessTicketIssuanceColumn: TableColumnsType<any> = [
    { title: "no.", dataIndex: "", className: styles.tableColumnStyle + " body-content-standard", render: (_: number, __: any, index: number) => index + 1 },
    {
        title: "구분", dataIndex: "type", className: styles.tableColumnStyle + " body-content-accent", render: (value: string, record: IWellnessTicketIssuance) =>
            <>{ticketValueEnToKr(value)}</>
    },
    {
        title: "수강권", dataIndex: "name", className: styles.tableColumnStyle + " body-content-standard", render: (value: string, record: IWellnessTicketIssuance) => {
            return <div className="body-content-accent">{value}</div>
        }
    },
    {
        title: "시작 - 종료일", dataIndex: "startDate", className: styles.tableColumnStyle + " body-content-standard", render: (value: number, record: IWellnessTicketIssuance) => <>
            <div>{dayjs(record.startDate).format("YYYY-MM-DD")} - {dayjs(record.expireDate).format("YYYY-MM-DD")}</div>
        </>
    },
    {
        title: "잔여일", dataIndex: "remainingDate", className: styles.tableColumnStyle + " body-content-standard", render: (value: string, record: IWellnessTicketIssuance) => <>
            <div>{value}일</div>
        </>
    },
    {
        title: "잔여 횟수", dataIndex: "remainingCnt", className: styles.tableColumnStyle + " body-content-standard", render: (value: string, record: IWellnessTicketIssuance) => <>
            <div>{value}회</div>
        </>
    },
    {
        title: "결제일", dataIndex: "createdDate", className: styles.tableColumnStyle + " body-content-standard", render: (value: string) => <>
            {dayjs(value).format("YYYY-MM-DD")}
        </>
    }
]

export default TableWellnessTicketIssuanceColumn;