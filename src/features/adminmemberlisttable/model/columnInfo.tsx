import { Dropdown, Flex, TableColumnsType } from "antd";
import { DownOutlined } from '@ant-design/icons';
import { ReactComponent as MoreH } from "@/assets/icon/MoreH.svg";
import { ReactComponent as Check } from '@/assets/icon/Check.svg';

interface DataType {
    key: React.Key;
    memberId: number;
    name: string;
    mobile: string;
    email: string;
    roleName: string;
    roleId: number;
}

const ownerItems = (setSelectionType: (type: 'checkbox' | 'radio') => void) => [
    {
        key: '1',
        label: (
            <Flex style={{ color: 'var(--Neutrals-Neutrals400)' }}>
                <div style={{ width: 165 }}>OWNER</div>
                <div>
                    <Check fill="#A4ADB6" />
                </div>
            </Flex>
        ),
        danger: true,
        disabled: true,
    },
    {
        key: '4',
        label: <div style={{ width: 165 }}>권한 넘기기</div>,
        onClick: () => setSelectionType('radio'),
    },
];

const createColumns = (
    selectionType: 'checkbox' | 'radio',
    setSelectionType: (type: 'checkbox' | 'radio') => void,
    roleInfoList: IGetRoleInfoByCenterIdResponseV1[],
    clickChangeRole: (roleId: number, memberId: number) => void
): TableColumnsType<DataType> => {
    const baseColumns: TableColumnsType<DataType> = [
        { title: '이름', dataIndex: 'name', key: 'name' },
        { title: '휴대폰 번호', dataIndex: 'mobile', key: 'mobile' },
        { title: '이메일', dataIndex: 'email', key: 'email' },
        { title: '역할', dataIndex: 'roleName', key: 'roleName' },
    ];

    if (selectionType === 'checkbox') {
        baseColumns.push({
            title: '',
            key: 'operation',
            render: (_, record: DataType) => {
                const menuItems = record.roleName === "OWNER"
                    ? ownerItems(setSelectionType)
                    : roleInfoList
                        .filter((roleInfo: IGetRoleInfoByCenterIdResponseV1) => roleInfo.name !== 'OWNER')
                        .map((roleInfo: IGetRoleInfoByCenterIdResponseV1, index) => ({
                            key: index,
                            label: <div style={{ width: 165 }}>{roleInfo.name}</div>,
                            onClick: () => clickChangeRole(roleInfo.id, record.memberId),
                        }));

                return (
                    <Dropdown menu={{ items: menuItems }} trigger={['click']} placement="bottomRight">
                        {record.roleName === "OWNER" ? <MoreH /> : <DownOutlined />}
                    </Dropdown>
                );
            },
        });
    }

    return baseColumns;
};

export { createColumns };