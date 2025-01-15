

import { RootState } from "@/store";
import { deleteNotice, getNotice } from "@/entities/notice/api";
import { BreadCrumb } from "@/features";
import { Button, Modal } from "antd";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const NoticeDetail = () => {
    const [title, setTitle] = useState<string>();
    const [htmlContents, setHtmlContents] = useState<string>();
    const [isPinTop, setIsPinTop] = useState<boolean>();
    const [inShow, setInShow] = useState<boolean>();
    const [creatorName, setCreatorName] = useState<string>();
    const [deleteModalStatus, setDeleteModalStatus] = useState<boolean>(false);
    const [createdAt, setCreatedAt] = useState<string>();
    const [viewCnt, setViewCnt] = useState<number>();
    const selectedCenterId = useSelector((state: RootState) => state.selectedCenterId)
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");

    const onClickDeleteButton = () => {
        if (!id) return;
        deleteNotice(id, selectedCenterId)
        navigate("/home/customercenter/noticelist")
    }
    const initValue = (value: INotice | undefined) => {
        if (!value) return;
        setTitle(value.title)
        setCreatedAt(value.createdAt)
        setCreatorName(value.creatorName)
        setHtmlContents(value.htmlContents)
        setInShow(value.isShow)
        setIsPinTop(value.isPinTop)
        setViewCnt(value.viewCnt)
    }

    useEffect(() => {
        if (!id || !selectedCenterId) return;
        getNotice(id, selectedCenterId)
            .then(res => initValue(res.data))
            .catch(error => console.log("Error", error))
    }, [])

    return <>
        <div style={{ height: "100%" }}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "var(--Spacingxs)", height: "24px", paddingBottom: "21px" }}>
                    <BreadCrumb />
                </div>
            </div>
            <div style={{ backgroundColor: "var(--Base-Base-White)", height: "calc(100% - 45px)", color: "var(--Base-Base-Black)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "var(--Spacingml) var(--Spacingl) var(--Spacingm) var(--Spacingl)", borderBottom: "1px solid var(--Neutrals-Neutrals200)", marginBottom: "32px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "var(--Spacings)" }}>
                        {isPinTop && <div className="body-caption-accent" style={{ color: "var(--Primary-Primary)", border: "1px solid var(--Primary-Primary)", borderRadius: "var(--RadiusRound)", padding: "var(--Spacingxxs) var(--Spacingsm) var(--Spacingxxs) var(--Spacingsm)", width: "25px", textAlign: "center" }}>공지</div>}
                        <div className="body-highlight-accent" style={{ color: "var(--Base-Base-Black)" }}>
                            {title}
                        </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                        <div>
                            {createdAt?.split("T")[0].replaceAll("-", ".")}
                        </div>
                        <div>
                            {creatorName}
                        </div>
                        <div>
                            조회수 {viewCnt?.toLocaleString()}
                        </div>
                        <div>
                            {/* {inShow !== undefined && noticeTypeToReactNodeTag(inShow)} */}
                        </div>
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--Spacingl)", marginBottom: "52px", paddingInline: "var(--Spacingl)" }} dangerouslySetInnerHTML={{ __html: htmlContents ?? '' }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "var(--Spacingl)", borderTop: "1px solid var(--Neutrals-Neutrals200)" }}>
                    <Button style={{ color: "var(--Error-Error)", border: "1px solid var(--Error-Error)" }} onClick={() => setDeleteModalStatus(true)}>글 삭제</Button>
                    <div style={{ display: "flex", gap: "var(--Spacingl)" }}>
                        <Link to={"/home/customercenter/noticelist"}><Button >목록</Button></Link>
                        <Link to={{ pathname: `/home/customercenter/noticeedit?id=${id}` }}><Button style={{ color: "var(--Primary-Primary)", borderColor: "var(--Primary-Primary)" }}>수정</Button></Link>
                    </div>
                </div>
            </div>
        </div>
        <Modal centered styles={{ content: { padding: "var(--Spacingml) var(--Spacingbase) var(--Spacingml) var(--Spacingbase)" } }} open={deleteModalStatus} footer={false} closeIcon={false} width={436} onCancel={() => setDeleteModalStatus(false)}>
            <div className="body-highlight-accent" style={{ color: "var(--Base-Base-Black)" }}>
                공지사항 삭제
            </div>
            <div className="body-content-standard" style={{ color: "var(--Neutrals-Neutrals700)", marginBlock: "20px" }}>
                게시글을 삭제하시겠습니까?<br />
            </div>
            <div style={{ display: "flex", gap: "var(--Spacingbase)" }}>
                <Button className="body-content-accent" style={{ height: "52px", width: "50%" }} onClick={() => setDeleteModalStatus(false)}>돌아가기</Button>
                <Button className="body-content-accent" style={{ height: "52px", width: "50%", border: "1px solid var(--Error-Error)", color: "var(--Base-Base-White)", }} onClick={onClickDeleteButton} type="primary" danger>삭제하기</Button>
            </div>
        </Modal>
    </>
}

export { NoticeDetail };