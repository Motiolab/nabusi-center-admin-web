import { DropDownMenu } from "@/features";
import { maskLongString, maskString } from "@/shared";
import { TableColumnsType } from "antd";
import { ReactComponent as MoreH } from "@/assets/icon/MoreH.svg";
import { patchCenterDataLink } from "../api";

const linkTypeTobackgroundColor = (value: string) => {
    switch (value) {
        case "요청 중":
            return { color: "var(--Neutrals-Neutrals500)", backgroundColor: "var(--Neutrals-Neutrals50)", border: "1px solid var(--Neutrals-Neutrals500)", };
        case "연동 완료":
            return { color: "var(--Primary-Primary)", backgroundColor: "var(--Primary-Primary100)", border: "1px solid var(--Primary-Primary)", };
        case "연동 중단":
            return { color: "var(--Warning-Warning200)", backgroundColor: "#F4C7901A", border: "1px solid var(--Warning-Warning)", };
        case "요청 거부":
            return { color: "var(--Error-Error)", backgroundColor: "#E4626F1A", border: "1px solid var(--Error-Error)", };
        default:
            return { color: "var(--Neutrals-Neutrals500)", backgroundColor: "var(--Neutrals-Neutrals50)", border: "1px solid var(--Neutrals-Neutrals500)", };
    }
}
const linkCenterDelete = ((onClick?: () => void) => ({ value: "지점 삭제", style: { color: "var(--Error-Error)" }, iconSvg: "/assets/icon/Trash.svg", onClick }));
const reConnection = (onClick?: () => void) => ({ value: "재연동", iconSvg: "/assets/icon/Restart.svg", onClick })
const requestCancel = (onClick?: () => void) => ({ value: "요청 취소", iconSvg: "", onClick })
const reRequest = { value: "재요청", iconSvg: "/assets/icon/Mail.svg" }


const linkTypeToItem = (value: string, linkCenter: ILinkCenter, onClickDelete?: () => void, onClickPatch?: (status: TLinkCenterStatusEnum) => void): IDropDown[] => {
    switch (value) {
        case "요청 중":
            return [requestCancel(() => onClickPatch?.("INTERRUPTED"))];
        case "연동 완료":
            return [linkCenterDelete(onClickDelete)];
        case "연동 중단":
            return [reConnection(() => onClickPatch?.("COMPLETE")), linkCenterDelete(onClickDelete)];
        case "요청 거부":
            return [reRequest, linkCenterDelete(onClickDelete)];
        default:
            return [{ value: "", iconSvg: "" }];
    }
}

interface IProps {
    styles: {
        readonly [key: string]: string;
    }
    setBranchDeleteModalStatus: React.Dispatch<React.SetStateAction<boolean>>;
    setMoreBtnClickStatusList: React.Dispatch<React.SetStateAction<boolean[]>>;
    moreBtnClickStatusList: boolean[];
    setSelectCenter: React.Dispatch<React.SetStateAction<any>>;
    setRerender: React.Dispatch<React.SetStateAction<boolean>>;
    selectedCenterId: number;
}

const linkCenterSetColumns = ({ styles, setBranchDeleteModalStatus, setMoreBtnClickStatusList, moreBtnClickStatusList, setSelectCenter, setRerender, selectedCenterId }: IProps): TableColumnsType<ILinkCenter> => {
    const moreBtnToggle = (idx: number) => setMoreBtnClickStatusList((prevState) => { const updatedList = [...prevState]; updatedList[idx] = !updatedList[idx]; return updatedList; })
    return [
        {
            title: "지점명", dataIndex: "centerName", className: styles.tableColumnFill
        },
        {
            title: "지점 Owner 이름", dataIndex: "ownerName", className: styles.tableColumnFill, render: value => maskString(value),
        },
        {
            title: "지점 Owner 아이디", dataIndex: "userId", className: styles.tableColumnFill, render: value => maskLongString(value),
        },
        {
            title: "연동 상태", dataIndex: "status", className: styles.tableColumnFixed, width: "200px"
            , render: (value, linkCenter, idx) =>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ ...linkTypeTobackgroundColor(value), borderRadius: "var(--Radiuss)", padding: "var(--Spacingxxs) var(--Spacings) var(--Spacingxxs) var(--Spacings)", width: "52px", height: "22px", textAlign: "center", fontWeight: 600 }}>
                        {value}
                    </div>
                    <div style={{ cursor: "pointer", backgroundColor: moreBtnClickStatusList[idx] ? "var(--Neutrals-Neutrals100)" : "transparent", display: "flex", alignItems: "center", padding: "var(--Spacings)" }} onClick={() => moreBtnToggle(idx)}>
                        <MoreH width={16} height={16} />
                    </div>
                    <DropDownMenu className={`${moreBtnClickStatusList[idx] ? "show" : ""}`} dropDownItemList={linkTypeToItem(value, linkCenter, () => { setBranchDeleteModalStatus(true); setSelectCenter(linkCenter); setRerender(c => !c); moreBtnToggle(idx) }, (status: TLinkCenterStatusEnum) => { linkCenter.id && patchCenterDataLink({ id: linkCenter.id, status }, selectedCenterId).finally(() => { setRerender(c => !c); moreBtnToggle(idx) }) })} styles={{ menu: { top: "calc(100% - 16px)", right: "16px", width: "calc(100% - 32px)", maxWidth: "200px" } }} allIconShow />
                </div>,
        },
    ];
}

export { linkCenterSetColumns }