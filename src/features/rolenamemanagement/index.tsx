import { Flex, Input } from "antd";
import { orderingRoleName } from "./util/orderingRoleName";
import { ReactComponent as Check } from '@/assets/icon/Check.svg';
import { ReactComponent as Vector } from "@/assets/icon/Vector.svg"
import { useState } from "react";

interface IProps {
    roleNameList: Array<string>;
    selectedRoleName: string;
    onSelectRoleName: Function;
    addRoleName: (newRoleName: string) => void;
}

const RoleNameManagement = ({ roleNameList, selectedRoleName, onSelectRoleName, addRoleName }: IProps) => {
    const [isOpenNewRoleInput, setIsOpenNewRoleInput] = useState<boolean>(false)
    const [newRoleName, setNewRoleName] = useState<string>('');

    const clickCheckIcon = () => {
        if (newRoleName === '') {
            return alert("새로운 역할 이름을 입력해 주세요.");
        }
        addRoleName(newRoleName);
        setIsOpenNewRoleInput(false);
    }

    return (
        <div>
            {orderingRoleName(roleNameList).map((roleName: string, i) => {
                return <div
                    style={{ padding: 14, borderBottom: i === roleNameList.length - 1 ? 'none' : '1px solid var(--Neutrals-Neutrals200)', cursor: 'pointer' }}
                    onClick={() => onSelectRoleName(roleName)}
                    key={i}
                >
                    <Flex justify="space-between" style={{ alignItems: 'center' }}>
                        <div className="body-caption-standard" style={{ color: 'var(--Base-Base-Black)' }}>
                            {roleName}
                        </div>
                        {selectedRoleName === roleName && <div><Check /></div>}
                    </Flex>
                </div>
            })}

            {!isOpenNewRoleInput ?
                <div style={{ padding: 14, textAlign: 'center' }}>
                    <div
                        className="body-content-accent"
                        style={{ color: 'var(--Primary-Primary)', cursor: 'pointer' }}
                        onClick={() => setIsOpenNewRoleInput(true)}
                    >
                        새로운 역할 추가
                    </div>
                </div> : <Flex justify="space-between" style={{ alignItems: 'center' }}>
                    <Input
                        placeholder="최대 10자"
                        size="large"
                        onChange={(e) => setNewRoleName(e.target.value)}
                    />
                    <div
                        style={{ padding: 8, cursor: 'pointer' }}
                        onClick={clickCheckIcon}
                    ><Check /></div>
                    <div
                        style={{ padding: 8, cursor: 'pointer' }}
                        onClick={() => setIsOpenNewRoleInput(false)}
                    ><Vector /></div>
                </Flex>}
        </div>
    )
}
export default RoleNameManagement