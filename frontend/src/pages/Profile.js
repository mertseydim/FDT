import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const API = 'https://fdt-five.vercel.app';

function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [bio, setBio] = useState('');
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API}/api/user/${id}/profile`);
        setUser(res.data);
        setBio(res.data.bio);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProfile();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API}/api/user/${id}/profile`, { bio }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Profil güncellendi!');
    } catch (err) {
      setMessage('Güncelleme başarısız.');
    }
  };

  const handleFollow = async () => {
    try {
      const res = await axios.post(`${API}/api/user/${id}/follow`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage('Takip işlemi başarısız.');
    }
  };

  if (!user) return <p>Yükleniyor...</p>;

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px' }}>
      <h2>{user.username} Profili</h2>
      <p>E-posta: {user.email}</p>
      <p>Biyografi: {user.bio || 'Biyografi yok'}</p>
      <p>Takipçi: {user.followers?.length || 0}</p>
      <p>Takip: {user.following?.length || 0}</p>

      {token && userId !== id && (
        <button onClick={handleFollow} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer', marginBottom: '20px' }}>
          Takip Et / Takipten Çık
        </button>
      )}

      {token && userId === id && (
        <form onSubmit={handleUpdate}>
          <h3>Profili Güncelle</h3>
          <textarea
            placeholder="Biyografi"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            style={{ width: '100%', padding: '10px', marginBottom: '10px', height: '100px' }}
          />
          <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}>
            Güncelle
          </button>
        </form>
      )}
      {message && <p>{message}</p>}
    </div>
  );
}

export default Profile;