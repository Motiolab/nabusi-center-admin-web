interface ICreateCenter {
    name: string;
    address: string;
    detailAddress: string;
    roadName: string;
}
interface IRegisterCenterInfoRes {
    isSuccess: boolean;
    centerCode: string;
}

interface IGetRoleAndUrlPatternResponseV1 {
    id: number;
    centerId: number;
    description: string;
    name: string;
    isActive: boolean;
    urlPatternList: Array<IUrlPattern>;
}

interface IUrlPattern {
    id: number;
    actionName: string;
    url: string;
    method: string;
    description: string;
}
// interface IRoleFunctionRes {
//     id: number;
//     centerId: number;
//     roleFunctionName: string;
//     roleName: string;
//     isActive: boolean;
// }

interface IUpdateRoleFunctionRequest {
    id: number;
    centerId: number;
    roleName: string;
    roleFunctionName: string;
    isActive: boolean;
}

interface IGetRoleInfoByCenterIdResponseV1 {
    id: number
    name: string
}