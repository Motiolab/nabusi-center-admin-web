
import CopyIconToClipboard from "@/shared/ui/copyIconToClipboard";
import { FullSizeButton } from "@/shared/ui/fullSizeButton";
import { Flex } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";

const SuccessFindId = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const name = searchParams.get('name');

    return (<>
        <div style={{ width: 344, margin: '78px auto', color: 'var(--Neutrals-Neutrals700)' }}>
            <div style={{ fontSize: 'var(--Font-Size-hero)', textAlign: 'center' }}>아이디 찾기</div>
            <div style={{ marginTop: 40, textAlign: 'center', fontSize: 24 }}>
                <div style={{}}>{name}님께서 가입하신 아이디</div>
                <Flex style={{ marginTop: 12 }} justify="center">{id} <CopyIconToClipboard text={id} /></Flex>
            </div>
            <div style={{ marginTop: 40 }}>
                <FullSizeButton text="로그인하기" onClick={() => navigate('/login')} />
            </div>
            <div style={{ marginTop: 24, color: 'var(--Neutrals-Neutrals500)', textAlign: 'center' }}>
                비밀번호 재설정하기
            </div>
        </div>
    </>
    )
}
export default SuccessFindId;