interface ICreateAccountSecurityServer {
    userId: String;
    password: String;
    mobile: String;
    domain: String;
}
interface IToken {
    accessToken: string;
    accessTokenExpiresIn: number;
    grantType: string;
    refreshToken: string;
}
interface IChangePasswordRequest {
    code: string
    password: string
}

interface IAddRoleAccountSecurityServer {
    roleName: string;
}