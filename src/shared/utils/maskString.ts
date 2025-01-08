const maskString = (value: string) => {
    if (!value) return;
    if (value?.length === 1) {
        return value; // 한 글자인 경우 그대로 반환
    }
    if (value?.length === 2) {
        return `${value[0]}*`; // 두 글자인 경우 뒤 하나만 마스킹
    }
    const firstChar = value[0];
    const lastChar = value[value?.length - 1];
    const maskedChars = "*".repeat(value.length - 2);
    return `${firstChar}${maskedChars}${lastChar}`;
};
const maskLongString = (value: string) => {
    if (!value) return;
    if (value?.length <= 4) {
        return maskString(value);
    }
    const firstTwoChars = value?.slice(0, 2);
    const lastTwoChars = value?.slice(-2);
    const maskedChars = "*".repeat(value?.length - 4);
    return `${firstTwoChars}${maskedChars}${lastTwoChars}`;
};


export { maskString, maskLongString };