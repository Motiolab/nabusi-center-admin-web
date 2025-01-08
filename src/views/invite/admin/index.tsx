

import { acceptInviteAdminMember, getInviteAdminMemberToMe } from "@/entities/notification/inviteAdminToCenter";
import { FullSizeButton } from "@/shared/ui/fullSizeButton";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as SelectedCenterIdAction from '@/entities/selectedCenterId/model/reducer'
import { useNavigate, useSearchParams } from "react-router-dom";
import { getLocalAccessToken } from "@/shared/utils/token";
import { setRedirectUrlAfterLogin } from "@/shared/utils/redirectUrlAfterLogin";
import { Button, message } from "antd";

const InviteAdmin = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const code = searchParams.get('code');
    const dispatch = useDispatch();
    const [invitation, setInvitation] = useState<IGetInvitationAdminByCodeResponseV1 | undefined>(undefined);

    useEffect(() => {
        setRedirectUrlAfterLogin(`/invite/admin?code=${code}`);
        const token = getLocalAccessToken();
        if (!token) {
            navigate('/login')
            return;
        }

        if (!code) return alert("해당 코드가 없습니다.");

        getInviteAdminMemberToMe(code)
            .then(res => {
                if (!res.data) {
                    message.error("ADMIN 권한이 존재합니다.");
                }
                setInvitation(res.data)
            })
            .catch(error => console.error('error', error))
    }, [])

    const requestAcceptInvitationAdmin = () => {
        if (!code) return alert("해당 코드가 없습니다.");
        if (!invitation) return alert('초대 정보가 없습니다.');

        acceptInviteAdminMember(invitation.invitationAdminMemberId)
            .then(res => {
                if (res.data) {
                    dispatch(SelectedCenterIdAction.setSelectedCenterId(invitation.centerId));
                    navigate('/home');
                }
            })
            .catch(error => console.error('error', error))
    }

    return <>
        {invitation ? <>
            <div style={{ margin: '78px auto', color: 'var(--Neutrals-Neutrals700)' }}>
                <div style={{ fontSize: 24, color: 'var(--Neutrals-Neutrals700)', textAlign: 'center' }}>센터 초대를 받았습니다</div>
                <div className="mobile-body-highlight-standard" style={{ textAlign: 'center', color: 'var(--Neutrals-Neutrals500)', marginTop: '12px' }}>
                    {invitation.sendAdminMemberName}님께서 {invitation.memberName}님을 센터 관리자로 추가하셨습니다.
                </div>
                <div style={{ border: '1px solid var(--Neutrals-Neutrals100)', padding: 20, textAlign: 'left', width: '295px', margin: '32px auto 0px auto' }}>
                    <div className="body-highlight-bold">{invitation.centerName}</div>
                    <div className="body-caption-standard" style={{ marginTop: 12, color: 'var(--Neutrals-Neutrals500)' }}>{invitation.centerAddress} {invitation.centerDetailAddress}</div>
                </div>

                <div style={{ margin: '40px auto 0px auto', width: '335px' }}>
                    <FullSizeButton text="초대 수락하기" onClick={() => {
                        requestAcceptInvitationAdmin();
                    }} />
                </div>
            </div>
        </> : <>
            <div style={{ textAlign: 'center', marginTop: 300 }}>
                <Button>로그아웃</Button>
            </div>
        </>}
    </>
}

export default InviteAdmin;