import { PhoneAuthRequest } from '@/features/index'

const PhoneAuth = () => {
    return <>
        <div style={{ width: '344px', margin: '78px auto', color: 'var(--Neutrals-Neutrals700)' }}>
            <div style={{ fontSize: '28px' }}>휴대폰 인증</div>
            <div style={{ marginTop: '8px', fontSize: '16px' }}>회원 여부 확인을 위해 휴대폰번호를 인증해 주세요.</div>
            <div style={{ marginTop: '32px' }}>
                <PhoneAuthRequest />
            </div>
        </div>
    </>
}

export { PhoneAuth }