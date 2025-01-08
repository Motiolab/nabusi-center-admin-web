

import { FullSizeButton } from "@/shared/ui/fullSizeButton"
import { RootState } from "@/store";
import { useSelector } from "react-redux";

const SuccessSignupManager = () => {
    const createUserStore = useSelector((state: RootState) => state.createUser)

    return (<>
        <div style={{ width: 344, margin: '78px auto', textAlign: 'center' }}>
            <div></div>
            <div>반가워요, {createUserStore.username}님</div>
            <div>
                이제 SAMATA에서<br />--를 시작해 보세요
            </div>
            <FullSizeButton text="센터 등록하기" />
        </div>
    </>
    )
}
export default SuccessSignupManager