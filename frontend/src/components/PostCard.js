import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API = 'https://fdt-five.vercel.app';

function PostCard({ post, fetchPosts }) {
  const [comment, setComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  const token = localStorage.getItem('token');

  const handleLike = async () => {
    try {
      await axios.post(`${API}/api/post/${post._id}/like`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchPosts();
    } catch (err) {
      console.log(err);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/api/post/${post._id}/comment`, { content: comment }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setComment('');
      fetchPosts();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', marginBottom: '15px' }}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <p style={{ color: 'gray', fontSize: '12px' }}>
        Kategori: {post.category} | Yazar: {' '}
        <Link to={`/profile/${post.author._id}`}>{post.author.username}</Link>
      </p>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        {token && (
          <button onClick={handleLike} style={{ padding: '5px 15px', cursor: 'pointer' }}>
            ❤️ {post.likes.length}
          </button>
        )}
        <button onClick={() => setShowComments(!showComments)} style={{ padding: '5px 15px', cursor: 'pointer' }}>
          💬 {post.comments.length}
        </button>
      </div>
      {showComments && (
        <div>
          {post.comments.map((c, i) => (
            <p key={i} style={{ backgroundColor: '#f5f5f5', padding: '5px', borderRadius: '4px' }}>
              {c.content}
            </p>
          ))}
          {token && (
            <form onSubmit={handleComment} style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                placeholder="Yorum yaz..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                style={{ flex: 1, padding: '5px' }}
              />
              <button type="submit" style={{ padding: '5px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
                Gönder
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default PostCard;