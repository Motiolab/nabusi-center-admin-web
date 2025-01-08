import CardSelect from '@/shared/ui/cardSelect';
import { ShopOutlined, TeamOutlined } from '@ant-design/icons';
import UserTypes from '@/views/usertype/model/userTypes'

interface IProps {
    onClick: Function
    userType: string | undefined
}

const UserTypeCardSelect = ({ userType, onClick }: IProps) => {
    return (
        <div style={{ marginTop: 32 }}>
            <CardSelect
                icon={ShopOutlined}
                title={UserTypes.CENTER_OWNER}
                content={"센터를 운영하고 있어요"}
                userType={userType}
                onClick={() => onClick(UserTypes.CENTER_OWNER)} />
            <div style={{ marginTop: 32 }}>
                <CardSelect
                    icon={TeamOutlined}
                    title={UserTypes.COACH_MANAGER}
                    content={"센터에서 일을 하고 있어요"}
                    userType={userType}
                    onClick={() => onClick(UserTypes.COACH_MANAGER)} />
            </div>
        </div>
    )
}

export default UserTypeCardSelect