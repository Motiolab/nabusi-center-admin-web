const ticketTypeToReactNodeTag = (value: string) => {
    switch (value) {
        case 'USABLE':
            return <div className="body-caption-accent" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "53px", height: "28px", borderRadius: "var(--Radiuss)", color: "var(--Primary-Primary)", backgroundColor: "var(--Primary-Primary50)" }}>이용중</div>
        case 'PAUSED':
            return <div className="body-caption-standardp" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "53px", height: "28px", borderRadius: "var(--Radiuss)", color: "var(--Primary-Primary)", backgroundColor: "var(--Primary-Primary50)" }}>정지중</div>
        case 'UNAVAILABLE':
            return <div className="body-caption-standardp" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "85px", height: "28px", borderRadius: "var(--Radiuss)", color: "var(--Error-Error)", backgroundColor: "var(--Error-Error50)" }}>사용정지</div>
        case 'REFUND':
            return <div className="body-caption-standardp" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "41px", height: "28px", borderRadius: "var(--Radiuss)", color: "var(--Error-Error)", backgroundColor: "var(--Error-Error50)" }}>환불</div>
        case 'COUNT_EXPIRED':
            return <div className="body-caption-standardp" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "41px", height: "28px", borderRadius: "var(--Radiuss)", color: "var(--Error-Error)", backgroundColor: "var(--Error-Error50)" }}>만료</div>
        case 'PERIOD_EXPIRED':
            return
        default:
            return <div className="body-caption-standardp" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "85px", height: "28px", borderRadius: "var(--Radiuss)", color: "var(--Error-Error)", backgroundColor: "var(--Error-Error50)" }}>알수없음</div>
    }
}

const ticketValueEnToKr = (value: string) => {
    switch (value) {
        case "COUNT": return "횟수권";
        case "PERIOD": return "기간권";
        case "USABLE": return "이용중";
        case "PAUSED": return "정지중";
        case "UNAVAILABLE": return "사용 정지";
        case "REFUND": return "환불";
        case "COUNT_EXPIRED": return "횟수 만료";
        case "PERIOD_EXPIRED": return "기간 만료";
        case "NONE": return "-";
        case "MONTH": return "월간";
        case "WEEK": return "주간";
        default: return value;
    }
}
export { ticketTypeToReactNodeTag, ticketValueEnToKr };