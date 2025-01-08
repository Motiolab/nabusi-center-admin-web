

import { RootState } from "@/store";
import { registerNotice } from "@/entities/notice/api";
import { BreadCrumb } from "@/features";
import { Button, Input, Modal, Radio } from "antd";
// import dynamic from "next/dynamic";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
// const CustomEditor = dynamic(() => import('@/entities/ckeditor/ui'), { ssr: false });

const NoticeRegister = () => {
    const [title, setTitle] = useState<string>();
    const [htmlContents, setHtmlContents] = useState<string>();
    const [isPinTop, setIsPinTop] = useState<boolean>();
    const [isShow, setIsShow] = useState<boolean>();
    const [cancelModalStatus, setCancelModalStatus] = useState<boolean>(false);
    const [registerModalStatus, setRegisterModalStatus] = useState<boolean>(false);
    const navigate = useNavigate();
    const selectedCenterId = useSelector((state: RootState) => state.selectedCenterId)
    const [loading, setLoading] = useState<boolean>(false);

    const onClickRegisterButton = () => {
        if (!title || !htmlContents || isPinTop === undefined || isShow === undefined || loading) return;
        const value: INotice = { title, htmlContents, isPinTop, isShow }
        setLoading(true)
        registerNotice(value, selectedCenterId)
            .then(() => { navigate("/home/customercenter/noticelist"); })
            .catch((error) => { console.log("Error", error); })
            .finally(() => setLoading(false))
    }

    return <>
        <div style={{ height: "100%" }}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "var(--Spacingxs)", height: "24px", paddingBottom: "21px" }}>
                    <BreadCrumb />
                </div>
            </div>
            <div style={{ backgroundColor: "var(--Base-Base-White)", height: "calc(100% - 45px)", color: "var(--Base-Base-Black)" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--Spacingl)", marginBottom: "90px", padding: "var(--Spacingl)" }}>
                    <div style={{ display: "flex", gap: "var(--Spacingsm)", height: "28px", alignItems: "center" }}>
                        <div className="body-content-bold" style={{ minWidth: "100px" }}>
                            게시글 고정
                        </div>
                        <Radio.Group value={isPinTop} onChange={e => setIsPinTop(e.target.value)}>
                            <Radio value={true} className="body-content-standard">
                                고정함
                            </Radio>
                            <Radio value={false} className="body-content-standard">
                                고정 안함
                            </Radio>
                        </Radio.Group>
                    </div>
                    <div style={{ display: "flex", gap: "var(--Spacingsm)", height: "44px", alignItems: "center" }}>
                        <div className="body-content-bold" style={{ minWidth: "100px" }}>
                            제목
                        </div>
                        <Input value={title} onChange={q => setTitle(q.target.value)} style={{ width: "100%", height: "44px", backgroundColor: "var(--Base-Base-White)", marginRight: "44px" }} className="body-content-standard" />
                    </div>
                    <div style={{ display: "flex", gap: "var(--Spacingsm)" }}>
                        <div className="body-content-bold" style={{ minWidth: "100px" }}>
                            내용
                        </div>
                        {/* <CustomEditor setHtmlContents={setHtmlContents} /> */}
                    </div>
                    <div style={{ display: "flex", gap: "var(--Spacingsm)", height: "28px", alignItems: "center" }}>
                        <div className="body-content-bold" style={{ minWidth: "100px" }}>
                            게시 여부
                        </div>
                        <Radio.Group value={isShow} onChange={q => setIsShow(q.target.value)}>
                            <Radio value={true} className="body-content-standard">
                                게시
                            </Radio>
                            <Radio value={false} className="body-content-standard">
                                미게시
                            </Radio>
                        </Radio.Group>
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "var(--Spacingl)", borderTop: "1px solid var(--Neutrals-Neutrals200)" }}>
                    <Button onClick={() => setCancelModalStatus(true)}>취소</Button>
                    <Button disabled={loading} style={{ color: "var(--Primary-Primary)", borderColor: "var(--Primary-Primary)" }} onClick={() => setRegisterModalStatus(true)}>{loading ? "등록중" : "등록하기"}</Button>
                </div>
            </div>
        </div>
        <Modal centered styles={{ content: { padding: "var(--Spacingml) var(--Spacingbase) var(--Spacingml) var(--Spacingbase)" } }} open={registerModalStatus} footer={false} closeIcon={false} width={436} onCancel={() => setRegisterModalStatus(false)}>
            <div className="body-highlight-accent" style={{ color: "var(--Base-Base-Black)" }}>
                게시글 등록하기
            </div>
            <div className="body-content-standard" style={{ color: "var(--Neutrals-Neutrals700)", marginBlock: "20px" }}>
                작성하신 내용을 등록하시겠습니까?<br />
            </div>
            <div style={{ display: "flex", gap: "var(--Spacingbase)" }}>
                <Button className="body-content-accent" style={{ height: "52px", width: "50%" }} onClick={() => setRegisterModalStatus(false)}>돌아가기</Button>
                <Button className="body-content-accent" style={{ height: "52px", width: "50%" }} onClick={onClickRegisterButton} type="primary">등록하기</Button>
            </div>
        </Modal>
        <Modal centered styles={{ content: { padding: "var(--Spacingml) var(--Spacingbase) var(--Spacingml) var(--Spacingbase)" } }} open={cancelModalStatus} footer={false} closeIcon={false} width={436} onCancel={() => setCancelModalStatus(false)}>
            <div className="body-highlight-accent" style={{ color: "var(--Base-Base-Black)" }}>
                작성 그만하기
            </div>
            <div className="body-content-standard" style={{ color: "var(--Neutrals-Neutrals700)", marginBlock: "20px" }}>
                작성을 그만하시겠습니까?<br />
                작성한 내용은 저장되지 않습니다.<br />
            </div>
            <div style={{ display: "flex", gap: "var(--Spacingbase)" }}>
                <Button className="body-content-accent" style={{ height: "52px", width: "50%" }} onClick={() => setCancelModalStatus(false)}>돌아가기</Button>
                <Button className="body-content-accent" style={{ height: "52px", width: "50%", color: "var(--Error-Error)", border: "1px solid var(--Error-Error)" }} onClick={() => navigate(-1)}>그만하기</Button>
            </div>
        </Modal>
    </>
}

export { NoticeRegister };