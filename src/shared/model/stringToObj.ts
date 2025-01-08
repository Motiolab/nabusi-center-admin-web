function splitStringOnDoc(str: string) {
    return str.replace(/{|}/g, "").trim().split('.');
}

function formatNumber(number: string): string {
    let formattedNumber: string;
    if (number.length === 11 && /^[0-9]+$/.test(number)) {
        formattedNumber = number.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    }
    else if (number.length === 10 && /^[0-9]+$/.test(number)) {
        formattedNumber = number.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
    }
    else if (number.length === 9 && /^[0-9]+$/.test(number)) {
        formattedNumber = number.replace(/(\d{2})(\d{3})(\d{4})/, '$1-$2-$3');
    }
    else {
        formattedNumber = number;
    }
    return formattedNumber;
}

export { splitStringOnDoc, formatNumber }