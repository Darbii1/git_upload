import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { albumAPI, authAPI } from '../services/api';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [albums, setAlbums] = useState([]);
  const [user, setUser] = useState(null);
  const [showCreateAlbum, setShowCreateAlbum] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    celebrationName: '',
    birthDate: '',
    description: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
        return;
      }

      const userRes = await authAPI.getProfile();
      setUser(userRes.data);

      const albumsRes = await albumAPI.getAlbums();
      setAlbums(albumsRes.data);
    } catch (err) {
      setError('Failed to load data');
      localStorage.removeItem('token');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAlbum = async (e) => {
    e.preventDefault();
    try {
      const response = await albumAPI.createAlbum(formData);
      setAlbums([response.data, ...albums]);
      setFormData({ celebrationName: '', birthDate: '', description: '' });
      setShowCreateAlbum(false);
    } catch (err) {
      setError('Failed to create album');
    }
  };

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      localStorage.removeItem('token');
      navigate('/');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const openAlbum = (albumId) => {
    navigate(`/album/${albumId}`);
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Birthday Memory Albums</h1>
        <div className="header-actions">
          <span className="user-name">{user?.name}</span>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <main className="dashboard-content">
        <button 
          className="create-album-btn"
          onClick={() => setShowCreateAlbum(!showCreateAlbum)}
        >
          + New Album
        </button>

        {showCreateAlbum && (
          <form className="create-album-form" onSubmit={handleCreateAlbum}>
            <h2>Create New Album</h2>
            <input
              type="text"
              placeholder="Celebration Name (e.g., John's 30th Birthday)"
              value={formData.celebrationName}
              onChange={(e) => setFormData({...formData, celebrationName: e.target.value})}
              required
            />
            <input
              type="date"
              value={formData.birthDate}
              onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
              required
            />
            <textarea
              placeholder="Description (optional)"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
            <button type="submit">Create Album</button>
            <button type="button" onClick={() => setShowCreateAlbum(false)}>Cancel</button>
          </form>
        )}

        {error && <p className="error">{error}</p>}

        <div className="albums-grid">
          {albums.length === 0 ? (
            <p className="no-albums">No albums yet. Create your first birthday album!</p>
          ) : (
            albums.map((album) => (
              <div key={album._id} className="album-card" onClick={() => openAlbum(album._id)}>
                <div className="album-cover">{album.coverImage || '🎂'}</div>
                <h3>{album.celebrationName}</h3>
                <p>{new Date(album.birthDate).toLocaleDateString()}</p>
                <p className="memory-count">{album.memories?.length || 0} memories</p>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
