

import { registerAdminUser } from "@/entities/member";
import BirthDayInput from "@/shared/ui/birthdayInput";
import EmailInput from "@/shared/ui/emailInput";
import { FullSizeButton } from "@/shared/ui/fullSizeButton";
import GenderInput from "@/shared/ui/genderInput";
import NameInput from "@/shared/ui/nameInput";
import { validateBirthDay } from "@/shared/utils/validate/validateBirthday";
import { validateName } from "@/shared/utils/validate/validateName";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as CreateUserAction from '@/entities/createUser/model/reducer'
import { RootState } from "@/store";

const AdminUserRegisterWidget = () => {
    const dispatch = useDispatch();
    const createUserStore = useSelector((state: RootState) => state.createUser)
    const navigate = useNavigate();
    const [nameText, setNameText] = useState<string>('')
    const [birthDay, setBirthDay] = useState<string>('')
    const [gender, setGender] = useState<"여성" | "남성" | "선택 안함">('여성');
    const [email, setEmail] = useState<{ id: string, domain: string | undefined }>({ id: '', domain: undefined });

    const isFormValid = () => {
        const isNotEmpty = nameText.trim() !== '' &&
            birthDay.trim() !== '' &&
            email.id.trim() !== '' &&
            email.domain !== undefined;

        const validName = validateName(nameText)
        const validBirthDay = validateBirthDay(birthDay)

        return isNotEmpty && validName && validBirthDay
    };

    const clickRegisterButton = () => {
        dispatch(CreateUserAction.setCreateUser({ ...createUserStore, username: nameText }))

        registerAdminUser({
            adminName: nameText,
            birthDay: birthDay.replaceAll('.', '-') + "T00:00:00",
            gender: gender === "여성" ? "F" : gender === "남성" ? "M" : gender === "선택 안함" ? "UNSELECTED" : "UNKNOWN",
            email: email.id + '@' + email.domain,
            roleName: 'OWNER'
        }).then(res => {
            if (res.data.body === true) {
                navigate(`/centerregister`)
            }
        }).catch(e => {
            console.error('error', e)
        })
    }

    return (<>
        <div style={{ marginTop: 32 }}>
            <NameInput nameText={nameText} setNameText={setNameText} />
        </div>
        <div style={{ marginTop: 24 }}>
            <BirthDayInput birthDay={birthDay} setBirthDay={setBirthDay} />
        </div>
        <div style={{ marginTop: 24 }}>
            <GenderInput gender={gender} setGender={setGender} />
        </div>
        <div style={{ marginTop: 24 }}>
            <EmailInput email={email} setEmail={setEmail} />
        </div>
        <div style={{ marginTop: 40 }}>
            <FullSizeButton text="가입하기" isDisabled={!isFormValid()} onClick={clickRegisterButton} />
        </div>
    </>
    )
}

export default AdminUserRegisterWidget;