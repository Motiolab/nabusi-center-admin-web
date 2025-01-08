

import { Tabs, TabsProps } from "antd";
import './index.css'
import FindIdWithMobile from "@/features/findIdwithmobile";
import FindPasswordWithMobile from "@/features/findPasswordwithmobile";

const items: TabsProps['items'] = [
    {
        key: '1',
        label: <div style={{ width: '50%' }}>아이디 찾기</div>,
        children: <FindIdWithMobile />,
    },
    {
        key: '2',
        label: <div>비밀번호 재설정</div>,
        children: <FindPasswordWithMobile />,
    },
];

const FindAccountWidget = () => {
    return (
        <div>
            <Tabs
                size="large"
                className="custom-tabs"
                defaultActiveKey="1"
                items={items}
                onChange={(key: string) => { console.log(key) }}
                tabBarStyle={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }} />
        </div>
    )
}

export default FindAccountWidget;