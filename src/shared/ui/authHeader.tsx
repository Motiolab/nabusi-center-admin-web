import './authHeader.css'
import { Link } from "react-router-dom";
import { ReactComponent as Attend } from '@/assets/icon/Attend.svg';

const AuthHeader = ({ children }: { children: React.ReactNode }) => {

    return <>
        <div className="auth-layout-top-and-children" >
            <div className="auth-layout-top-container" >
                <div className="auth-layout-top-text-container" >
                    <div className="auth-layout-top-text-main" >
                        SAMATA
                    </div>
                    <div className="auth-layout-top-text-sub" >
                        Admin
                    </div>
                </div>
                <div className="auth-layout-top-info-container" >
                    <Link to={"/phoneauth"} className="auth-layout-top-info-check-in" >
                        <div>
                            회원가입
                        </div>
                    </Link>
                    <Link to={"#"} className="auth-layout-top-info-check-in">
                        <div>
                            헬프센터
                        </div>
                        <Attend width={16} height={16} fill={"var(--Base-Base-Black"} />
                    </Link>
                </div>
            </div>
            {children}
        </div>
    </>
}
export { AuthHeader }