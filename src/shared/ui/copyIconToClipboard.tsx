import { ReactComponent as Copy } from '@/assets/icon/Copy.svg'
import CheckCircleSuccessCopy from '@/assets/icon/CheckCircleSuccessCopy.svg'
import copyTextToClipboard from '../utils/copyTextToClipboard';
import { NotificationArgsProps, notification } from 'antd';

type NotificationPlacement = NotificationArgsProps['placement'];

interface IProps {
    text: string | null;
}

const CopyIconToClipboard = ({ text }: IProps) => {
    const [api, contextHolder] = notification.useNotification();

    const openNotification = (placement: NotificationPlacement) => {
        api.info({
            message: <div style={{ color: 'var(--Success-Success600)' }}>복사되었어요</div>,
            icon: <CheckCircleSuccessCopy />,
            closeIcon: false,
            placement,
        });
    };

    const clickCopyIcon = () => {
        if (text) {
            const res = copyTextToClipboard(text);
            if (res) {
                openNotification('bottom')
            }
        }
    }

    return (<>
        {contextHolder}
        <Copy
            width={32}
            height={32}
            fill={'var(--Neutrals-Neutrals500)'}
            style={{ cursor: 'pointer' }}
            onClick={clickCopyIcon}
        />
    </>
    )
}
export default CopyIconToClipboard;