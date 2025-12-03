import { Routes, Route } from "react-router-dom";
import Header from "../Common/Header";
import ManageRoutes from "./ManageRoutes";

const Main = () => {
  return (
    <div>
      <Header />

      <main style={{ padding: "20px" }}>
        <Routes>
          {/* /manage/* 라우트 */}
          <Route path="manage/*" element={<ManageRoutes />} />

          {/* 기본 홈 */}
          <Route index element={<div>여기는 홈입니다.</div>} />

          {/* 나머지 */}
          <Route path="*" element={<h2>404 Not Found</h2>} />
        </Routes>
      </main>
    </div>
  );
};

export default Main;
