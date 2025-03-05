const ReservationStatusToKr = (value: string) => {
    switch (value) {
        case "INAPP_RESERVATION": return "인앱 예약";
        case "ADMIN_RESERVATION": return "관리자 예약";
        case "ONSITE_RESERVATION": return "현장 예약";
        case "MEMBER_CANCELED_RESERVATION": return "예약 취소";
        case "ADMIN_CANCELED_RESERVATION": return "예약 취소";
        case "CHECK_IN": return "출석";
        case "ABSENT": return "결석";
        default: return value;
    }
}

export default ReservationStatusToKr