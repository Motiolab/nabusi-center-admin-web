import AdminUserRegisterWidget from '@/widgets/adminuserregisterwidget'

const AdminUserRegister = () => {
    return <>
        <div style={{ width: 344, margin: '78px auto', color: 'var(--Neutrals-Neutrals700)' }}>
            <div style={{ fontSize: 24 }}>정보 등록하기</div>
            <div style={{ marginTop: 8, fontSize: 'var(--Size-content)', color: 'var(--Neutrals-Neutrals700)' }}>가입 후 회원정보에서 변경할 수 있어요.</div>
            <AdminUserRegisterWidget />
        </div>
    </>
}

export default AdminUserRegister;