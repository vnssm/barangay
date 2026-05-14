import React, { useEffect, useState } from "react";

const API = "http://localhost/1/makaballa/barangay-backend";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState("");

  const [commentInputs, setCommentInputs] = useState({});
  const [showComments, setShowComments] = useState({});

  /* ================= FETCH POSTS ================= */
  const fetchPosts = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${API}/posts_get.php`);
      const data = await res.json();

      setPosts(data.posts || []);
    } catch (err) {
      console.log("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  /* ================= CREATE POST ================= */
  const handleAddPost = async () => {
    if (!content) return;

    await fetch(`${API}/posts_create.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        author: "Admin",
        content
      })
    });

    setContent("");
    setShowModal(false);
    fetchPosts();
  };

  /* ================= ADD COMMENT ================= */
  const handleAddComment = async (postId) => {
    const text = commentInputs[postId];
    if (!text) return;

    await fetch(`${API}/posts_comment.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        post_id: postId,
        comment: text
      })
    });

    setCommentInputs({ ...commentInputs, [postId]: "" });
    fetchPosts();
  };

  if (loading) return <div style={{ padding: 20 }}>Loading posts...</div>;

  return (
    <div style={{ paddingBottom: "40px" }}>

      {/* HEADER */}
      <div style={header}>
        <h2>Community Posts & Feedback</h2>

        <button style={addBtn} onClick={() => setShowModal(true)}>
          + Create Post
        </button>
      </div>

      {/* POSTS */}
      <div style={postList}>
        {posts.map((post) => (
          <div key={post.id} style={postCard}>

            <div style={postHeader}>
              <strong>{post.author}</strong>
              <span style={date}>{post.date}</span>
            </div>

            <p style={{ marginTop: "10px" }}>{post.content}</p>

            {/* comments toggle */}
            <div style={commentActions}>
              <span
                style={toggleBtn}
                onClick={() =>
                  setShowComments({
                    ...showComments,
                    [post.id]: !showComments[post.id]
                  })
                }
              >
                {post.comments?.length || 0} comments
              </span>
            </div>

            {/* COMMENTS */}
            {showComments[post.id] && (
              <div style={commentSection}>

                {post.comments?.map((c, i) => (
                  <div key={i} style={commentItem}>
                    {c.comment}
                  </div>
                ))}

                <div style={commentInputWrapper}>
                  <input
                    style={commentInput}
                    placeholder="Write comment..."
                    value={commentInputs[post.id] || ""}
                    onChange={(e) =>
                      setCommentInputs({
                        ...commentInputs,
                        [post.id]: e.target.value
                      })
                    }
                  />

                  <button
                    style={commentBtn}
                    onClick={() => handleAddComment(post.id)}
                  >
                    Post
                  </button>
                </div>

              </div>
            )}
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div style={overlay}>
          <div style={modal}>
            <h3>Create Post</h3>

            <textarea
              style={textarea}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <div style={{ marginTop: 10 }}>
              <button style={cancelBtn} onClick={() => setShowModal(false)}>
                Cancel
              </button>

              <button style={saveBtn} onClick={handleAddPost}>
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Posts;

/* ================= STYLES ================= */

const header = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "20px"
};

const addBtn = {
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "10px 16px",
  borderRadius: "8px",
  cursor: "pointer"
};

const postList = { display: "flex", flexDirection: "column", gap: "15px" };

const postCard = {
  background: "white",
  padding: "15px",
  borderRadius: "10px"
};

const postHeader = { display: "flex", justifyContent: "space-between" };

const date = { fontSize: "12px", color: "#6b7280" };

const commentActions = { marginTop: "10px" };

const toggleBtn = { fontSize: "12px", color: "#2563eb", cursor: "pointer" };

const commentSection = { marginTop: "10px", borderTop: "1px solid #eee", paddingTop: "10px" };

const commentItem = { background: "#f3f4f6", padding: "8px", borderRadius: "6px", marginBottom: "5px" };

const commentInputWrapper = { display: "flex", gap: "10px" };

const commentInput = { flex: 1, padding: "8px" };

const commentBtn = { background: "#10b981", color: "white", border: "none", padding: "8px 12px" };

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const modal = { background: "white", padding: "20px", borderRadius: "10px", width: "300px" };

const textarea = { width: "100%", height: "100px" };

const cancelBtn = { marginRight: "10px", background: "#9ca3af", color: "white", border: "none", padding: "8px" };

const saveBtn = { background: "#2563eb", color: "white", border: "none", padding: "8px" };