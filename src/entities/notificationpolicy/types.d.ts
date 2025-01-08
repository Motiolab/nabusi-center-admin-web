interface INotificationPolicy {
    id?: number;
    centerId: number;
    autoReservationText: string;
    isActiveAutoReservation: boolean;
    startClassBeforeText: string;
    isStartClassBefore: boolean;
    classAutoCancelText: string;
    isClassAutoCancel: boolean;
    ticketExpireText: string;
    isTicketExpire: boolean;
    ticketRemainingText: string;
    isTicketRemaining: boolean;
    ticketStopExpireText: string;
    isTicketStopExpire: boolean;
    happyBirthdayText: string;
    isHappyBirthday: boolean;
}