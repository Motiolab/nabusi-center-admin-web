interface IRoleActionInfo {
    groupName: string;
    contents: Content[];
}

interface Content {
    actionName: string;
    name: string;
    description: string;
    children?: Content[];
}
