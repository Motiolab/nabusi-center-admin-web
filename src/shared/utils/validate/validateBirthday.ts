const validateBirthDay = (birthDay: string) => {
    // 날짜 형식을 yyyy-mm-dd로 확인
    const regex = /^\d{4}.\d{2}.\d{2}$/;
    if (!regex.test(birthDay)) {
        return false;
    }

    // 날짜 문자열을 분리하여 숫자로 변환
    const [year, month, day] = birthDay.split('.').map(Number);

    // 월이 1~12 범위 내에 있는지 확인
    if (month < 1 || month > 12) {
        return false;
    }

    // 각 월의 일자 수를 지정
    const daysInMonth = [31, (isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // 일이 해당 월의 일자 수 내에 있는지 확인
    if (day < 1 || day > daysInMonth[month - 1]) {
        return false;
    }

    // 날짜가 현재 날짜보다 과거인지 확인
    const today = new Date();
    const inputDate = new Date(year, month - 1, day);
    if (inputDate >= today) {
        return false;
    }

    return true;
};

// 윤년 확인 함수
function isLeapYear(year: number) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

export { validateBirthDay }