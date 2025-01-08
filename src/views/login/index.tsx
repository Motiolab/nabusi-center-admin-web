import LoginWidget from '@/widgets/loginwidget'

const Login = () => {
    const LoginButtonComponent = ({ href, social }: { href: string, social: string }) => {
        return <a href={href} style={{ fontSize: "16px", width: '104.6px' }}>
            <button style={{ margin: "5px", padding: "5px" }}>
                {social} 로그인
            </button>
        </a>
    }
    return <>
        <div style={{ width: 344, margin: '78px auto', color: 'var(--Neutrals-Neutrals700)' }}>
            <div style={{ fontSize: 24, textAlign: 'center' }}>로그인</div>

            <div style={{ margin: '0 auto', width: '290px' }}>
                <LoginButtonComponent href={`${process.env.REACT_APP_DOMAIN_URL}/oauth2/authorization/kakao`} social='kakao' />
                <LoginButtonComponent href={`${process.env.REACT_APP_DOMAIN_URL}/oauth2/authorization/naver`} social='naver' />
                <LoginButtonComponent href={`${process.env.REACT_APP_DOMAIN_URL}/oauth2/authorization/apple`} social='apple' />
            </div>

            <div style={{ marginTop: 60 }}>
                <LoginWidget />
            </div>
        </div>
    </>
}

export default Login;