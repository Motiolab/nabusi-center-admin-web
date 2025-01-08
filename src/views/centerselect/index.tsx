import CopyIconToClipboard from '@/shared/ui/copyIconToClipboard';
import CenterSelectWidget from '@/widgets/centerselectwidget';
import { Flex } from 'antd';


const CenterSelect = () => {

    return <>
        <div style={{ width: 344, margin: '78px auto', color: 'var(--Neutrals-Neutrals700)' }}>
            <div style={{ fontSize: 24, color: 'var(--Neutrals-Neutrals700)', textAlign: 'center' }}>센터 선택</div>
            <div style={{ marginTop: 32 }}>
                <CenterSelectWidget />
            </div>
            <div style={{ marginTop: 28, textAlign: 'center' }}>
                <div className='body-content-accent' style={{ color: 'var(--Neutrals-Neutrals500)' }}>
                    등록한 센터가 보이지 않는다면?
                </div>
                <div style={{ marginTop: 16 }}>
                    <div className='body-caption-standard' style={{ color: 'var(--Neutrals-Neutrals500)' }}>
                        아래 이메일로 아이디, 휴대폰번호와 함께<br />
                        문의 내용을 보내주시면 도와드리겠습니다.
                    </div>
                    <div style={{ marginTop: 4 }}>
                        <Flex justify='center'>
                            <div className='body-caption-accent' style={{ color: 'var(--Neutrals-Neutrals500)' }}>
                                cs@postivitehote.com
                            </div>
                            <CopyIconToClipboard text={'cs@postivitehote.com'} />
                        </Flex>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default CenterSelect;