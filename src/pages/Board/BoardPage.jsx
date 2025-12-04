import React, { useEffect, useState } from "react";
import { caxios } from "../../config/config";

export default function BoardPage() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await caxios.get("/board/list");
      setPosts(res.data);
    } catch (err) {
      console.error("게시글 로드 실패", err);
    }
  };

  const deletePost = async (seq) => {
    if (!window.confirm("정말로 삭제할까요?")) return;

    try {
      await caxios.delete(`/board/delete/${seq}`);
      alert("삭제되었습니다!");
      fetchPosts();
    } catch (err) {
      console.error("삭제 실패", err);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "18px",
          padding: "25px",
          background: "#fafafa",
        }}
      >
        <h2
          style={{
            fontWeight: "bold",
            marginBottom: "25px",
            fontSize: "22px",
            textAlign: "center",
          }}
        >
          게시글 관리
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "20px",
          }}
        >
          {posts.map((post) => (
            <div
              key={post.seq}
              style={{
                border: "1px solid #dcdcdc",
                borderRadius: "14px",
                overflow: "hidden",
                background: "#fff",
                boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                transition:
                  "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 20px rgba(0,0,0,0.12)";
                e.currentTarget.style.borderColor = "#b2b2b2";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(0,0,0,0.06)";
                e.currentTarget.style.borderColor = "#dcdcdc";
              }}
            >
              {/* 🔥 이미지 영역 */}
              <div style={{ position: "relative" }}>
                <img
                  src={post.image_url}
                  alt="preview"
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />

                {/* 🔥 삭제 버튼 */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // 카드 클릭과 독립
                    deletePost(post.seq);
                  }}
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    background: "rgba(255,255,255,0.9)",
                    width: "34px",
                    height: "34px",
                    borderRadius: "10px",
                    border: "1px solid #ddd",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                    fontSize: "18px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#ff6b6b";
                    e.currentTarget.style.color = "white";
                    e.currentTarget.style.borderColor = "#ff6b6b";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.9)";
                    e.currentTarget.style.color = "black";
                    e.currentTarget.style.borderColor = "#ddd";
                  }}
                >
                  🗑️
                </button>

                {/* 뱃지 */}
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    display: "flex",
                    gap: "6px",
                  }}
                >
                  {post.color && (
                    <span
                      style={{
                        background: "#ff8fab",
                        color: "#fff",
                        padding: "4px 8px",
                        borderRadius: "10px",
                        fontSize: "12px",
                      }}
                    >
                      {post.color}
                    </span>
                  )}

                  {post.body_shape && (
                    <span
                      style={{
                        background: "#8ab4f8",
                        color: "#fff",
                        padding: "4px 8px",
                        borderRadius: "10px",
                        fontSize: "12px",
                      }}
                    >
                      {post.body_shape}
                    </span>
                  )}
                </div>
              </div>

              {/* 내용 */}
              <div style={{ padding: "14px" }}>
                <h3
                  style={{
                    margin: "0 0 10px",
                    fontSize: "17px",
                    fontWeight: "bold",
                  }}
                >
                  {post.title}
                </h3>
                <p style={{ fontSize: "14px", color: "#555", lineHeight: 1.4 }}>
                  {post.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
