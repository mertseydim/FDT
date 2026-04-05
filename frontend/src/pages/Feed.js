import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostCard from '../components/PostCard';

const API = 'https://fdt-five.vercel.app';

function Feed() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ title: '', content: '', category: '' });
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${API}/api/post/feed`);
      setPosts(res.data.posts);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/api/post/create`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Gönderi oluşturuldu!');
      setForm({ title: '', content: '', category: '' });
      fetchPosts();
    } catch (err) {
      setMessage('Gönderi oluşturulamadı.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px' }}>
      <h2>Forum Akışı</h2>
      {token && (
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Başlık"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
          />
          <textarea
            placeholder="İçerik"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            style={{ width: '100%', padding: '10px', marginBottom: '10px', height: '100px' }}
          />
          <input
            type="text"
            placeholder="Kategori"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
          />
          <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}>
            Gönderi Oluştur
          </button>
        </form>
      )}
      {message && <p>{message}</p>}
      {posts.map(post => (
        <PostCard key={post._id} post={post} fetchPosts={fetchPosts} />
      ))}
    </div>
  );
}

export default Feed;