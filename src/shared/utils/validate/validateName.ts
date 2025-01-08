const validateName = (text: string) => {
    const consonantsAndVowelsRegex = /[ㄱ-ㅎㅏ-ㅣ]/;
    const numbersRegex = /[0-9]/;

    if (consonantsAndVowelsRegex.test(text)) {
        //입력에 자음 또는 모음이 포함되어 있습니다.
        return false;
    } else if (numbersRegex.test(text)) {
        //입력에 숫자가 포함되어 있습니다.
        return false;
    } else {
        return true;
    }
};

export { validateName }