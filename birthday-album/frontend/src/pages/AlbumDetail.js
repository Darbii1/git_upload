import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { albumAPI, memoryAPI } from '../services/api';
import '../styles/AlbumDetail.css';

const AlbumDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [album, setAlbum] = useState(null);
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddMemory, setShowAddMemory] = useState(false);
  const [formData, setFormData] = useState({
    type: 'image',
    title: '',
    description: '',
    imageUrl: '',
    textContent: '',
  });

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const albumRes = await albumAPI.getAlbumById(id);
      setAlbum(albumRes.data);
      setMemories(albumRes.data.memories || []);
    } catch (err) {
      setError('Failed to load album');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleAddMemory = async (e) => {
    e.preventDefault();
    try {
      const response = await memoryAPI.createMemory({
        albumId: id,
        ...formData,
      });
      setMemories([response.data, ...memories]);
      setFormData({ type: 'image', title: '', description: '', imageUrl: '', textContent: '' });
      setShowAddMemory(false);
    } catch (err) {
      setError('Failed to add memory');
    }
  };

  const handleDeleteMemory = async (memoryId) => {
    if (window.confirm('Delete this memory?')) {
      try {
        await memoryAPI.deleteMemory(memoryId);
        setMemories(memories.filter(m => m._id !== memoryId));
      } catch (err) {
        setError('Failed to delete memory');
      }
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!album) return <div className="error">Album not found</div>;

  return (
    <div className="album-detail">
      <header className="album-header">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>← Back</button>
        <h1>{album.celebrationName}</h1>
        <p>{new Date(album.birthDate).toLocaleDateString()}</p>
      </header>

      <main className="album-content">
        {album.description && <p className="album-description">{album.description}</p>}

        <button 
          className="add-memory-btn"
          onClick={() => setShowAddMemory(!showAddMemory)}
        >
          + Add Memory
        </button>

        {showAddMemory && (
          <form className="add-memory-form" onSubmit={handleAddMemory}>
            <h2>Add New Memory</h2>
            <select
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
            >
              <option value="image">📷 Image</option>
              <option value="text">📝 Text</option>
              <option value="memory">✨ Memory</option>
            </select>

            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />

            {formData.type === 'image' && (
              <input
                type="url"
                placeholder="Image URL"
                value={formData.imageUrl}
                onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
              />
            )}

            {(formData.type === 'text' || formData.type === 'memory') && (
              <textarea
                placeholder="Write your text or memory..."
                value={formData.textContent}
                onChange={(e) => setFormData({...formData, textContent: e.target.value})}
              />
            )}

            <textarea
              placeholder="Description (optional)"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />

            <button type="submit">Save Memory</button>
            <button type="button" onClick={() => setShowAddMemory(false)}>Cancel</button>
          </form>
        )}

        {error && <p className="error">{error}</p>}

        <div className="memories-timeline">
          {memories.length === 0 ? (
            <p className="no-memories">No memories yet. Add your first memory!</p>
          ) : (
            memories.map((memory) => (
              <div key={memory._id} className={`memory-card memory-${memory.type}`}>
                <div className="memory-header">
                  <h3>{memory.title}</h3>
                  <button 
                    className="delete-btn"
                    onClick={() => handleDeleteMemory(memory._id)}
                  >
                    ✕
                  </button>
                </div>
                
                {memory.type === 'image' && memory.imageUrl && (
                  <img src={memory.imageUrl} alt={memory.title} className="memory-image" />
                )}

                {(memory.type === 'text' || memory.type === 'memory') && memory.textContent && (
                  <p className="memory-text">{memory.textContent}</p>
                )}

                {memory.description && (
                  <p className="memory-description">{memory.description}</p>
                )}

                <p className="memory-date">
                  {new Date(memory.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default AlbumDetail;
