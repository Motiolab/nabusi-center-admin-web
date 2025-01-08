const roleActionInfoList: Array<IRoleActionInfo> = [
    {
        groupName: '대시보드 / 통계',
        contents: [{
            actionName: 'HOME',
            name: "홈",
            description: "수업 스케줄을 확인할 수 있습니다."
        }, {
            actionName: 'DASHBOARD',
            name: "예약, 출석률 조회",
            description: "예약률, 출석률을 확인할 수 있습니다."
        }]
    }, {
        groupName: '회원 / 강사',
        contents: [{
            actionName: 'MEMBER_LIST_VIEW',
            name: "회원",
            description: "회원 목록 조회 및 엑셀파일로 다운로드 할 수 있습니다.",
            children: [{
                actionName: 'MEMBER_MANAGE',
                name: "회원 등록 / 수정 / 삭제",
                description: "회원을 새롭게 등록하거나 기존 회원 정보를 수정 및 삭제할 수 있습니다."
            }, {
                actionName: 'MEMBER_TICKET_MANAGE',
                name: "회원 수강권 발급 / 수정 / 삭제",
                description: "회원의 수강권을 발급하거나, 발급된 수강권을 수정 및 삭제할 수 있습니다."
            }]
        }, {
            actionName: 'TEACHER_LIST_VIEW',
            name: "강사",
            description: "전체 강사 목록을 조회할 수 있습니다.",
            children: [{
                actionName: 'TEACHER_MANAGE',
                name: "강사 등록 / 수정 / 삭제",
                description: "강사를 새롭게 등록하거나 기존 강사 정보를 수정 및 삭제 할 수 있습니다."
            }]
        }]
    }, {
        groupName: '수업',
        contents: [{
            actionName: 'OWN_CLASS_LIST_VIEW',
            name: "본인 수업",
            description: "본인 수업만 조회할 수 있습니다.",
            children: [{
                actionName: 'OWN_CLASS_MANAGE',
                name: "본인 수업 등록 / 수정 / 삭제",
                description: "본인의 수업을 새롭게 등록하거나 기존 수업 정보를 수정 및 삭제할 수 있습니다."
            },
            {
                actionName: 'OWN_CLASS_STUDENT_MANAGE',
                name: "본인 수업 예약 변경 및 취소",
                description: "본인 수업의 회원 예약, 출결 상태를 변경 할 수 있습니다."
            }]
        },
        {
            actionName: 'ALL_CLASS_LIST_VIEW',
            name: "전체 수업",
            description: "본인 외 전체 수업을 조회할 수 있습니다.",
            children: [{
                actionName: 'ALL_CLASS_MANAGE',
                name: "전체 수업 등록 / 수정 / 삭제",
                description: "본인 외 전체 수업을 등록하거나 기존 수업 정보를 수정 및 삭제할 수 있습니다."
            },
            {
                actionName: 'ALL_CLASS_STUDENT_MANAGE',
                name: "전체 수업 예약 변경 / 취소",
                description: "전체 수업의 회원 예약, 출결 상태를 변경 할 수 있습니다."
            }]
        }]
    }, {
        groupName: '수강권',
        contents: [{
            actionName: 'TICKET_LIST_VIEW',
            name: "수강권",
            description: "전체 수강권 목록을 조회할 수 있습니다.",
            children: [{
                actionName: 'TICKET_MANAGE',
                name: "수강권 등록 / 수정 / 삭제",
                description: "수강권을 새롭게 등록하거나 기존 수강권을 수정 및 삭제할 수 있습니다."
            }, {
                actionName: 'ISSUED_TICKET_MANAGE',
                name: "발급된 수강권 수정",
                description: "발급된 수강권의 정보를 수정할 수 있습니다."
            }, {
                actionName: 'ISSUED_TICKET_DATE_MANAGE',
                name: "발급된 수강권 일괄 연장",
                description: "발급된 수강권의 기한을 일괄로 연장하거나 수정할 수 있습니다."
            }]
        }]
    }, {
        groupName: '고객센터',
        contents: [{
            actionName: 'NOTICE_LIST_VIEW',
            name: "공지사항",
            description: "공지사항 게시글을 조회할 수 있습니다.",
            children: [{
                actionName: 'NOTICE_MANAGE',
                name: "공지사항 게시글 등록 / 수정 / 삭제",
                description: "공지사항 게시글을 등록하거나 수정 및 삭제할 수 있습니다."
            }]
        }, {
            actionName: 'INQUIRY_MANAGE',
            name: "문의",
            description: "회원에게 온 문의를 조회하고 답변할 수 있습니다."
        }, {
            actionName: 'PUSH_VIEW',
            name: "알림",
            description: "회원에게 전송된 푸시(PUSH)알림을 조회할 수 있습니다.",
            children: [{
                actionName: 'PUSH_SEND',
                name: "알림 보내기",
                description: "회원에게 푸시(push)알림을 보낼 수 있습니다."
            }]
        }]
    }, {
        groupName: '설정 관리',
        contents: [{
            actionName: 'OPERATING_POLICY',
            name: "운영정책",
            description: "운영 정책 메뉴의 모든 정보를 수정할 수 있습니다."
        }, {
            actionName: 'AUTH_PERMISSION_VIEW',
            name: "권한 관리",
            description: "관리자 목록을 조회할 수 있습니다.",
            children: [{
                actionName: 'AUTH_PERMISSION_MANAGE',
                name: "관리자 등록 / 수정 / 삭제",
                description: "새로운 관리자를 등록하거나 기존 관리자 수정 및 삭제할 수 있습니다."
            }]
        }, {
            actionName: 'CENTER_INFO_VIEW',
            name: "센터 정보",
            description: "센터 목록을 조회할 수 있습니다.",
            children: [{
                actionName: 'CENTER_INFO_MANAGE',
                name: "센터 관리",
                description: "센터 정보를 수정 할 수 있습니다."
            }]
        }]
    }
]

export { roleActionInfoList }