import { useMutationCreateCenterNoticeByCenterId, useMutationUpdateCenterNoticeById, useQueryGetCenterNoticeDetailById } from "@/entities/notice/model";
import { RootState } from "@/store";
import { Button, Divider, Flex, Input, Radio, RadioChangeEvent, message } from "antd"
import TextArea from "antd/es/input/TextArea"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ReactComponent as Close } from '@/assets/icon/Close.svg';
import { useQueryClient } from "@tanstack/react-query";

const NoticeUpdate = () => {
    const { id } = useParams();
    const numericId = id ? parseInt(id, 10) : undefined;
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const selectedCenterId = useSelector((state: RootState) => state.selectedCenterId)
    const [title, setTitle] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const [isPopup, setIsPopup] = useState<boolean>(false);
    const [isDelete, setIsDelete] = useState<boolean>(false);
    const titleRef = useRef<HTMLDivElement>(null);
    const [titleHeight, setTitleHeight] = useState<number>();
    const { data: centerNotice } = useQueryGetCenterNoticeDetailById(selectedCenterId, numericId as number);

    useEffect(() => {
        if (titleRef.current) {
            setTitleHeight(titleRef.current.offsetHeight);
        }
    }, [title]);

    useEffect(() => {
        if (centerNotice) {
            setTitle(centerNotice.title)
            setContent(centerNotice.content)
            setIsPopup(centerNotice.isPopup)
            setIsDelete(centerNotice.isDelete)
        }
    }, [centerNotice])

    const updateMutation = useMutationUpdateCenterNoticeById((res: any) => {
        if (res.data) {
            message.success("공지사항 수정 성공했습니다.")
            queryClient.invalidateQueries({ queryKey: ['getCenterNoticeListByCenterId', selectedCenterId] })
            navigate(-1)

        }
    })

    const clickUpdateButton = () => {
        const request: IUpdateCenterNoticeByIdAdminRequestV1 = {
            id: numericId as number,
            centerId: selectedCenterId,
            title: title,
            content,
            isPopup,
            isDelete
        }

        updateMutation.mutate(request);
    }

    return <>
        <div style={{ backgroundColor: 'white' }}>
            <Flex justify="flex-start" gap={50}>
                <div style={{ padding: '20px 24px' }}>
                    <div>
                        <Flex align="center" style={{ marginTop: 16 }}>
                            <div style={{ width: 124 }}>제목</div>
                            <Input
                                placeholder="제목을 입력해 주세요"
                                style={{ width: "335px", height: 44 }}
                                value={title}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)}
                            />
                        </Flex>
                        <Flex align="center" style={{ marginTop: 16 }}>
                            <div style={{ width: 124 }}>내용</div>
                            <TextArea
                                rows={25}
                                placeholder="수업에 대해 간단하게 소개해 주세요."
                                value={content}
                                style={{ width: "335px" }}
                                onChange={(e) => setContent(e.target.value)} />
                        </Flex>
                        <Flex align="center" style={{ marginTop: 16 }}>
                            <div style={{ width: 124 }}>팝업 여부</div>
                            <div>
                                <Radio.Group onChange={(e: RadioChangeEvent) => setIsPopup(e.target.value)} value={isPopup}>
                                    <Radio value={true}>팝업</Radio>
                                    <Radio value={false}>취소</Radio>
                                </Radio.Group>
                            </div>
                        </Flex>
                        <Flex align="center" style={{ marginTop: 16 }}>
                            <div style={{ width: 124 }}>게시 여부</div>
                            <div>
                                <Radio.Group onChange={(e: RadioChangeEvent) => setIsDelete(e.target.value)} value={isDelete}>
                                    <Radio value={false}>게시</Radio>
                                    <Radio value={true}>미게시</Radio>
                                </Radio.Group>
                            </div>
                        </Flex>
                    </div>
                    <div style={{ marginTop: 36 }}>
                        <Divider style={{ margin: 0 }} />
                    </div>

                    <Flex align="center" style={{ marginTop: 24, justifyContent: 'space-between' }}>
                        <Button onClick={() => navigate(-1)}>취소</Button>
                        <Button type="primary" onClick={clickUpdateButton}>수정하기</Button>
                    </Flex>
                </div>
                <div style={{ padding: '40px 24px' }}>
                    <div style={{ width: '325px', height: '667px', backgroundColor: '#00000073', padding: 20 }}>
                        <div style={{ padding: '20px 24px', border: '1px solid black', borderRadius: '8px', backgroundColor: 'white' }}>
                            <div style={{ display: "flex", paddingInline: "6px", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                                <div style={{ display: "flex", alignItems: "center", width: "100%", paddingBottom: "12px" }}>
                                    <div style={{ fontSize: "16px", fontWeight: "600", lineHeight: "19.2px", textAlign: "center", width: "100%" }}>
                                        공지사항
                                    </div>
                                    <Close width={24} height={24} stroke="#555555" style={{ cursor: 'pointer' }} />
                                </div>
                                <div style={{ fontSize: "12px", fontWeight: "600", lineHeight: "20px", textAlign: "left", width: "100%", whiteSpace: "pre-wrap" }} ref={titleRef}>
                                    {title}
                                </div>
                                <div style={{ color: "#555", fontSize: "13px", overflow: "scroll", maxHeight: `${408 - (titleHeight ?? 0)}px`, whiteSpace: "pre-wrap", marginBottom: "6px" }}>
                                    {content}
                                </div>
                                <div style={{ borderRadius: "5px", border: "0.5px solid #000", padding: "6% 0", width: "100%", textAlign: "center", fontSize: "15px", fontWeight: "600", cursor: "pointer" }}>
                                    오늘 그만보기
                                </div>
                                <div style={{ width: "100%", textAlign: "center", fontSize: "12px", lineHeight: "12px", cursor: "pointer", color: "#737373", paddingTop: "10px" }}>
                                    7일간 보지않기
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </Flex>




        </div>
    </>
}

export default NoticeUpdate