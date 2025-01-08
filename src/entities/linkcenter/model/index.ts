const linkCenterEnumToKr = (value: TLinkCenterStatusEnum): TLinkCenterStatusKr => {
    switch (value) {
        case "REQUESTING":
            return "요청 중"
        case "COMPLETE":
            return "연동 완료";
        case "INTERRUPTED":
            return "연동 중단"
        case "REJECT":
            return "요청 거부";
        default:
            return "연동 중단";
    }
}
const linkCenterKrToEnum = (value: TLinkCenterStatusKr): TLinkCenterStatusEnum => {
    switch (value) {
        case "요청 중":
            return "REQUESTING";
        case "연동 완료":
            return "COMPLETE";
        case "연동 중단":
            return "INTERRUPTED";
        case "요청 거부":
            return "REJECT";
        default:
            return "INTERRUPTED";
    }
}
export { linkCenterEnumToKr, linkCenterKrToEnum };