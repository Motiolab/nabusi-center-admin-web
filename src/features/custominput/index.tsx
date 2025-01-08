
import { Modal, Switch } from "antd"
import { useEffect, useState } from "react";
import './index.css'
import Icon from "@/shared/ui/icon";

interface IProps {
    targetRef: React.RefObject<HTMLDivElement>,
    targetContent: string,
    setTargetContent: Function,
    explainContent?: string,
    subExplain?: string,
    subTargetContent?: string,
    iconSvg?: string,
    isSwitch: boolean,
    setIsSwitch: Function,
    idx?: number,
}
const CustomInput = ({ targetRef, targetContent, setTargetContent, subTargetContent, explainContent, iconSvg, subExplain, isSwitch, setIsSwitch, idx }: IProps) => {
    const [previewModalStatus, setPreviewModalStatus] = useState<boolean>(false);
    const targetHandleInput = () => {
        if (targetRef.current) {
            setTargetContent(targetRef.current.innerHTML);
        }
    };
    useEffect(() => {
        if (targetRef.current) {
            targetRef.current.innerHTML = targetContent;
        }
    }, []);

    return <>
        <div style={{ display: "flex", padding: "var(--Spacingl)", gap: "36px" }}>
            <div style={{ fontSize: "14px", width: "15.5%", display: "flex", flexDirection: "column", justifyContent: "center", gap: "var(--Spacingxs)" }}>
                <div style={{ color: "var(--Base-Base-Black)", fontWeight: 600 }}>
                    {explainContent}
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "var(--Spacingxs)", paddingBlock: "4px" }}>
                    <Icon src={iconSvg ?? "/assets/icon/Clock.svg"} width={16} height={16} alt="icon" />
                    <div style={{ color: "var(--Neutrals-Neutrals700)" }} >
                        {subExplain}
                    </div>
                </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "var(--Spacingbase)", flexGrow: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexDirection: "column", gap: "var(--Spacingsm)", flexGrow: 1, width: "63.2%" }}>
                    <div style={{ width: "100%", border: "1px solid var(--Neutrals-Neutrals200)", borderRadius: "var(--Radiuss)", fontSize: "16px", color: "var(--Base-Base-Black)", padding: "var(--Spacings)", lineHeight: "28px" }} contentEditable ref={targetRef} onInput={targetHandleInput} ></div>
                    {subTargetContent && <div style={{ display: 'flex', alignItems: "center", gap: "var(--Spacingxs)" }}>
                        <Icon src={"/assets/icon/Info.svg"} width={13} height={13} alt="icon" />
                        <div style={{ color: "var(--Neutrals-Neutrals700)", fontSize: "14px " }}>
                            {subTargetContent}
                        </div>
                    </div>}
                </div>
                <div style={{ display: "flex", gap: "var(--Spacingbase)" }}>
                    <div style={{ color: "var(--Primary-Primary)", cursor: "pointer" }} onClick={() => { setPreviewModalStatus(true); }}>미리보기</div>
                    <Switch onChange={(c) => setIsSwitch(c)} defaultChecked={isSwitch} />
                </div>
            </div>
        </div>
        <Modal title="알림 미리보기" open={previewModalStatus} styles={{ body: { textAlign: "center" } }} footer={false} onCancel={() => setPreviewModalStatus(false)} closeIcon={<Icon src={"/assets/icon/Close.svg"} width={24} height={24} alt="icon" />}>
            <div style={{ textAlign: "center", height: "400px", marginInline: "auto", width: "375px", position: "relative" }}>
                <Icon src={"/assets/img/previewFrame.png"} width={375} height={410} alt="img" />
                <div dangerouslySetInnerHTML={{ __html: targetContent.replaceAll("target-title", "preview-title").replaceAll("target-content", "preview-content").replaceAll("{수업명}", "사마타 요가").replaceAll("{수업 시작 시간}", "12:00").replaceAll("{수업 종료 시간}", "13:00").replaceAll("{회원명}", "사마타").replaceAll("{수강권명}", "사마타권") }} style={{ fontSize: "15px", top: "248px", left: "70px", position: "absolute", textAlign: "left", width: "235px", height: "72px", overflow: "hidden" }}></div>
            </div>
        </Modal >
    </>
}


export { CustomInput };