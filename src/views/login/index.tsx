import logoLeaf from '@/assets/img/logo_leaf.png';

const Login = () => {
    const KAKAO_COLOR = '#FEE500';
    const NAVER_COLOR = '#03C75A';

    const SocialLoginButton = ({ href, social, color, textColor, icon }: { href: string, social: string, color: string, textColor: string, icon?: string }) => {
        return (
            <a href={href} style={{ textDecoration: 'none', display: 'block', width: '100%', marginBottom: '12px' }}>
                <button
                    style={{
                        width: '100%',
                        height: '56px',
                        backgroundColor: color,
                        color: textColor,
                        border: 'none',
                        borderRadius: '12px',
                        fontSize: '18px',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        padding: '0 20px',
                    }}
                >
                    {icon && <span style={{ marginRight: '10px', fontSize: '20px' }}>{icon}</span>}
                    {social} 로그인
                </button>
            </a>
        );
    }

    return (
        <div style={{
            width: '100%',
            maxWidth: '344px',
            margin: '0 auto',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px'
        }}>
            {/* Logo and Slogan */}
            <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                <img src={logoLeaf} alt="Nabusi Logo" style={{ width: '120px', marginBottom: '40px' }} />
                <div style={{
                    fontSize: '20px',
                    color: '#8E949E', // Neutral gray color for slogan
                    fontWeight: '400',
                    letterSpacing: '-0.5px'
                }}>
                    고요히 나를 만나는 시간
                </div>
            </div>

            {/* Login Buttons */}
            <div style={{ width: '100%' }}>
                <SocialLoginButton
                    href={`${process.env.REACT_APP_DOMAIN_URL}/oauth2/authorization/kakao`}
                    social='카카오로'
                    color={KAKAO_COLOR}
                    textColor='#191919'
                    icon='💬' // Using emoji as placeholder for speech bubble icon
                />
                <SocialLoginButton
                    href={`${process.env.REACT_APP_DOMAIN_URL}/oauth2/authorization/naver`}
                    social='네이버로'
                    color={NAVER_COLOR}
                    textColor='#FFFFFF'
                    icon='N' // Naver uses 'N'
                />
            </div>

            {/* Existing LoginWidget is hidden per design request */}
            {/* <div style={{ marginTop: 60 }}>
                <LoginWidget />
            </div> */}
        </div>
    );
}

export default Login;