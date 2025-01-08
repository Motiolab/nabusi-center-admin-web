import { Flex, Popover, TableColumnsType } from "antd"
import styles from './styles.module.css'
import { ReactComponent as Info } from '@/assets/icon/Info.svg';
import { Link } from "react-router-dom"
import { formatTimeRange } from "@/shared/utils/format/timeRange";

const TableWellnessLectureColumn: TableColumnsType<any> = [
    { title: "no.", dataIndex: "", className: styles.tableColumnStyle + " body-content-standard", render: (_: number, __: any, index: number) => index + 1 },
    {
        title: "종류", dataIndex: "type", className: styles.tableColumnStyle + " body-content-standard", render: (value: string, record: IGetWellnessLectureAdminResponseV1) => {
            return <>
                <Flex align="center" gap={5}>
                    <div>{record.wellnessLectureTypeName}</div>
                    <Popover content={<div>{record.wellnessLectureTypeDescription}</div>} title={'설명'}>
                        <Info />
                    </Popover>
                </Flex>
            </>
        }
    },
    {
        title: "수업명", dataIndex: "name", className: styles.tableColumnStyle + " body-content-accent", render: (value: string, record: IGetWellnessLectureAdminResponseV1) => <Link
            to={`/wellness-lecture/detail/${record.id}`}
            style={{ textDecorationLine: "none", color: "var(--Base-Base-Black)" }}>
            {value}
        </Link>
    },
    {
        title: "담당 강사", dataIndex: "teacherName", className: styles.tableColumnStyle + " body-content-standard", render: (value: number, record: IGetWellnessLectureAdminResponseV1) => <Link
            to={`/teacher/detail/${record.teacherId}`}
            style={{ textDecorationLine: "none", color: "var(--Base-Base-Black)" }}>
            {value}
        </Link>
    },
    {
        title: "수업일", dataIndex: "startDateTime", className: styles.tableColumnStyle + " body-content-standard", render: (value: string, record: IGetWellnessLectureAdminResponseV1) => <>
            {`${formatTimeRange(record.startDateTime, record.endDateTime)}`}
        </>
    },
    { title: "정원", dataIndex: "maxReservationCnt", className: styles.tableColumnStyle + " body-content-standard", render: (value: number) => value + "명" },
    { title: "진행 여부", dataIndex: "isDelete", className: styles.tableColumnStyle + " body-content-standard", render: (value: boolean) => !value ? <div className='body-caption-accent' style={{ textAlign: 'center', color: "var(--Primary-Primary)", backgroundColor: "var(--Primary-Primary50)", border: "1px solid var(--Primary-Primary)", borderRadius: "var(--Radiuss)", padding: 'var(--Spacingxxs) var(--Spacings) var(--Spacingxxs) var(--Spacings)', width: "37px" }}>진행</div> : <div className='body-caption-accent' style={{ textAlign: 'center', color: "var(--Error-Error)", backgroundColor: "var(--Error-Error50)", border: "1px solid var(--Error-Error)", borderRadius: "var(--Radiuss)", padding: 'var(--Spacingxxs) var(--Spacings) var(--Spacingxxs) var(--Spacings)', width: "49px" }}>폐강</div> }
]

export default TableWellnessLectureColumn;