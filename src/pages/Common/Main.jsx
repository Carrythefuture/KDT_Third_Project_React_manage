import { Routes, Route, Navigate } from "react-router-dom";
import Header from "../Common/Header";
import MemberPage from "../Member/MemberPage";
import BoardPage from "../Board/BoardPage";
import BlackPage from "../Black/BlackPage";

import ChartPage from "../Chart/ChartPage";

import styles from "./Main.module.css";

const Main = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>TNT 관리자</div>

      <div  className={styles.body}>
      <Header />
      
      <main>
        <Routes>
          {/* 기본 홈 */}
          <Route index element={<Navigate to="/member" replace />} />
          <Route path="member" element={<MemberPage />} />
          <Route path="black" element={<BlackPage />} />
          <Route path="board" element={<BoardPage />} />
          <Route path="data" element={<ChartPage />} />
          {/* 나머지 */}
          <Route path="*" element={<h2>404 Not Found</h2>} />
        </Routes>
      </main>
      </div>
    </div>
  );
};

export default Main;
