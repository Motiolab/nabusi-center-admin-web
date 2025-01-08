

import { OutputOenString } from "@/shared";
import { FullSizeButton } from "@/shared/ui/fullSizeButton"
import { CopyOutlined } from '@ant-design/icons';
import CenterCodeGuide from "@/shared/ui/centerCodeGuide";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useNavigate } from "react-router-dom";
import CopyIconToClipboard from "@/shared/ui/copyIconToClipboard";

const SuccessSignupCenterOwner = () => {
    const navigate = useNavigate();
    const createUserStore = useSelector((state: RootState) => state.createUser)

    return (<>
        <div style={{ width: 712, margin: '78px auto', textAlign: 'center' }}>
            <div style={{ fontSize: 32, color: 'var(--Neutrals-Neutrals700)', fontWeight: '700' }}>반가워요, {createUserStore.username}님!</div>
            <div style={{ marginTop: 32, fontSize: 16 }}>{createUserStore.centername} 센터 코드</div>

            <div style={{ width: 343, margin: '0 auto', marginTop: 24 }}>
                <div style={{ display: "flex", gap: "var(--Spacingl)" }}>
                    {createUserStore.centerCode && <>
                        <OutputOenString output={createUserStore.centerCode[0]} />
                        <OutputOenString output={createUserStore.centerCode[1]} />
                        <OutputOenString output={createUserStore.centerCode[2]} />
                        <OutputOenString output={createUserStore.centerCode[3]} />
                    </>}
                </div>
            </div>
            <div style={{ marginTop: 24 }}>
                <div style={{ display: "inline-block", padding: 14, border: '1px solid var(--Neutrals-Neutrals200)', borderRadius: 'var(--RadiusRound)' }}>
                    <CopyIconToClipboard text={createUserStore.centerCode} />
                </div>
            </div>
            <div style={{ marginTop: 32 }}>
                <CenterCodeGuide />
            </div>
            <div style={{ width: 343, margin: '40px auto' }}>
                <FullSizeButton text="SAMATA 둘러보기" onClick={() => navigate('/')} />
            </div>
            <div style={{ marginTop: 20 }}>
                이용약관
            </div>
        </div>
    </>
    )
}
export default SuccessSignupCenterOwner