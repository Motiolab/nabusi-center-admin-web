import { logout } from "@/entities/account"
import { removeLocalAccessToken } from "@/shared/utils/token"

const dropDownItemLis: IDropDown[] = [
    { value: "마이페이지", href: "/setting/policy" },
    { value: "다른 센터 선택", href: "/centerselect" },
    { value: "로그아웃", href: "#", className: "logout", onClick: () => { removeLocalAccessToken(); logout() } },
]

export { dropDownItemLis }