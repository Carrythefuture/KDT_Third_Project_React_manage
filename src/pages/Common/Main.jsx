import { Routes, Route } from "react-router-dom";
import Header from "../Common/Header";
import MemberPage from "../Member/MemberPage";
import BoardPage from "../Board/BoardPage";
import BlackPage from "../Black/BlackPage";
import DataPage from "../Data/DataPage";

const Main = () => {
  return (
    <div>
      <div style={{ paddingLeft: "20px", paddingBottom: "10px", paddingTop: "10px", fontSize: "30px", fontWeight: "bold" }}>TNT 관리자 페이지</div>
      <Header />
      <main >
        <Routes>
          {/* 기본 홈 */}
          <Route index element={<div>여기는 홈입니다.</div>} />
          <Route path="member" element={<MemberPage />} />
          <Route path="black" element={<BlackPage />} />
          <Route path="board" element={<BoardPage />} />
          <Route path="data" element={<DataPage />} />
          {/* 나머지 */}
          <Route path="*" element={<h2>404 Not Found</h2>} />
        </Routes>
      </main>
    </div>
  );
};

export default Main;
