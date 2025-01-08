const validatePassword = (password: string) => {
    // 패스워드 길이가 8자 이상, 16자 이하여야 함
    const isLengthValid = password.length >= 8 && password.length <= 16;
    // 소문자, 대문자, 숫자, 특수 문자 중 2개 이상을 포함해야 함
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const validComponents = [hasLowerCase, hasUpperCase, hasNumber, hasSpecialChar].filter(Boolean).length;
    const isStrong = validComponents >= 2;

    return {
        isLengthValid,
        isStrong
    };
};

export { validatePassword }