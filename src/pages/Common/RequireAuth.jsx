import { Navigate } from "react-router-dom";
import { caxios } from "../../config/config";
import { useEffect, useState } from "react";

function RequireAuth({ children }) {
    const [isAuth, setIsAuth] = useState(null); // null = 아직 검증 중
    const token = sessionStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            setIsAuth(false);
            return;
        }

        const verify = async () => {
            try {
                await caxios.get("/auth/verify"); // ✅ 서버에서 JWT 검증
                setIsAuth(true);
            } catch (err) {
                sessionStorage.removeItem("token"); // ❌ 위조/만료 토큰
                setIsAuth(false);
            }
        };

        verify();
    }, [token]);

    // ✅ 아직 서버 검증 중이면 아무것도 렌더링하지 않음
    if (isAuth === null) return null; // 또는 로딩 스피너

    // ❌ 인증 실패 시 로그인 이동
    if (!isAuth) return <Navigate to="/login" replace />;

    // ✅ 인증 성공
    return children;
}

export default RequireAuth;
