interface ICreateUser {
    userId: string;
    password: string;
    agreePolicyList: IAgreePolicy;
}

interface IAgreePolicy {
    isUseTerms: boolean;
    isPersonalInformation: boolean;
    isSms: boolean;
    isEmail: boolean;
    isAppPush: boolean;
}