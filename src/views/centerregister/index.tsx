import CenterRegisterWidget from '@/widgets/centerregisterwidget'

const CenterRegister = () => {
    return <>
        <div style={{ width: 344, margin: '78px auto', color: 'var(--Neutrals-Neutrals700)' }}>
            <div style={{ fontSize: 24, color: 'var(--Neutrals-Neutrals700)' }}>센터를 운영하고 계신가요?</div>
            <div style={{ marginTop: 8, fontSize: 16 }}>센터용 Admin을 개설하고 싶으시다면<br />아래 정보를 입력해 주세요.</div>
            <CenterRegisterWidget />
        </div>
    </>
}

export default CenterRegister;