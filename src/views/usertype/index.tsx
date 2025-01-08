

import UserTypeCardSelect from "@/features/usertypecardselect";
import { FullSizeButton } from "@/shared/ui/fullSizeButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import UserTypes from "./model/userTypes";


const UserType = () => {
    const navigate = useNavigate();
    const [userType, setUserType] = useState<string | undefined>(undefined);

    const onClickNextButton = () => {
        if (!userType) return;

        const url = userType === UserTypes.CENTER_OWNER ? '/centerownerregister' : '/managerregister';
        navigate(url);
    }

    return (
        <div style={{ width: 344, margin: '78px auto', color: 'var(--Neutrals-Neutrals700)' }}>
            <div style={{ fontSize: 24 }}>가입 유형 선택하기</div>
            <UserTypeCardSelect userType={userType} onClick={(selectedUserType: string) => setUserType(selectedUserType)} />
            <div style={{ marginTop: 314 }}>
                <FullSizeButton text="계속하기" isDisabled={!userType} onClick={onClickNextButton} />
            </div>
        </div>
    )
}

export default UserType;
