import { useQueryGetCenterNoticeListByCenterId } from "@/entities/notice/model"
import { RootState } from "@/store"
import { Button, Flex, Input, Table, Tag } from "antd"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import dayjs from 'dayjs'
import { ReactComponent as Search } from '@/assets/icon/Search.svg';
import { ChangeEvent, useState } from "react"

const Notice = () => {
    const [searchText, setSearchText] = useState<string>('');
    const selectedCenterId = useSelector((state: RootState) => state.selectedCenterId)
    const { data: centerNoticeList } = useQueryGetCenterNoticeListByCenterId(selectedCenterId)

    const emptyText = <div className="body-content-standard" style={{ textAlign: "left", color: "var(--Base-Base-Black)" }}>등록된 선생님이 없습니다.</div>;
    return <>
        <div style={{ backgroundColor: 'white', padding: 24 }}>
            <Flex gap={24} align="center" style={{ marginTop: 24 }} justify="space-between">

                <Link to="/notice/create" >
                    <Button style={{ height: "36px", padding: "var(--Spacingxs) var(--Spacingm) var(--Spacingxs) var(--Spacingm)" }} type="primary">글쓰기</Button>
                </Link>
                <div>
                    <Input
                        placeholder="제목 검색"
                        prefix={<Search />}
                        style={{ width: "370px", backgroundColor: "var(--Base-Base-White)" }}
                        value={searchText}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setSearchText(event.target.value)}
                        size="large"
                    />
                </div>
            </Flex>

            {centerNoticeList && <>
                <Table
                    style={{ marginTop: 20 }}
                    columns={[
                        { title: "no.", dataIndex: "", className: "body-content-standard", render: (_: number, __: any, index: number) => index + 1 },
                        {
                            title: "제목", dataIndex: "title", className: "body-content-accent", render: (value: string, record: IGetCenterNoticeListByCenterIdAdminResponseV1) => {
                                return <>
                                    <Link to={`/notice/update/${record.id}`}>
                                        {value}
                                    </Link>
                                </>
                            }
                        },
                        { title: "내용", dataIndex: "content", className: "body-content-standard", render: (i: string) => <>{i?.slice(0, 30) + ((i?.length >= 30) ? "..." : "")}</> },
                        {
                            title: "등록일", dataIndex: "createdDate", className: "body-content-standard", render: (value: string) => <>
                                {dayjs(value).format("YYYY-MM-DD")}
                            </>
                        },
                        {
                            title: "작성자", dataIndex: "registerName", className: "body-content-standard"
                        },
                        {
                            title: "팝업", dataIndex: "isPopup", className: "body-content-standard", render: (value: boolean) => <>
                                {value && <Tag bordered={false} color="processing" >팝업</Tag>}
                            </>
                        },
                        {
                            title: "게시", dataIndex: "isDelete", className: "body-content-standard", render: (value: boolean) => <>
                                {!value ? <Tag bordered={false} color="processing" >게시</Tag> : <Tag bordered={false} color="red" >미게시</Tag>}
                            </>
                        }
                    ]}
                    dataSource={centerNoticeList
                        .filter((centerNotice: IGetCenterNoticeListByCenterIdAdminResponseV1) => searchText === '' || centerNotice.title.includes(searchText))
                        .map((e, idx) => ({ ...e, key: idx }))}
                    pagination={{
                        position: ["bottomCenter"],
                    }}
                    locale={{ emptyText }}
                />
            </>}
        </div>
    </>
}

export default Notice