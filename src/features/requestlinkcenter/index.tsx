
import { Button, Col, Input, Modal } from "antd"
import { ReactComponent as Warning } from '@/assets/icon/Warning.svg';
import { ReactComponent as Close } from '@/assets/icon/Close.svg';
import { ReactComponent as CheckCircle } from '@/assets/icon/CheckCircle.svg';
import { requestCenterDataLink } from "@/entities";
import { useEffect, useState } from "react";
import { getCenterByCode } from "@/entities/center/api";
import { maskLongString, maskString } from "@/shared";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface IProps {
    setModalStatus: React.Dispatch<React.SetStateAction<boolean>>;
    modalStatus: boolean;
    setCenterCode: React.Dispatch<React.SetStateAction<string[]>>;
    centerCode: string[];
    setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
    loading?: boolean;
}
const RequestLinkCeter = ({ setModalStatus, modalStatus, setCenterCode, centerCode = ['-', '-', '-', '-'], setLoading, loading }: IProps) => {
    const [centerData, setCenterData] = useState<ICheckLinkCenter>();
    const setInputCenterCode = (e: string, idx: number) => { setCenterCode((c) => c.map((item, i) => (i === idx ? e : item))) }
    const selectedCenterId = useSelector((state: RootState) => state.selectedCenterId)

    const requestLinkCenter = () => {
        if (!centerData || loading) return;
        setLoading?.(true);
        requestCenterDataLink({ requestCenterId: selectedCenterId, responseCenterId: centerData.id, status: "REQUESTING" }, selectedCenterId)
            .then((res) => { console.log(res.data.body) })
            .catch((err) => { console.log("error: ", err); })
            .finally(() => { setLoading?.(false); setModalStatus(false); })
    }

    useEffect(() => {
        if (centerCode.join("").length !== 4) return;
        setLoading?.(true)
        getCenterByCode(centerCode.join(""), selectedCenterId)
            .then((res) => setCenterData(res.data))
            .catch((err) => console.log(err))
            .finally(() => setLoading?.(false))
    }, [centerCode])
    return <>
        <Button type="primary" style={{ width: "80px", height: '36px', padding: "var(--Spacingxs) var(--Spacingm) var(--Spacingxs) var(--Spacingm)", color: "var(--Base-Base-White)" }} onClick={() => setModalStatus(true)}>지점 연동</Button >

        <Modal centered open={modalStatus} onCancel={() => setModalStatus(false)} footer={false} closeIcon={false} width={620} styles={{ content: { backgroundColor: "var(--Base-Base-White)" } }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div className="desktop-body-highlight-accent">지점 연동 요청하기</div>
                <Close style={{ cursor: "pointer" }} width={24} height={24} onClick={() => setModalStatus(false)} />
            </div>
            <div>
                <div className="mobile-body-highlight-standard" style={{ wordBreak: "keep-all", color: "var(--Neutrals-Neutrals700)", paddingBlock: "var(--Spacingl)" }}>
                    1. 연동 요청할 지점의 센터코드 입력<br />
                    2. 지점 정보 확인 후 연동 요청
                </div>
                <div style={{ paddingBottom: "var(--Spacingl)", borderBottom: "1px solid var(--Neutrals-Neutrals200)", display: "flex", flexDirection: "column", gap: "var(--Spacingsm)" }}>
                    <div className="desktop-body-caption-accent">
                        센터코드 입력
                    </div>
                    <div style={{ display: "flex", gap: "var(--Spacingml)" }}>
                        <Input maxLength={1} style={{ backgroundColor: "transparent", width: "69px", height: "78px", textAlign: "center", fontWeight: 700, fontSize: "32px", color: "var(--Neutrals-Neutrals700)", border: "1px solid var(--Neutrals-Neutrals200)", borderRadius: "var(--Spacingxs)" }} value={centerCode[0] ?? " "} onChange={(e) => setInputCenterCode(e.target.value.toUpperCase(), 0)} />
                        <Input maxLength={1} style={{ backgroundColor: "transparent", width: "69px", height: "78px", textAlign: "center", fontWeight: 700, fontSize: "32px", color: "var(--Neutrals-Neutrals700)", border: "1px solid var(--Neutrals-Neutrals200)", borderRadius: "var(--Spacingxs)" }} value={centerCode[1] ?? " "} onChange={(e) => setInputCenterCode(e.target.value.toUpperCase(), 1)} />
                        <Input maxLength={1} style={{ backgroundColor: "transparent", width: "69px", height: "78px", textAlign: "center", fontWeight: 700, fontSize: "32px", color: "var(--Neutrals-Neutrals700)", border: "1px solid var(--Neutrals-Neutrals200)", borderRadius: "var(--Spacingxs)" }} value={centerCode[2] ?? " "} onChange={(e) => setInputCenterCode(e.target.value.toUpperCase(), 2)} />
                        <Input maxLength={1} style={{ backgroundColor: "transparent", width: "69px", height: "78px", textAlign: "center", fontWeight: 700, fontSize: "32px", color: "var(--Neutrals-Neutrals700)", border: "1px solid var(--Neutrals-Neutrals200)", borderRadius: "var(--Spacingxs)" }} value={centerCode[3] ?? " "} onChange={(e) => setInputCenterCode(e.target.value.toUpperCase(), 3)} />
                    </div>
                </div>
                <div style={{ padding: "var(--Spacingl) 0", display: "flex", flexDirection: "column", gap: "var(--Spacingsm)" }}>
                    <div className="desktop-body-caption-accent">
                        지점 정보 확인
                    </div>
                    {setLoading && loading ?
                        <div className="desktop-body-caption-accent" style={{ color: "var(--Neutrals-Neutrals500)", display: "flex", alignItems: "center", justifyContent: "center", gap: "var(--Spacings)" }}>
                            <div>
                                로딩애니메이션
                            </div>
                            <div>
                                정보 확인중 입니다.
                            </div>
                        </div>
                        : centerData ? <div style={{ display: "flex", flexDirection: "column", gap: "var(--Spacingsm)" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "var(--Spacingml) var(--Spacingbase) var(--Spacingml) var(--Spacingbase)", border: "1px solid var(--Primary-Primary)", borderRadius: "var(--Radiuss)" }}>
                                <div style={{ display: "flex", flexDirection: "column", gap: "var(--Spacings)" }}>
                                    <div className="mobile-headings-heading-3" style={{ color: "var(--Base-Base-Black)" }}>
                                        {centerData?.centerName}
                                    </div>
                                    <div className="mobile-body-highlight-standard" style={{ display: "flex", gap: "var(--Spacings)", color: "var(--Neutrals-Neutrals700)" }}>
                                        <div className="desktop-body-content-accent">
                                            Owner 이름
                                        </div>
                                        <div className="desktop-body-caption-standard">
                                            {maskString(centerData?.ownerName)}
                                        </div>
                                        <div style={{ borderLeft: "1px solid var(--Neutrals-Neutrals200)", width: "1px" }} />
                                        <div className="desktop-body-content-accent">
                                            Owner ID
                                        </div>
                                        <div className="desktop-body-caption-standard">
                                            {maskLongString(centerData?.userId)}
                                        </div>
                                    </div>
                                </div>
                                <CheckCircle width={24} height={24} />
                            </div>
                            <div className="desktop-body-caption-regular" style={{ display: "flex", alignItems: "center", gap: "var(--Spacings)" }}>
                                <Warning width={16} height={16} fill={"var(--Warning-Warning200)"} />
                                <div style={{ color: "var(--Warning-Warning300)" }}>
                                    지점 정보가 다르다면, 연동 요청을 취소하세요.
                                </div>
                            </div>
                        </div>
                            : <div className="desktop-body-caption-accent" style={{ color: "var(--Neutrals-Neutrals500)", display: "flex", alignItems: "center", justifyContent: "center", gap: "var(--Spacings)" }}>센터코드를 확인해주세요.</div>}
                </div>
                <div style={{ textAlign: "right" }}>
                    <Button type="primary" style={{ backgroundColor: loading ? "var(--Primary-Primary100)" : "" }} onClick={() => requestLinkCenter()} >연동 요청하기</Button>
                </div>
            </div>
        </Modal>
    </>
}


export { RequestLinkCeter };