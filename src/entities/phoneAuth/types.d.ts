export type MobileAuthRequestCodeRequestV1 = {
    mobile: string,
    countryCode: string
}

export type MobileAuthVerifyCodeRequestV1 = {
    mobile: string,
    code: string
}
