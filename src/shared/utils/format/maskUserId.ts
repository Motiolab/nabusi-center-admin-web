function maskUserId(userId: string) {
    // 입력된 아이디의 길이가 적어도 4자리인지 확인
    if (userId.length < 4) {
        return;
    }

    // 앞 두 글자, 가운데 7글자, 뒤 두 글자 추출
    const start = userId.slice(0, 2);
    const end = userId.slice(-2);
    const middleLength = userId.length - 4;
    const maskedMiddle = "*".repeat(middleLength);

    // 최종 포맷된 아이디 반환
    return `${start}${maskedMiddle}${end}`;
}

export { maskUserId };