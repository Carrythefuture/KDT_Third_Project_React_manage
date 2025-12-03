import { NavLink } from "react-router-dom";

export default function Header() {
  const headerStyle = {
    display: "flex",
    gap: "20px",
    padding: "15px 25px",
    borderBottom: "1px solid #ddd",
    backgroundColor: "#fff",
    fontSize: "17px",
    fontWeight: "600",
  };

  const tabStyle = {
    padding: "8px 14px",
    borderRadius: "6px",
    textDecoration: "none",
    color: "#555",
    transition: "0.2s",
  };

  const activeTabStyle = {
    ...tabStyle,
    backgroundColor: "#007bff20",
    color: "#007bff",
    borderBottom: "2px solid #007bff",
  };

  return (
    <div style={headerStyle}>
      <NavLink
        to="/manage/member"
        style={({ isActive }) => (isActive ? activeTabStyle : tabStyle)}
      >
        회원 관리
      </NavLink>

      <NavLink
        to="/manage/board"
        style={({ isActive }) => (isActive ? activeTabStyle : tabStyle)}
      >
        게시글 관리
      </NavLink>
    </div>
  );
}
