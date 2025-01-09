import { useMutationCreateMemberMemo, useQueryGetMemberDetailById } from "@/entities/member/model";
import { RootState } from "@/store";
import { Button, Divider, Flex, Input, Table } from "antd";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import dayjs from 'dayjs'
import styles from './styles.module.css'
import TableWellnessTicketIssuanceColumn from "../ui/TableWellnessTicketIssuanceColumn";
import TableMemberMemoColumn from "../ui/TableMemberMemoColumn";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import IssueWellnessTicket from "@/features/issuewellnessticket";

const { TextArea } = Input;

const MemberDetail = () => {
    const queryClient = useQueryClient();
    const { id } = useParams();
    const selectedCenterId = useSelector((state: RootState) => state.selectedCenterId)
    const numericId = id ? parseInt(id, 10) : undefined;
    const { data: memberDetail, isError, error } = useQueryGetMemberDetailById(selectedCenterId, numericId as number);
    const createMutation = useMutationCreateMemberMemo(() => {
        queryClient.invalidateQueries({ queryKey: ['getMemberDetailById', selectedCenterId, numericId as number] })
    });
    const [memo, setMemo] = useState<string>('');

    if (isError) {
        return <div>유효하지 않은 ID입니다. {String(error)}</div>;
    }

    return <div style={{ backgroundColor: 'white' }}>
        <Flex style={{ padding: '20px 24px' }} justify="space-between">
            <div className="body-highlight-accent">기본정보</div>
            <div className="body-caption-standard">앱 회원 정보는 본인만 변경 가능</div>
        </Flex>
        <Divider style={{ margin: 0 }} />
        {memberDetail && <>
            <div style={{ padding: 24 }}>
                <Flex gap={24}>
                    <div style={{ flex: 1 }}>
                        <Flex gap={12}>
                            <div className="body-content-bold" style={{ width: 100 }}>이름</div>
                            <div className="body-content-standard" style={{ color: 'var(--Neutrals-Neutrals700)' }}>{memberDetail.name}</div>
                        </Flex>
                        <Flex gap={12} style={{ marginTop: 20 }}>
                            <div className="body-content-bold" style={{ width: 100 }}>휴대폰번호</div>
                            <div className="body-content-standard" style={{ color: 'var(--Neutrals-Neutrals700)' }}>{memberDetail.mobile}</div>
                        </Flex>
                        <Flex gap={12} style={{ marginTop: 20 }}>
                            <div className="body-content-bold" style={{ width: 100 }}>생년월일</div>
                            <div className="body-content-standard" style={{ color: 'var(--Neutrals-Neutrals700)' }}>{memberDetail.birthDay} | {memberDetail.age}</div>
                        </Flex>
                        <Flex gap={12} style={{ marginTop: 20 }}>
                            <div className="body-content-bold" style={{ width: 100 }}>성별</div>
                            <div className="body-content-standard" style={{ color: 'var(--Neutrals-Neutrals700)' }}>{memberDetail.gender}</div>
                        </Flex>
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ padding: 24, maxWidth: 412, backgroundColor: 'var(--Neutrals-Neutrals50)' }}>
                            <Flex gap={12}>
                                <div style={{ width: 100 }}>센터 등록일</div>
                                <div>{dayjs(memberDetail.createdDate).format('YYYY.MM.DD')}</div>
                            </Flex>
                            <Flex gap={12} style={{ marginTop: 20 }}>
                                <div style={{ width: 100 }}>이메일</div>
                                <div>{memberDetail.email}</div>
                            </Flex>
                            <Flex gap={12} style={{ marginTop: 20 }}>
                                <div style={{ width: 100 }}>역할</div>
                                <div>{memberDetail.roleName}</div>
                            </Flex>
                        </div>
                    </div>
                </Flex>
            </div>

            <div>
                <Flex align="center" justify="space-between" style={{ padding: 24 }}>
                    <div className="body-highlight-accent">수강권</div>
                    {numericId && <IssueWellnessTicket memberId={numericId} />}
                </Flex>
                <Divider style={{ margin: 0 }} />
                <div style={{ padding: 24 }}>
                    <Table
                        style={{ marginTop: 20 }}
                        columns={TableWellnessTicketIssuanceColumn}
                        dataSource={memberDetail.wellnessTicketIssuanceList.map((e, idx) => ({ ...e, key: idx }))}
                        pagination={{
                            position: ["bottomRight"],
                            className: styles.tablePagenation
                        }}
                        locale={{ emptyText: <div className="body-content-standard" style={{ textAlign: "left", color: "var(--Base-Base-Black)" }}>발급된 수강권 이력이 없습니다.</div> }}
                    />
                </div>
            </div>

            <div>
                <div className="body-highlight-accent" style={{ padding: 24 }}>메모</div>
                <Divider style={{ margin: 0 }} />
                <div style={{ padding: 24 }}>
                    <Flex>
                        <TextArea
                            rows={4}
                            placeholder="메모를 작성해 주세요"
                            value={memo}
                            onChange={(e) => setMemo(e.target.value)}
                            style={{ width: 530 }}
                        />
                        <Button
                            style={{ marginLeft: 16 }}
                            color="default"
                            variant="outlined"
                            onClick={() => createMutation.mutate({
                                centerId: selectedCenterId,
                                createMemberMemoAdminRequestV1: {
                                    content: memo,
                                    memberId: numericId as number
                                }
                            })}>작성하기</Button>
                    </Flex>
                    <Table
                        style={{ marginTop: 20 }}
                        columns={TableMemberMemoColumn}
                        dataSource={memberDetail.memberMemoList.map((e, idx) => ({ ...e, key: idx }))}
                        pagination={{
                            position: ["bottomRight"],
                            className: styles.tablePagenation
                        }}
                        locale={{ emptyText: <div className="body-content-standard" style={{ textAlign: "left", color: "var(--Base-Base-Black)" }}>메모 정보가 없습니다.</div> }}
                    />
                </div>
            </div>
        </>
        }
    </div >
}

export default MemberDetail