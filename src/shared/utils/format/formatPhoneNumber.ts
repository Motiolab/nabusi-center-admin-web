function formatPhoneNumber(phoneNumber: string) {
    // 입력된 숫자만 있는 문자열의 길이가 10인지 확인
    if (phoneNumber.length > 12) {
        return;
    }

    // 정규식을 사용하여 전화번호 형식으로 변환
    const formattedNumber = phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');

    return formattedNumber;
}

export { formatPhoneNumber }