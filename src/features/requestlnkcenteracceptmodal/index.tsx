import { Modal } from "antd"

interface IProps {
    setAcceptRequestModalStatus: React.Dispatch<React.SetStateAction<boolean>>;
    acceptRequestModalStatus: boolean;
    acceptRequestLoading: boolean;
    onAcceptOnClick?: Function;
    onBackOnClick?: Function;
}

const RequestLinkCenterAcceptModal = ({ setAcceptRequestModalStatus, acceptRequestModalStatus, acceptRequestLoading, onAcceptOnClick, onBackOnClick }: IProps) => {

    return <>
        <Modal centered open={acceptRequestModalStatus} onCancel={() => setAcceptRequestModalStatus(false)} footer={false} closeIcon={false} width={436} styles={{ content: { backgroundColor: "var(--Base-Base-White)", padding: "20px 16px" }, footer: { margin: 0 } }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div className="desktop-body-highlight-accent">데이터 연동 수락</div>
            </div>
            <div>
                <div className="mobile-body-highlight-standard" style={{ wordBreak: "keep-all", color: "var(--Neutrals-Neutrals700)", paddingBlock: "var(--Spacingl)" }}>
                    요청한 센터가 통계 데이터를 볼 수 있도록 수락하시겠습니까?
                </div>
            </div>
            <div style={{ display: "flex", gap: "var(--Spacingbase)" }}>
                <div className="body-content-accent" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "50%", height: '24px', cursor: "pointer", padding: "var(--Spacingsm) var(--Spacingl) var(--Spacingsm) var(--Spacingl)", borderRadius: "var(--Spacingxs)", border: "1px solid var(--Neutrals-Neutrals200)", backgroundColor: "var(--Base-Base-White)", color: "var(--Base-Base-Black)" }} onClick={() => { onBackOnClick?.() }}>돌아가기</div>
                <div className="body-content-accent" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "50%", height: '24px', cursor: acceptRequestLoading ? "" : "pointer", padding: "var(--Spacingsm) var(--Spacingl) var(--Spacingsm) var(--Spacingl)", borderRadius: "var(--Spacingxs)", backgroundColor: acceptRequestLoading ? "var(--Primary-Primary200)" : "var(--Primary-Primary)", color: "var(--Base-Base-White)" }} onClick={() => { onAcceptOnClick?.() }}>{acceptRequestLoading ? <>로딩아이콘 연동중 입니다.</> : "수락"}</div>
            </div>
        </Modal>
    </>
}


export { RequestLinkCenterAcceptModal }