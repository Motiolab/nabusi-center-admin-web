import { Flex, Input, Table } from "antd"
import { Link } from "react-router-dom"
import dayjs from 'dayjs'
import { ChangeEvent, useState } from "react";
import { useQueryGetTeacherListByCenterId } from "@/entities/teacher/model";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { ReactComponent as Search } from '@/assets/icon/Search.svg';
import AddTeacher from "@/features/addteacher";

const Teacher = () => {
    const [searchText, setSearchText] = useState<string>('');
    const selectedCenterId = useSelector((state: RootState) => state.selectedCenterId)
    const emptyText = <div className="body-content-standard" style={{ textAlign: "left", color: "var(--Base-Base-Black)" }}>등록된 선생님이 없습니다.</div>;
    const { data: teacherList } = useQueryGetTeacherListByCenterId(selectedCenterId);

    return (
        <div style={{ backgroundColor: 'white', padding: 24 }}>
            {teacherList && <>
                <Flex gap={24} align="center" style={{ marginTop: 24 }} justify="space-between">
                    <AddTeacher isButton />


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

                <Table
                    style={{ marginTop: 20 }}
                    columns={[
                        { title: "no.", dataIndex: "", className: "body-content-standard", render: (_: number, __: any, index: number) => index + 1 },
                        {
                            title: "이름 (닉네임)", dataIndex: "name", className: "body-content-accent", render: (value: string, record: IGetTeacherListByCenterIdAdminResponseV1) => {
                                return <>
                                    <Link
                                        to={`/teacher/detail/${record.id}`}
                                        style={{ textDecorationLine: "none", color: "var(--Base-Base-Black)" }}>
                                        {value}
                                    </Link>
                                </>
                            },
                            minWidth: 100
                        },
                        {
                            title: "담당 수업 수", dataIndex: "lectureCnt", className: "body-content-standard"
                        },
                        {
                            title: "휴대폰번호", dataIndex: "mobile", className: "body-content-standard"
                        },
                        {
                            title: "등록일", dataIndex: "createdDate", className: "body-content-standard", render: (value: string) => <>
                                {dayjs(value).format("YYYY-MM-DD")}
                            </>
                        }
                    ]}
                    dataSource={teacherList
                        .filter((teacher: IGetTeacherListByCenterIdAdminResponseV1) => searchText === '' || teacher.mobile.includes(searchText) || teacher.name.includes(searchText) || (teacher.nickName && teacher.nickName.includes(searchText)))
                        .map((e, idx) => ({ ...e, key: idx }))}
                    pagination={{
                        position: ["bottomCenter"],
                    }}
                    locale={{ emptyText }}
                />
            </>}


        </div>
    )
}

export default Teacher