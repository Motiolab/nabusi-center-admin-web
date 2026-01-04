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

const BRAND_PRIMARY = '#879B7E';

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
                <div style={{
                    border: '1px solid #E8E8E8',
                    padding: '40px 20px',
                    textAlign: 'center',
                    borderRadius: '16px',
                    backgroundColor: '#F9F9F9'
                }}>
                    <div className="body-highlight-bold" style={{ color: '#191919' }}>아직 초대받은 센터가 없습니다</div>
                    <div className="body-caption-standard" style={{ marginTop: 12, color: 'var(--Neutrals-Neutrals500)', lineHeight: '1.6' }}>
                        이미 나부시에 등록된 센터 가입을 원하신다면,<br />
                        관리자에게 초대링크를 요청하세요
                    </div>
                </div>
            </>
            : <>{centerList.map((center: IGetMyCenterListByMemberIdResponseV1) => <Fragment key={center.id}>
                <div style={{
                    marginBottom: 16,
                    padding: '24px',
                    border: '1px solid #F0F0F0',
                    borderRadius: '16px',
                    cursor: 'pointer',
                    backgroundColor: '#FFFFFF',
                    transition: 'all 0.2s ease-in-out',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = BRAND_PRIMARY;
                        e.currentTarget.style.boxShadow = `0 4px 12px rgba(135, 155, 126, 0.15)`;
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#F0F0F0';
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
                    }}
                    onClick={() => {
                        dispatch(SelectedCenterIdAction.setSelectedCenterId(center.id));
                        navigate('/home');
                    }}
                >
                    <Flex style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                        <div className="body-highlight-bold" style={{ fontSize: '18px', color: '#191919' }}>{center.name}</div>
                        {center.isActive && <div style={{ color: BRAND_PRIMARY }}><DeploymentUnitOutlined style={{ fontSize: '20px' }} /></div>}
                    </Flex>
                    <div className="body-caption-standard" style={{ marginTop: 8, color: '#666666' }}>{center.address} {center.detailAddress}</div>
                    <div className="body-caption-accent" style={{
                        color: BRAND_PRIMARY,
                        backgroundColor: '#F4F6F3', // Light version of brand color
                        padding: '4px 12px',
                        display: 'inline-block',
                        marginTop: 12,
                        borderRadius: '6px',
                        fontWeight: '600'
                    }}>{center.roleName}</div>
                </div>
            </Fragment>)}
            </>}

        <div style={{ marginTop: 24 }}>
            <RegisterCenter onSuccess={() => requestCenterListByAdminUser()} />
        </div>
    </>
    )
}

export default CenterSelectWidget;