import CopyIconToClipboard from '@/shared/ui/copyIconToClipboard';
import CenterSelectWidget from '@/widgets/centerselectwidget';
import { Flex } from 'antd';
import { logout } from '@/entities/account';
import { removeLocalAccessToken } from '@/shared/utils/token';

const BRAND_PRIMARY = '#879B7E';

const CenterSelect = () => {

    return <>
        <div style={{
            width: '100%',
            maxWidth: '344px',
            margin: '0 auto',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '20px',
            color: 'var(--Neutrals-Neutrals700)'
        }}>
            <div style={{
                fontSize: '24px',
                color: 'var(--Neutrals-Neutrals700)',
                textAlign: 'center',
                fontWeight: '600',
                marginBottom: '40px'
            }}>
                센터 선택
            </div>

            <div style={{ marginBottom: '40px' }}>
                <CenterSelectWidget />
            </div>

            <div style={{ textAlign: 'center' }}>
                <div className='body-content-accent' style={{ color: 'var(--Neutrals-Neutrals500)' }}>
                    등록한 센터가 보이지 않는다면?
                </div>
                <div style={{ marginTop: 16 }}>
                    <div className='body-caption-standard' style={{ color: 'var(--Neutrals-Neutrals500)' }}>
                        아래 이메일로 아이디, 휴대폰번호와 함께<br />
                        문의 내용을 보내주시면 도와드리겠습니다.
                    </div>
                    <div style={{ marginTop: 8 }}>
                        <Flex justify='center' align='center'>
                            <div className='body-caption-accent' style={{ color: BRAND_PRIMARY, fontWeight: '600' }}>
                                cs@nabusi.com
                            </div>
                            <CopyIconToClipboard text={'cs@nabusi.com'} />
                        </Flex>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: 60, textAlign: 'center' }}>
                <span
                    className='body-caption-accent'
                    style={{
                        color: 'var(--Neutrals-Neutrals400)',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                        fontSize: '14px'
                    }}
                    onClick={() => {
                        removeLocalAccessToken();
                        logout();
                    }}
                >
                    로그아웃
                </span>
            </div>
        </div>
    </>
}

export default CenterSelect;