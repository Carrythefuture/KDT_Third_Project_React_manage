import { Routes, Route } from "react-router-dom";
import MemberPage from "./MemberPage";
import BoardPage from "./BoardPage";

const ManageRoutes = () => {
  return (
    <Routes>
      <Route index element={<div>Manage 홈입니다.</div>} />
      <Route path="member" element={<MemberPage />} />
      <Route path="board" element={<BoardPage />} />
      <Route path="*" element={<h2>404 Not Found</h2>} />
    </Routes>
  );
};

export default ManageRoutes;
