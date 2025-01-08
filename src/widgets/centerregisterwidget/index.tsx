

import CenterNameInput from "@/shared/ui/centerNameInput";
import { useState } from "react";
import SearchAddress from "@/features/searchAddress";
import { Input } from "antd";
import { FullSizeButton } from "@/shared/ui/fullSizeButton";
import { validateName } from "@/shared/utils/validate/validateName";
import { createCenter } from "@/entities/companyManagement";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { AxiosResponse } from "axios";

const CenterRegisterWidget = () => {
    const dispatch = useDispatch();
    const createUserStore = useSelector((state: RootState) => state.createUser)
    const navigate = useNavigate();
    const [centerName, setCenterName] = useState<string>('');
    const [addressInfo, setAddressInfo] = useState<IAddressInfo>({ address: '', roadName: '' });
    const [addressDetail, setAddressDetail] = useState<string>('');

    const isFormValid = () => {
        const isNotEmpty = centerName.trim() !== '' &&
            addressInfo.address.trim() !== '' &&
            addressInfo.roadName.trim() !== '' &&
            addressDetail.trim() !== '';

        const validCenterName = validateName(centerName)

        return isNotEmpty && validCenterName
    };

    const clickRegisterButton = () => {
        createCenter({
            name: centerName.trim(),
            address: addressInfo.address.trim(),
            detailAddress: addressDetail.trim(),
            roadName: addressInfo.roadName
        }).then((res: AxiosResponse<boolean>) => {
            if (res.data === true) {
                // const roleName = `ROLE_${addressInfo.roadName}_${centerName}_OWNER`;
                // addRoleAccountSecurityServer({ roleName }).then(resCreateAccount => {
                //     if (resCreateAccount.status !== 200) {
                //         return alert('서버 오류');
                //     }
                //     if (resCreateAccount.data.accessToken) {
                //         setLocalAccessToken(resCreateAccount.data.accessToken);
                //         dispatch(CreateUserAction.setCreateUser({
                //             ...createUserStore,
                //             centername: centerName,
                //             centerCode: res.data.centerCode
                //         }))
                //         navigate(`/successsignupcenterowner`)
                //     }
                // }).catch(e => {
                //     console.error('error', e)
                // })
            }
        }).catch(e => {
            console.error('error', e)
        })
    }

    return (<>
        <div style={{ marginTop: 24 }}>
            <CenterNameInput centerName={centerName} setCenterName={setCenterName} />
        </div>
        <div style={{ marginTop: 24 }}>
            <SearchAddress addressInfo={addressInfo} setAddressInfo={setAddressInfo} />
            <Input
                size="large"
                placeholder="상세 주소를 입력해 주세요"
                value={addressDetail}
                onChange={(e) => setAddressDetail(e.target.value)}
                style={{ marginTop: 8 }}
            />
        </div>
        <div style={{ marginTop: 179, cursor: 'pointer' }} onClick={() => navigate('/login')}>
            아니요, 센터를 운영하고 있지 않아요
        </div>
        <div style={{ marginTop: 23 }}>
            <FullSizeButton text="가입하기" isDisabled={!isFormValid()} onClick={clickRegisterButton} />
        </div>
    </>)
}
export default CenterRegisterWidget;