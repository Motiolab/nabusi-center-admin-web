import { ReactComponent as Home } from "@/assets/icon/Home.svg";
import { ReactComponent as User } from "@/assets/icon/Users.svg";
import { ReactComponent as Coach } from "@/assets/icon/Coach.svg"
import { ReactComponent as Ticket } from "@/assets/icon/Ticket.svg"
import { ReactComponent as Support } from "@/assets/icon/Support.svg"
import { ReactComponent as ChartBar } from "@/assets/icon/ChartBar.svg"
import { ReactComponent as Setting } from "@/assets/icon/Setting.svg"


const navMenuItemLis: ILayoutMenu[] = [
    {
        text: "홈",
        iconSvg: <Home width={24} height={24} />,
        href: "/"
    },
    {
        text: "회원",
        iconSvg: <User width={24} height={24} />,
        href: "/member"
    },
    {
        text: "강사",
        iconSvg: <Coach width={24} height={24} />,
        href: "/teacher"
    },
    {
        text: "수업",
        iconSvg: <Coach width={24} height={24} />,
        href: "/wellness-class"
    },
    {
        text: "수강권",
        iconSvg: <Ticket width={24} height={24} />,
        href: "/wellness-ticket"
    },
    {
        text: "고객센터",
        isHaveChild: true,
        children: [
            {
                text: "공지사항",
                iconSvg: <Home width={24} height={24} />,
                href: "/notice"
            },
            // {
            //     text: "푸시 알림 발송",
            //     iconSvg: <Home width={24} height={24} />,
            //     href: "/customercenter/pushalarm"
            // },
        ],
    },
    {
        text: "설정",
        isHaveChild: true,
        children: [
            {
                text: "운영 정책",
                iconSvg: <Home width={24} height={24} />,
                href: "/setting/policy"
            },
            {
                text: "권한 관리",
                iconSvg: <Home width={24} height={24} />,
                href: "/setting/authmanagement"
            },
            // {
            //     text: "지점 관리",
            //     iconSvg: <Home width={24} height={24} />,
            //     href: "/setting/linkcenter"
            // },
        ],
    },
]


export { navMenuItemLis }