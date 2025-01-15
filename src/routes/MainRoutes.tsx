
import { CheckSelectedCenterId } from '@/shared';
import Home from '@/views/home';
import Member from '@/views/member';
import MemberDetail from '@/views/member/detail';
import Notice from '@/views/notice';
import NoticeCreate from '@/views/notice/create';
import NoticeUpdate from '@/views/notice/update';
import { NoticeList } from '@/views/noticelist/ui';
import { PushAlaram } from '@/views/pushalarm/ui';
import AuthManagement from '@/views/setting/authmanagement';
import { LinkCenterView } from '@/views/setting/branch/ui';
import { PolicyView } from '@/views/setting/policy/ui';
import Teacher from '@/views/teacher';
import TeacherDetail from '@/views/teacher/detail';
import WellnessLectureCreate from '@/views/wellnessLecture/create';
import WellnessLectureDetail from '@/views/wellnessLecture/detail';
import WellnessLectureUpdate from '@/views/wellnessLecture/update';
import WellnessClass from '@/views/wellnessclass';
import WellnessTicket from '@/views/wellnessticket';
import WellnessTicketCreate from '@/views/wellnessticket/create';
import WellnessTicketDetail from '@/views/wellnessticket/detail';
import WellnessTicketUpdate from '@/views/wellnessticket/update';
import WellnessTicketIssuanceUpdate from '@/views/wellnessticketissuance/update';
import { LayoutLeft, LayoutTop } from '@/widgets';
import { Outlet, RouteObject } from 'react-router-dom';

const MainRoutes: RouteObject = {
        path: '/',
        element: <div style={{ display: 'flex', height: '100%', width: '100%' }}>
                <LayoutLeft />
                <LayoutTop >
                        <Outlet />
                </LayoutTop>
                <CheckSelectedCenterId />
        </div>,
        children: [
                { path: '/', element: <Home /> },
                { path: '/setting/policy', element: <PolicyView /> },
                { path: '/setting/authmanagement', element: <AuthManagement /> },
                { path: '/setting/linkcenter', element: <LinkCenterView /> },
                { path: '/setting/linkcenter', element: <LinkCenterView /> },
                { path: '/customercenter/noticelist', element: <NoticeList /> },
                { path: '/customercenter/pushalarm', element: <PushAlaram /> },
                { path: '/wellness-ticket', element: <WellnessTicket /> },
                { path: '/wellness-ticket/:id', element: <WellnessTicketDetail /> },
                { path: '/wellness-ticket/create', element: <WellnessTicketCreate /> },
                { path: '/wellness-ticket/update/:id', element: <WellnessTicketUpdate /> },
                { path: '/wellness-class', element: <WellnessClass /> },
                { path: '/wellness-class/create', element: <WellnessLectureCreate /> },
                { path: '/wellness-lecture/detail/:id', element: <WellnessLectureDetail /> },
                { path: '/wellness-lecture/update/:id', element: <WellnessLectureUpdate /> },
                { path: '/member', element: <Member /> },
                { path: '/member/detail/:id', element: <MemberDetail /> },
                { path: '/teacher', element: <Teacher /> },
                { path: '/teacher/detail/:id', element: <TeacherDetail /> },
                { path: '/wellness-ticket-issuance/update/:id', element: <WellnessTicketIssuanceUpdate /> },
                { path: '/notice', element: <Notice /> },
                { path: '/notice/create', element: <NoticeCreate /> },
                { path: '/notice/update/:id', element: <NoticeUpdate /> },
        ],
};

export default MainRoutes;