const pathToKr = (path: string): string => allStaticPath[path] ?? path;
const cNTypeToKr = (type: string): string => contactNumberType[type] ?? type;
const invertedObject = (object: { [key: string]: any }) => Object.fromEntries(Object.entries(object).map(([key, value]) => [value, key]));
const krToCNType = (type: string) => invertedObject(contactNumberType)[type];

const contactNumberType: { [key: string]: string } = { "MOBILE": "휴대폰", "LANDLINE": "유선" }
const allStaticPath: { [key: string]: string } = {
    "setting": "설정",
    "policy": "운영 정책",
    "dashboard": "대시보드",
    "linkcenter": "지점 관리",
    "wellness-ticket": "수강권 목록",
    "ticketproductregist": "수강권 등록",
    "ticketproductdetail": "수강권 등록",
    "ticketproductedit": "수강권 수정",
    "customercenter": "고객센터",
    "noticelist": "공지사항",
    "noticeregister": "공지사항",
    "noticedetail": "공지사항",
    "noticeedit": "공지사항",
    "pushalarm": "푸시 알림 발송",
    "pushalarmsend": "푸시 발송",
    "pushalaramsend": "발송 상세",
}

export { pathToKr, cNTypeToKr, invertedObject, krToCNType };