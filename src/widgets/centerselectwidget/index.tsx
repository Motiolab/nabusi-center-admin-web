import RegisterCenter from "@/features/registercenter";
import { getCenterListByAdminUser } from '@/entities/member';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import * as SelectedCenterIdAction from '@/entities/selectedCenterId/model/reducer'
import { useNavigate } from "react-router-dom";
import { adminLoginSuccess } from "@/entities/account";
import { getRedirectUrlAfterLogin, setRedirectUrlAfterLogin } from "@/shared/utils/redirectUrlAfterLogin";
import { DeploymentUnitOutlined } from '@ant-design/icons';
import { Flex, Row } from "antd";

const CenterSelectWidget = () => {
    const navigate = useNavigate();
    const [centerList, setCenterList] = useState<Array<IGetMyCenterListByMemberIdResponseV1>>([])
    const dispatch = useDispatch();

    useEffect(() => {
        requestCenterListByAdminUser();
    }, [])

    const requestCenterListByAdminUser = async () => {
        await adminLoginSuccess()
        const redirectUrlAfterLogin = getRedirectUrlAfterLogin();
        if (redirectUrlAfterLogin) {
            setRedirectUrlAfterLogin('undefined');
            navigate(redirectUrlAfterLogin);
        }

        getCenterListByAdminUser()
            .then(res => setCenterList(res.data))
            .catch(error => console.error('error', error))
    }

    return (<>
        {centerList.length === 0
            ? <>
                <div style={{ border: '1px solid var(--Neutrals-Neutrals100)', padding: 20, textAlign: 'center' }}>
                    <div className="body-highlight-bold">아직 초대받은 센터가 없습니다</div>
                    <div className="body-caption-standard" style={{ marginTop: 12, color: 'var(--Neutrals-Neutrals500)' }}>이미 SAMATA에 등록된 센터 가입을 원하신다면,<br />
                        관리자에게 초대링크를 요청하세요</div>
                </div>
            </>
            : <>{centerList.map((center: IGetMyCenterListByMemberIdResponseV1) => <Fragment key={center.id}>
                <div style={{
                    marginBottom: 20,
                    padding: 'var(--Spacingml) var(--Spacingbase) var(--Spacingml) var(--Spacingbase)',
                    border: '1px solid var(--Neutrals-Neutrals100)',
                    cursor: 'pointer'
                }}
                    onClick={() => {
                        dispatch(SelectedCenterIdAction.setSelectedCenterId(center.id));
                        navigate('/home');
                    }}
                >
                    <Flex style={{justifyContent: 'space-between'}}>
                    <div className="body-highlight-bold">{center.name}</div>
                    {center.isActive && <div><DeploymentUnitOutlined /></div>}
                    </Flex>
                    <div className="body-caption-standard" style={{ marginTop: 8 }}>{center.address} {center.detailAddress}</div>
                    <div className="body-caption-accent" style={{
                        color: 'var(--Neutrals-Neutrals500)',
                        backgroundColor: 'var(--Neutrals-Neutrals100)',
                        padding: '0 12px',
                        display: 'inline-block',
                        marginTop: 8,
                        borderRadius: 'var(--BorderRadiuss)'
                    }}>{center.roleName}</div>
                </div>
            </Fragment>)}
            </>}

        <div style={{ marginTop: 20 }}>
            <RegisterCenter onSuccess={() => requestCenterListByAdminUser()} />
        </div>
    </>
    )
}

export default CenterSelectWidget;