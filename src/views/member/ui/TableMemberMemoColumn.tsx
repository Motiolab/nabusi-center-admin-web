import { TableColumnsType } from "antd"
import styles from '../styles.module.css'
import dayjs from 'dayjs'
import { ticketValueEnToKr } from "@/entities/ticket/model"

const TableMemberMemoColumn: TableColumnsType<any> = [
    { title: "no.", dataIndex: "", className: styles.tableColumnStyle + " body-content-standard", render: (_: number, __: any, index: number) => index + 1 },
    {
        title: "내용", dataIndex: "content", className: styles.tableColumnStyle + " body-content-standard",
        render: (value: string, record: IWellnessTicketIssuance) =>
            <div style={{ width: '400px' }}>{ticketValueEnToKr(value)}</div>
    },
    {
        title: "작성자", dataIndex: "registerName", className: styles.tableColumnStyle + " body-content-standard", render: (value: string, record: IWellnessTicketIssuance) => {
            return <div className="body-content-standard">{value}</div>
        }
    },
    {
        title: "작성일", dataIndex: "createdDate", className: styles.tableColumnStyle + " body-content-standard", render: (value: number, record: IWellnessTicketIssuance) => <>
            <div>{dayjs(value).format("YYYY.MM.DD")}</div>
        </>
    }
]

export default TableMemberMemoColumn;