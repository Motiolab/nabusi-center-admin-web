import { RootState } from "@/store"
import { useSelector } from "react-redux"
import { useQueryGetWellnessLectureListByStartDate } from "../model"
import { Button, Flex, Input, Table } from "antd"
import styles from './styles.module.css'
import { useState } from "react"
import { ReactComponent as Search } from '@/assets/icon/Search.svg';
import TableWellnessLectureColumn from "./TableWellnessLectureColumn";
import { useNavigate } from "react-router-dom"

interface IProps {
    startDate: string
}

const TableWellnessLectureList = ({ startDate }: IProps) => {
    const navigate = useNavigate();
    const selectedCenterId = useSelector((state: RootState) => state.selectedCenterId)
    const [searchText, setSearchText] = useState<string>('');
    const { data: wellnessLectureList } = useQueryGetWellnessLectureListByStartDate(selectedCenterId, startDate);
    const emptyText = <div className="body-content-standard" style={{ textAlign: "left", color: "var(--Base-Base-Black)" }}>해당 날짜의 수업이 없습니다.</div>;

    return <>
        {wellnessLectureList && <>
            <Flex justify="space-between">
                <Flex align="center" gap={16}>
                    <div className="body-content-accent">수업 ({wellnessLectureList.filter((i) => i.name.includes(searchText) || i.teacherName.includes(searchText)).length})</div>
                    <Button type="primary" onClick={() => navigate('/wellness-class/create')}>수업 추가</Button>
                </Flex>
                <Input
                    classNames={{ input: styles.searchInput }}
                    placeholder="수업명 또는 강사명 검색"
                    value={searchText}
                    prefix={<Search />}
                    style={{ width: "310px", height: "36px", backgroundColor: "var(--Base-Base-White)" }}
                    onChange={(e) => setSearchText(e.target.value)} />
            </Flex>

            <Table
                style={{ marginTop: 20 }}
                columns={TableWellnessLectureColumn}
                dataSource={wellnessLectureList.filter((i) => i.name.includes(searchText) || i.teacherName.includes(searchText)).map((e, idx) => ({ ...e, key: idx }))}
                locale={{ emptyText }}
                pagination={{
                    position: ["bottomCenter"],
                    className: styles.tablePagenation
                }}
            />
        </>
        }</>
}

export default TableWellnessLectureList