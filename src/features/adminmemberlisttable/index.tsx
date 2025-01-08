import { Table } from "antd";
import { createColumns } from './model/columnInfo';
import { TableRowSelection } from "antd/es/table/interface";

interface DataType {
    key: React.Key;
    memberId: number
    name: string
    mobile: string
    email: string
    roleName: string
    roleId: number
}

interface IProps {
    adminMemberList: Array<IAdminMemberByCenter>
    selectedRowKeys: React.Key[],
    setSelectedRowKeys: Function,
    selectionType: 'checkbox' | 'radio',
    setSelectionType: (type: 'checkbox' | 'radio') => void
    roleInfoList: IGetRoleInfoByCenterIdResponseV1[],
    clickChangeRole: (roleId: number, memberId: number) => void
}



const AdminMemberListTable = ({ selectionType, setSelectionType, adminMemberList, selectedRowKeys, setSelectedRowKeys, roleInfoList, clickChangeRole }: IProps) => {
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection: TableRowSelection<DataType> = {
        selectedRowKeys,
        onChange: onSelectChange,
        getCheckboxProps: (record: DataType) => ({
            disabled: record.roleName === 'OWNER',
            name: record.name,
        }),
    };

    const rolePriority: Record<string, number> = { OWNER: 1, MANAGER: 2 };

    const sortedAdminMemberList = adminMemberList
        .map((adminMember) => ({ ...adminMember, key: adminMember.memberId }))
        .sort((a, b) => {
            const priorityA = rolePriority[a.roleName as keyof typeof rolePriority] || 999;
            const priorityB = rolePriority[b.roleName as keyof typeof rolePriority] || 999;

            if (priorityA !== priorityB) {
                return priorityA - priorityB;
            } else {
                return a.roleName.localeCompare(b.roleName);
            }
        });

    return (
        <>
            <Table
                rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                }}
                columns={createColumns(selectionType, setSelectionType, roleInfoList, clickChangeRole)}
                dataSource={sortedAdminMemberList}
                pagination={false}
            />
        </>
    );
};

export default AdminMemberListTable;