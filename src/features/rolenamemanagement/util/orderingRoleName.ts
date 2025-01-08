const orderingRoleName = (roleNameList: Array<string>) => {
    const fixedOrder = ["OWNER", "매니저", "강사"];

    const fixedElements = fixedOrder.filter(item => roleNameList.includes(item));
    const remainingElements = roleNameList.filter(item => !fixedOrder.includes(item));

    const uniqueArray = remainingElements.filter((item, index) => remainingElements.indexOf(item) === index);
    return [...fixedElements, ...uniqueArray];
}

export { orderingRoleName }