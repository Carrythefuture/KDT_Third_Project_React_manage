import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Common/Login";
import Main from "./pages/Common/Main";
import RequireAuth from "./pages/Common/RequireAuth";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 로그인 페이지는 누구나 접근 가능 */}
        <Route path="/login" element={<Login />} />

        {/* 보호된 페이지 */}
        <Route path="/*" element={
          <RequireAuth>
            <Main />
          </RequireAuth>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;