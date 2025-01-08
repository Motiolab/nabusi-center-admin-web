import dayjs from "dayjs";

function LectureStartTime(startDateTime: string, endDateTime: string) {
    const startDateTimeDayjs = dayjs(startDateTime);
    const endDateTimeDayjs = dayjs(endDateTime);

    return `${startDateTimeDayjs.format("YYYY.MM.DD")} | ${startDateTimeDayjs.get('h') < 12 ? "오전" : "오후"} ${startDateTimeDayjs.format('hh:mm')} - ${endDateTimeDayjs.get('h') < 12 ? "오전" : "오후"} ${endDateTimeDayjs.format('hh:mm')}`
}

export { LectureStartTime };