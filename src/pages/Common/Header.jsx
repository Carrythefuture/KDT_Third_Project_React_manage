import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header() {
  const headerStyle = {
    display: "flex",
    gap: "20px",
    padding: "15px 25px 10px",

    backgroundColor: "#ffffffff",
    fontSize: "17px",
    fontWeight: "600",
    marginBottom: "20px"
  };

  const tabStyle = {
    padding: "8px 14px",
    borderRadius: "6px",
    textDecoration: "none",
    color: "#555",
  };

  const activeTabStyle = {
    ...tabStyle,
    backgroundColor: "#007bff20",
    color: "#007bff",
    borderBottom: "2px solid #007bff9f",
  };

  const navigate = useNavigate();

  const handleLogoutBtn = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  }
  return (
    <div style={headerStyle}>
      <NavLink
        to="/member"
        style={({ isActive }) => (isActive ? activeTabStyle : tabStyle)}
      >
        사용자 관리
      </NavLink>
      <NavLink
        to="/black"
        style={({ isActive }) => (isActive ? activeTabStyle : tabStyle)}
      >
        블랙리스트
      </NavLink>


      <NavLink
        to="/board"
        style={({ isActive }) => (isActive ? activeTabStyle : tabStyle)}
      >
        게시글 관리
      </NavLink>

      <NavLink
        to="/data"
        style={({ isActive }) => (isActive ? activeTabStyle : tabStyle)}
      >
        데이터 차트
      </NavLink>

      <button className={styles.logout_btn} onClick={handleLogoutBtn}>로그아웃</button>
    </div>
  );
}
