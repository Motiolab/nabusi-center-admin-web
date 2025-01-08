import { RootState } from "@/store";
import InputIdDoubleCheck from "@/features/inputiddoublecheck";
import InputPasswordCheck from "@/features/inputpasswordcheck";
import { createAccountSecurityServer } from "@/entities/account";
import { createMember } from "@/entities/member";
import AgreePolicyForm from "@/shared/ui/agreePolicyForm";
import { FullSizeButton } from "@/shared/ui/fullSizeButton";
import { setLocalAccessToken } from "@/shared/utils/token";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CreateUserWidget = () => {
    const createUserStore = useSelector((state: RootState) => state.createUser)
    const navigate = useNavigate();
    const [userId, setUserId] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [agreePolicyList, setAgreePolicyList] = useState<IAgreePolicy>({ isUseTerms: false, isPersonalInformation: false, isSms: false, isEmail: false, isAppPush: false });
    const [isAvaliableUserId, setIsAvaliableUserId] = useState<Boolean>(false);
    const [isAvaliablePassword, setIsAvaliablePassword] = useState<Boolean>(false);
    const [isValidCreateUser, setIsValidCreateUser] = useState<Boolean>(false);

    useEffect(() => {
        if (!createUserStore.mobile) {
            // navigate(-1);
        }
        setIsValidCreateUser(false);
        if (isAvaliableUserId) {
            if (isAvaliablePassword) {
                if (agreePolicyList.isUseTerms && agreePolicyList.isPersonalInformation) {
                    setIsValidCreateUser(true);
                }
            }
        }
    }, [isAvaliableUserId, isAvaliablePassword, agreePolicyList])

    const clickCreateUserButton = async () => {
        try {
            const resCreateAccount = await createAccountSecurityServer({ userId, password, mobile: createUserStore.mobile, domain: "samata-admin" })
            if (resCreateAccount.status !== 200) {
                return alert('서버 오류');
            }
            if (resCreateAccount.data.accessToken) {
                setLocalAccessToken(resCreateAccount.data.accessToken);
            }

            const resCreateMember = await createMember({ userId: userId, mobile: createUserStore.mobile, countryCode: createUserStore.countryCode, ...agreePolicyList })
            if (resCreateMember.status !== 200) {
                return alert('서버 오류');
            } else {
                navigate('/adminuserregister')
            }
        } catch (e) {
            console.error('e', e)
        }
    }

    return (<>
        <div style={{ marginTop: 32 }}>
            <InputIdDoubleCheck userId={userId} setUserId={setUserId} setIsAvaliableUserId={setIsAvaliableUserId} />
        </div>
        <div style={{ marginTop: 20 }}>
            <InputPasswordCheck password={password} setPassword={setPassword} setIsAvaliablePassword={setIsAvaliablePassword} />
        </div>
        <div style={{ marginTop: 32 }}>
            <AgreePolicyForm agreePolicyList={agreePolicyList} setAgreePolicyList={setAgreePolicyList} />
        </div>
        <div style={{ marginTop: 53 }}>
            <FullSizeButton text="다음" isDisabled={!isValidCreateUser} onClick={clickCreateUserButton} />
        </div>
    </>
    )
}

export default CreateUserWidget;