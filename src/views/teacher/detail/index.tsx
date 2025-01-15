import { TabList } from "@/features";
import ImageUploader from "@/shared/ui/ImageUploader";
import { RootState } from "@/store";
import { Button, Divider, Flex, Tag, message, } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import UpdateIntroduction from "./ui/UpdateIntroduction";
import UpdateCareer from "./ui/UpdateCareer";
import { useMutationUpdateTeacherImageUrlById, useQueryGetTeacherDetailById } from "@/entities/teacher/model";
import dayjs from 'dayjs'
import DeleteTeacher from "./ui/DeleteTeacher";
import RestoreTeacher from "./ui/RestoreTeacher";
import { useQueryClient } from "@tanstack/react-query";

const TeacherDetail = () => {
    const queryClient = useQueryClient();
    const { id } = useParams();
    const navigate = useNavigate();
    const selectedCenterId = useSelector((state: RootState) => state.selectedCenterId)
    const numericId = id ? parseInt(id, 10) : undefined;
    const [selectTab, setSelectTab] = useState<number>(0);
    const [isUpdateIntroduction, setIsUpdateIntroduction] = useState<boolean>(false)
    const [isUpdateCareer, setIsUpdateCareer] = useState<boolean>(false)
    const [uploadedUrl, setUploadedUrl] = useState<string>();
    const { data: teacherDetail } = useQueryGetTeacherDetailById(selectedCenterId, numericId as number);

    const updateMutation = useMutationUpdateTeacherImageUrlById((res: any) => {
        if (res.data) {
            message.success("강사 이미지 수정이 완료되었습니다.")
            queryClient.invalidateQueries({ queryKey: ['getTeacherDetailById', selectedCenterId, numericId as number] })
        }
    })

    useEffect(() => {
        if (uploadedUrl) {
            const request: IUpdateTeacherImageUrlByIdAdminRequestV1 = {
                id: numericId as number,
                imageUrl: uploadedUrl,
                centerId: selectedCenterId
            }
            updateMutation.mutate(request);
        }
    }, [uploadedUrl])

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <TabList
                    tabItemList={[{ text: "기본 정보" }, { text: "수업 리뷰" }]}
                    setSelectIdx={setSelectTab}
                />
            </div>

            <div style={{ minHeight: "calc(100vh - 84px - 48px - 48px )", backgroundColor: "var(--Base-Base-White)" }}>
                {selectTab === 0
                    && <>
                        <div style={{ padding: 24 }}>
                            <div className="body-highlight-accent">기본정보</div>
                        </div>
                        <Divider style={{ margin: 0 }} />
                        {teacherDetail && <>
                            <div style={{ padding: 24 }}>
                                <Flex gap={80}>
                                    <ImageUploader setUploadedUrl={setUploadedUrl} initImageUrl={teacherDetail.imageUrl} />
                                    <div>
                                        <Flex gap={12} align="center">
                                            <div className="body-content-bold" style={{ width: 100 }}>이름</div>
                                            <div className="body-content-standard">{teacherDetail.name}</div>
                                            {teacherDetail.isDelete && <Tag bordered={false} color="red" >삭제</Tag>}
                                        </Flex>
                                        <Flex gap={12} style={{ marginTop: 16 }}>
                                            <div className="body-content-bold" style={{ width: 100 }}>센터 등록일</div>
                                            <div className="body-content-standard">{dayjs(teacherDetail.createdDate).format('YYYY.MM.DD')}</div>
                                        </Flex>
                                        <Flex gap={12} style={{ marginTop: 16 }}>
                                            <div className="body-content-bold" style={{ width: 100 }}>휴대폰 번호</div>
                                            <div className="body-content-standard">{teacherDetail.mobile}</div>
                                        </Flex>
                                        <Flex gap={12} style={{ marginTop: 16 }}>
                                            <div className="body-content-bold" style={{ width: 100 }}>이메일</div>
                                            <div className="body-content-standard">{teacherDetail.email}</div>
                                        </Flex>
                                    </div>
                                </Flex>
                            </div>
                        </>}
                        {teacherDetail ? <>
                            {isUpdateIntroduction ?
                                <UpdateIntroduction
                                    setIsUpdateIntroduction={(value) => setIsUpdateIntroduction(value)}
                                    initNickName={teacherDetail.nickName}
                                    initIntroduction={teacherDetail.introduce}
                                    initUseNickName={teacherDetail.useNickName}
                                    teacherId={teacherDetail.id}
                                /> : <>
                                    <div style={{ padding: 24 }}>
                                        <Flex justify="space-between" align="center">
                                            <div className="body-highlight-accent">자기소개 <span className="body-caption-standard" style={{ color: 'var(--Neutrals-Neutrals500)', marginLeft: 12 }}>회원에게 보이는 내용입니다.</span></div>
                                            <Button onClick={() => setIsUpdateIntroduction(true)}>수정</Button>
                                        </Flex>
                                    </div>
                                    <Divider style={{ margin: 0 }} />
                                    <div style={{ padding: 24 }}>
                                        <Flex align="center" gap={18}>
                                            <div className="body-content-bold" style={{ color: 'var(--Neutrals-Neutrals700)', width: 100 }}>닉네임</div>
                                            <div className="body-content-standard" style={{ color: 'var(--Neutrals-Neutrals700)' }}>{teacherDetail.nickName}</div>
                                            {teacherDetail.useNickName ? <Tag bordered={false} color="processing">사용</Tag> : <Tag bordered={false} color="red" >사용 안함</Tag>}
                                        </Flex>
                                        <div className="body-content-standard" style={{ marginTop: 12 }}>
                                            {teacherDetail.introduce}
                                        </div>
                                    </div>
                                </>}


                            {isUpdateCareer ? <UpdateCareer
                                setIsUpdateCareer={(value) => setIsUpdateCareer(value)}
                                initCareer={teacherDetail.career}
                                teacherId={teacherDetail.id}
                            /> :
                                <>
                                    <div style={{ marginTop: 40, padding: 24 }}>
                                        <Flex justify="space-between" align="center">
                                            <div className="body-highlight-accent">주요 이력 <span className="body-caption-standard" style={{ color: 'var(--Neutrals-Neutrals500)', marginLeft: 12 }}>회원에게 보이는 내용입니다.</span></div>
                                            <Button onClick={() => setIsUpdateCareer(true)}>수정</Button>
                                        </Flex>
                                    </div>
                                    <Divider style={{ margin: 0 }} />
                                    <div style={{ padding: 24 }}>
                                        <div className="body-content-standard" style={{ marginTop: 12, whiteSpace: 'pre-line' }}>
                                            {teacherDetail.career}
                                        </div>
                                    </div>
                                </>}
                            <Divider style={{ margin: 0 }} />
                        </> : <>데이터가 없습니다.</>}
                        <Flex style={{ padding: 24 }} justify="space-between">
                            {teacherDetail && <>
                                {teacherDetail.isDelete ?
                                    <RestoreTeacher centerId={selectedCenterId} id={teacherDetail.id} /> :
                                    <DeleteTeacher centerId={selectedCenterId} id={teacherDetail.id} />}
                            </>}
                            <Button onClick={() => navigate('/teacher')}>목록</Button>
                        </Flex>
                    </>}
                {selectTab === 1
                    && <>
                        수업 리뷰
                    </>}
            </div >
        </div>
    )
}

export default TeacherDetail