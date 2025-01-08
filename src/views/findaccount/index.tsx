import FindAccountWidget from '@/widgets/findaccountwidget'

const FindAccount = () => {
    return (
        <div style={{ width: 344, margin: '78px auto', color: 'var(--Neutrals-Neutrals700)' }}>
            <div style={{ fontSize: 24, textAlign: 'center' }}>아이디 · 비밀번호 찾기</div>
            <div style={{ marginTop: 60 }}>
                <FindAccountWidget />
            </div>
        </div>
    )
}

export default FindAccount;