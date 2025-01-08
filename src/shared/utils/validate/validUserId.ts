const validUserId = (id: string): boolean => {
    return /^[a-zA-Z\d]{6,12}$/.test(id) && /[a-zA-Z]/.test(id) && /\d/.test(id);
}

const validateUserIdInfo = (id: string) => {
    if (id.length < 6 || id.length > 12) {
        return "ID는 6자리에서 12자리 사이여야 합니다.";
    }
    if (!/[a-zA-Z]/.test(id)) {
        return "ID에는 최소한 하나의 영문자가 포함되어야 합니다.";
    }
    if (!/\d/.test(id)) {
        return "ID에는 최소한 하나의 숫자가 포함되어야 합니다.";
    }
    if (/^[a-zA-Z]+$/.test(id)) {
        return "ID는 영문자와 숫자를 조합해야 합니다.";
    }
    return "ID가 유효합니다.";
}

export { validUserId, validateUserIdInfo };