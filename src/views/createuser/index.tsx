import CreateUserWidget from '@/widgets/createuserwidget'

const CreateUserView = () => {
    return <>
        <div style={{ width: 344, margin: '78px auto', color: 'var(--Neutrals-Neutrals700)' }}>
            <div style={{ fontSize: 24 }}>로그인에 사용할 정보 입력</div>
            <CreateUserWidget />
        </div>
    </>
}

export default CreateUserView;