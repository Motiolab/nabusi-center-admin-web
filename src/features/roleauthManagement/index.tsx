

import { Flex } from "antd";
import { roleActionInfoList } from "./model/roleActionInfoList";
import { useState } from "react";
import CustomCheckbox from "@/shared/ui/CustomCheckbox";

interface IProps {
    urlPatternListByRoleName: Array<IUrlPattern> | undefined;
    onClickCheckBox: (utilization: string) => void;
    selectedRoleName: string
}

const RoleAuthManagement = ({ urlPatternListByRoleName, onClickCheckBox, selectedRoleName }: IProps) => {
    const [selectedGroupName, setSelectedGroupName] = useState<string>('대시보드 / 통계');

    return (
        <div>
            <div style={{ marginTop: 28 }}>
                <Flex wrap gap="small" style={{ alignItems: 'center' }}>
                    {roleActionInfoList.map(((roleActionInfo: IRoleActionInfo, i) =>
                        <div
                            key={i}
                            onClick={() => setSelectedGroupName(roleActionInfo.groupName)}
                            style={{
                                borderRadius: 4,
                                border: '1px solid var(--Neutrals-Neutrals200)',
                                padding: 'var(--Spacingxs) var(--Spacingsm) var(--Spacingxs) var(--Spacingsm)',
                                backgroundColor: selectedGroupName === roleActionInfo.groupName ? 'var(--Neutrals-Neutrals200)' : 'white',
                                cursor: 'pointer'
                            }}>
                            <div className="body-content-standard" style={{ color: 'var(--Base-Base-Black)' }}>{roleActionInfo.groupName}</div>
                        </div>)
                    )}
                </Flex>
            </div>
            <div style={{ marginTop: 32 }}>
                {roleActionInfoList.find(item => item.groupName === selectedGroupName)?.contents.map((item, i) => {
                    return <div key={i} style={{ marginBottom: 40 }}>
                        <CustomCheckbox
                            onChange={() => onClickCheckBox(item.actionName)}
                            style={{ fontSize: 18, fontWeight: 600 }}
                            checked={!!urlPatternListByRoleName?.find(urlPattern => urlPattern.actionName === item.actionName)}
                            disabled={selectedRoleName === 'OWNER'}
                        >{item.name}
                        </CustomCheckbox>
                        <div style={{ padding: '0px var(--Spacingl) 0px var(--Spacingl)' }}>
                            <div className="body-content-standard" style={{ color: 'var(--Neutrals-Neutrals500)' }}>{item.description}</div>
                        </div>
                        {item.children && item.children.map((subItem, j) =>
                            <div key={j} style={{ margin: '20px 0', padding: '0px 0px 0px var(--Spacingl)' }}>
                                <CustomCheckbox
                                    onChange={() => onClickCheckBox(subItem.actionName)}
                                    style={{ fontSize: 18, fontWeight: 600 }}
                                    checked={!!urlPatternListByRoleName?.find(urlPattern => urlPattern.actionName === subItem.actionName)}
                                    disabled={selectedRoleName === 'OWNER'}
                                >{subItem.name}
                                </CustomCheckbox>
                                <div style={{ padding: '0px var(--Spacingl) 0px var(--Spacingl)' }}>
                                    <div className="body-content-standard" style={{ color: 'var(--Neutrals-Neutrals500)' }}>{subItem.description}</div>
                                </div>
                            </div>
                        )}
                    </div>
                }
                )}
            </div>
        </div>
    )
}
export default RoleAuthManagement;