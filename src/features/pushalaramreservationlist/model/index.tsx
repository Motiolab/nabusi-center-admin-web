import styles from '../ui/styles.module.css'
import { TableColumnsType } from 'antd'
import dayjs from 'dayjs';

const pushAlarmReservationListColumns: TableColumnsType<any> = [
    { title: "발송 예정 일시", dataIndex: "sendReservationDate", className: styles.tableColumnStyle + " body-caption-accent", render: value => <div className='body-content-standard' style={{ color: 'var(--Base-Base-Black)' }}>  {dayjs(value).format("YYYY.MM.DD A hh:mm")} </div> },
    { title: "제목", dataIndex: "title", className: styles.tableColumnStyle + " body-caption-accent", render: value => <div className='body-content-standard' style={{ color: 'var(--Base-Base-Black)' }}>{value}</div> },
    { title: "발송 인원", dataIndex: "sendMemberNameList", className: styles.tableColumnStyle + " body-caption-accent", render: (value: string[]) => <div className='body-content-standard' style={{ color: 'var(--Base-Base-Black)' }}>{value?.length?.toLocaleString() ?? 0}</div> },
    { title: "등록자", dataIndex: "sender", className: styles.tableColumnStyle + " body-caption-accent", render: value => <div className='body-content-standard' style={{ color: 'var(--Base-Base-Black)' }}>{value}</div> },
]

export { pushAlarmReservationListColumns };