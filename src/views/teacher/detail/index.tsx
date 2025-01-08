import { TabList } from "@/features";
import ImageUploader from "@/shared/ui/ImageUploader";
import { RootState } from "@/store";
import { Button, Divider, Flex, } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import UpdateIntroduction from "./ui/UpdateIntroduction";
import UpdateCareer from "./ui/UpdateCareer";

const TeacherDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const selectedCenterId = useSelector((state: RootState) => state.selectedCenterId)
    const numericId = id ? parseInt(id, 10) : undefined;
    const [selectTab, setSelectTab] = useState<number>(0);
    const [isUpdateIntroduction, setIsUpdateIntroduction] = useState<boolean>(false)
    const [isUpdateCareer, setIsUpdateCareer] = useState<boolean>(false)

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
                        <div style={{ padding: 24 }}>
                            <Flex gap={80}>
                                <ImageUploader />
                                <div>
                                    <Flex gap={12}>
                                        <div className="body-content-bold" style={{ width: 100 }}>이름</div>
                                        <div className="body-content-standard">홍길동</div>
                                    </Flex>
                                    <Flex gap={12} style={{ marginTop: 16 }}>
                                        <div className="body-content-bold" style={{ width: 100 }}>센터 등록일</div>
                                        <div className="body-content-standard">2024.03.25</div>
                                    </Flex>
                                    <Flex gap={12} style={{ marginTop: 16 }}>
                                        <div className="body-content-bold" style={{ width: 100 }}>휴대폰 번호</div>
                                        <div className="body-content-standard">+82 010-1234-1234</div>
                                    </Flex>
                                    <Flex gap={12} style={{ marginTop: 16 }}>
                                        <div className="body-content-bold" style={{ width: 100 }}>생년월일</div>
                                        <div className="body-content-standard">1994.01.12 | 30세</div>
                                    </Flex>
                                    <Flex gap={12} style={{ marginTop: 16 }}>
                                        <div className="body-content-bold" style={{ width: 100 }}>이메일</div>
                                        <div className="body-content-standard">asdf@gmail.com</div>
                                    </Flex>
                                    <Flex gap={12} style={{ marginTop: 16 }}>
                                        <div className="body-content-bold" style={{ width: 100 }}>역할</div>
                                        <div className="body-content-standard">강사</div>
                                    </Flex>
                                </div>
                            </Flex>
                        </div>
                        {isUpdateIntroduction ?
                            <UpdateIntroduction setIsUpdateIntroduction={(value) => setIsUpdateIntroduction(value)} /> : <>
                                <div style={{ padding: 24 }}>
                                    <Flex justify="space-between" align="center">
                                        <div className="body-highlight-accent">자기소개 <span className="body-caption-standard" style={{ color: 'var(--Neutrals-Neutrals500)', marginLeft: 12 }}>회원에게 보이는 내용입니다.</span></div>
                                        <Button onClick={() => setIsUpdateIntroduction(true)}>수정</Button>
                                    </Flex>
                                </div>
                                <Divider style={{ margin: 0 }} />
                                <div style={{ padding: 24 }}>
                                    <Flex align="center">
                                        <div className="body-content-bold" style={{ color: 'var(--Neutrals-Neutrals700)', width: 100 }}>닉네임</div>
                                        <div className="body-content-standard" style={{ color: 'var(--Neutrals-Neutrals700)' }}>줄리아</div>
                                    </Flex>
                                    <div className="body-content-standard" style={{ marginTop: 12 }}>
                                        요가란 매트 위에서 도전과 용기를 통해 자신을 단련시키는 것입니다.<br />
                                        <br />

                                        수업에서는 하나의 동작을 달성하기 위한 관절과 근육을 워밍업 하여 코어를 강화 시킨 후,
                                        몸의 유연성을 향상시켜  피크 포즈에 도전합니다.
                                    </div>
                                </div>
                            </>}
                        {isUpdateCareer ? <UpdateCareer setIsUpdateCareer={(value) => setIsUpdateCareer(value)} /> :
                            <>
                                <div style={{ marginTop: 40, padding: 24 }}>
                                    <Flex justify="space-between" align="center">
                                        <div className="body-highlight-accent">주요 이력 <span className="body-caption-standard" style={{ color: 'var(--Neutrals-Neutrals500)', marginLeft: 12 }}>회원에게 보이는 내용입니다.</span></div>
                                        <Button onClick={() => setIsUpdateCareer(true)}>수정</Button>
                                    </Flex>
                                </div>
                                <Divider style={{ margin: 0 }} />
                                <div style={{ padding: 24 }}>
                                    <div className="body-content-standard" style={{ marginTop: 12 }}>
                                        - 유튜브 채널 운영<br />
                                        - 삼성전자 요가 교육자<br />
                                        - 더플로우요가 지도자과정 시니어<br />
                                        - 잇존어패럴 엠버서더
                                    </div>
                                </div>
                            </>}
                        <Divider style={{ margin: 0 }} />
                        <Flex style={{ padding: 24 }} justify="space-between">
                            <Button color="danger" type="default" variant="outlined">강사 삭제</Button>
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