const requestLinkCenterEnumToKr = (value: TRequestLinkCenterStatusEnum): TRequestLinkCenterStatusKr => {
    switch (value) {
        case "REQUESTING":
            return "미정"
        case "COMPLETE":
            return "수락";
        case "INTERRUPTED":
            return "미정";
        case "REJECT":
            return "거절";
        default:
            return "미정";
    }
}

export { requestLinkCenterEnumToKr };