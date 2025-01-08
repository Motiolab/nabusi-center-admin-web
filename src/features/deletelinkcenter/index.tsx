import { Modal } from "antd";
import { deleteCenterDataLink } from "./api";

interface IProps {
    setBranchDeleteModalStatus: React.Dispatch<React.SetStateAction<boolean>>;
    branchDeleteModalStatus: boolean;
    selectCenter: any;
}

const DeleteLinkCenter = ({ setBranchDeleteModalStatus, branchDeleteModalStatus, selectCenter }: IProps) => {
    const deleteButtonOnClick = () => {
        deleteCenterDataLink(selectCenter.id)
            .finally(() => setBranchDeleteModalStatus(false));
    }
    return <>
        <Modal centered open={branchDeleteModalStatus} onCancel={() => setBranchDeleteModalStatus(false)} footer={false} closeIcon={false} width={436} styles={{ content: { backgroundColor: "var(--Base-Base-White)", padding: "20px 16px" }, footer: { margin: 0 } }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div className="desktop-body-highlight-accent">지점 삭제</div>
            </div>
            <div>
                <div className="mobile-body-highlight-standard" style={{ wordBreak: "keep-all", color: "var(--Neutrals-Neutrals700)", paddingBlock: "var(--Spacingl)" }}>
                    연동한 지점을 삭제하시겠습니까?<br />
                    삭제가 완료되면 통계 데이터 연동이 해제됩니다.
                </div>
            </div>
            <div style={{ display: "flex", gap: "var(--Spacingbase)" }}>
                <div className="body-content-accent" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "50%", height: '24px', cursor: "pointer", padding: "var(--Spacingsm) var(--Spacingl) var(--Spacingsm) var(--Spacingl)", borderRadius: "var(--Spacingxs)", border: "1px solid var(--Neutrals-Neutrals200)", backgroundColor: "var(--Base-Base-White)", color: "var(--Base-Base-Black)" }} onClick={() => setBranchDeleteModalStatus(false)}>돌아가기</div>
                <div className="body-content-accent" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "50%", height: '24px', cursor: "pointer", padding: "var(--Spacingsm) var(--Spacingl) var(--Spacingsm) var(--Spacingl)", borderRadius: "var(--Spacingxs)", backgroundColor: "var(--Error-Error300)", color: "var(--Base-Base-White)" }} onClick={() => deleteButtonOnClick()}>삭제</div>
            </div>
        </Modal>
    </>
}

export { DeleteLinkCenter }