import { DropDownMenu } from "@/features";
import { maskLongString, maskString } from "@/shared";
import { Button, TableColumnsType } from "antd";
import { ReactComponent as MoreH } from "@/assets/icon/MoreH.svg";
import { patchCenterDataLink } from "@/widgets/linkcenter/api";

const LinkRequestTypeTobRender = (value: TRequestLinkCenterStatusKr, selectedCenterId: number, linkCenter: IRequestLinkCenter, setSelectCenter?: React.Dispatch<React.SetStateAction<any>>, rejectRequest?: () => void) => {
    switch (value) {
        case "미정":
            return <div style={{ display: "flex", gap: "var(--Spacingbase)", justifyContent: "space-between", width: "100%", marginLeft: "20px", textAlign: "center" }}><Button style={{ height: "32px", width: "45%", padding: "var(--Spacingxs) var(--Spacingm) var(--Spacingxs) var(--Spacingm)" }} onClick={() => rejectRequest?.()}>수락</Button> <Button style={{ border: "1px solid var(--Error-Error)", height: "32px", width: "45%", padding: "var(--Spacingxs) var(--Spacingm) var(--Spacingxs) var(--Spacingm)", borderRadius: "var(--Spacingxs)", backgroundColor: "var(--Base-Base-White)", color: "var(--Error-Error)" }} onClick={() => linkCenter.id && patchCenterDataLink({ id: linkCenter.id, status: "REJECT" }, selectedCenterId).finally(() => setSelectCenter?.({}))}>거절</Button></div>
        case "수락":
            return <div style={{ marginLeft: "20px", maxWidth: "41px", border: "1px solid var(--Neutrals-Neutrals500)", borderRadius: "var(--Radiuss)", padding: "var(--Spacingxxs) var(--Spacings) var(--Spacingxxs) var(--Spacings)", height: "22px", textAlign: "center", fontWeight: 600, color: "var(--Neutrals-Neutrals500)", backgroundColor: "var(--Neutrals-Neutrals50)" }}>
                {value}
            </div>
        case "거절":
            return <div style={{ marginLeft: "20px", maxWidth: "41px", border: "1px solid var(--Error-Error)", borderRadius: "var(--Radiuss)", padding: "var(--Spacingxxs) var(--Spacings) var(--Spacingxxs) var(--Spacings)", height: "22px", textAlign: "center", fontWeight: 600, color: "var(--Error-Error)", backgroundColor: "#E4626F1A" }}>
                {value}
            </div>
        default:
            return <div style={{ marginLeft: "20px", borderRadius: "var(--Radiuss)", padding: "var(--Spacingxxs) var(--Spacings) var(--Spacingxxs) var(--Spacings)", width: "52px", height: "22px", textAlign: "center", fontWeight: 600 }}>
                {value}
            </div>
    }
}

const undefinedRequest = { value: "", iconSvg: "" };
const acceptRequest = (onClick?: () => void) => ({ value: "연동 취소", style: { color: "var(--Error-Error)" }, iconSvg: "", onClick });
const rejectRequest = (onClick?: () => void) => ({ value: "연동 수락", iconSvg: "", onClick });

const LinkRequestTypeToItem = (value: string, rejectOnClick?: () => void, acceptOnClck?: (status: TLinkCenterStatusEnum) => void): IDropDown[] => {
    switch (value) {
        case "미정":
            return [undefinedRequest];
        case "수락":
            return [acceptRequest(() => acceptOnClck?.("INTERRUPTED"))];
        case "거절":
            return [rejectRequest(() => rejectOnClick?.())];
        default:
            return [undefinedRequest];
    }
}

interface IProps {
    styles: {
        readonly [key: string]: string;
    }
    setMoreBtnClickStatusList: React.Dispatch<React.SetStateAction<boolean[]>>;
    moreBtnClickStatusList: boolean[];
    setAcceptRequestModalStatus: React.Dispatch<React.SetStateAction<boolean>>;
    selectCenter: any
    setSelectCenter: React.Dispatch<React.SetStateAction<any>>;
    selectedCenterId: number;
}

const LinkRequestStatusRender = (value: any, moreBtnClickStatusList: any, selectedCenterId: number, linkCenter: IRequestLinkCenter, idx: any, moreBtnToggle: any, icon: any, rejectRequest?: () => void, acceptOnClck?: (status: TLinkCenterStatusEnum) => void, setSelectCenter?: React.Dispatch<React.SetStateAction<any>>) => {
    return <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {LinkRequestTypeTobRender(value, selectedCenterId, linkCenter, setSelectCenter, rejectRequest)}
        {icon && <>
            <div style={{ cursor: "pointer", backgroundColor: moreBtnClickStatusList[idx] ? "var(--Neutrals-Neutrals100)" : "transparent", display: "flex", alignItems: "center", padding: "var(--Spacings)" }} onClick={() => moreBtnToggle(idx)}>
                {icon}
            </div>
            <DropDownMenu className={`${moreBtnClickStatusList[idx] ? "show" : ""}`} dropDownItemList={LinkRequestTypeToItem(value, () => rejectRequest?.(), (status: TLinkCenterStatusEnum) => acceptOnClck?.(status))} styles={{ menu: { top: "calc(100% - 16px)", right: "16px", width: "calc(100% - 32px)", maxWidth: "200px" } }} allIconShow />
        </>}
    </div>
}


const linkRequestCenterColumns = ({ styles, setMoreBtnClickStatusList, moreBtnClickStatusList, setAcceptRequestModalStatus, selectCenter, setSelectCenter, selectedCenterId }: IProps): TableColumnsType<IRequestLinkCenter> => {
    const moreBtnToggle = (idx: number) => setMoreBtnClickStatusList((prevState) => { const updatedList = [...prevState]; updatedList[idx] = !updatedList[idx]; return updatedList; })
    return [
        {
            title: "요청한 센터", dataIndex: "centerName", className: styles.tableColumnFill
        },
        {
            title: "Owner 이름", dataIndex: "ownerName", className: styles.tableColumnFill, render: value => maskString(value),
        },
        {
            title: "Owner 아이디", dataIndex: "userId", className: styles.tableColumnFill, render: value => maskLongString(value),
        },
        {
            title: "수락 상태", dataIndex: "status", className: styles.tableColumnFixed, width: "200px"
            , render: (value, linkCenter, idx) =>
                LinkRequestStatusRender(value, moreBtnClickStatusList, selectedCenterId, linkCenter, idx, moreBtnToggle, value === "미정" ? undefined : <MoreH width={16} height={16} />,
                    () => { setAcceptRequestModalStatus(true); setSelectCenter(linkCenter); moreBtnToggle(idx) },
                    (status: TLinkCenterStatusEnum) => { linkCenter.id && patchCenterDataLink({ id: linkCenter.id, status }, selectedCenterId).finally(() => { setSelectCenter(linkCenter); moreBtnToggle(idx) }) },
                    setSelectCenter
                )

        },
    ];
}

export { linkRequestCenterColumns }