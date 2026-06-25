import { useState, useEffect, useRef } from 'react';
import { useModal } from '../context/ModalContext';

export default function NewsTab() {
  const { showAlert, showConfirm } = useModal();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef(null);
  const token = localStorage.getItem('token');

  const fetchNews = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/news/history', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status === 401 || response.status === 403) {
        window.location.href = '/login';
        return;
      }
      const data = await response.json();
      setNews(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError('Failed to load news');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      showAlert('Required', 'Please provide title and content.');
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('author', localStorage.getItem('username') || 'Admin');
    if (imageFile) formData.append('image', imageFile);

    try {
      const response = await fetch('http://localhost:3000/api/news', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        showAlert('Success', 'News posted successfully!');
        setTitle('');
        setContent('');
        setImageFile(null);
        setPreviewImage(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        fetchNews(); // refresh list
      } else {
        showAlert('Error', data.error || 'Failed to post news');
      }
    } catch (err) {
      showAlert('Error', 'Error posting news');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    showConfirm('Confirm Delete', 'Are you sure you want to delete this news?', async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/news/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          showAlert('Success', 'News deleted successfully!');
          fetchNews();
        } else {
          showAlert('Error', 'Failed to delete news');
        }
      } catch (err) {
        showAlert('Error', 'Error deleting news');
        console.error(err);
      }
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <section className="dashboard-section">
      <div className="dashboard-card">
        <h3>Post Global News</h3>

        <form onSubmit={handleSubmit} className="dashboard-form">
          <div>
            <label>Title</label>
            <input 
              type="text" 
              placeholder="Enter news title" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div
            className="image-upload-box"
            style={{ cursor: 'pointer', overflow: 'hidden' }}
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
          >
            {previewImage ? (
              <img src={previewImage} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div className="text-center">
                <span className="material-symbols-outlined">add_photo_alternate</span>
                <p className="small mb-0">Click to upload image</p>
              </div>
            )}
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageChange} 
            accept="image/*" 
            style={{ display: 'none' }} 
          />

          <div>
            <label>Content</label>
            <textarea
              placeholder="Write the main campus story..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          <div className="button-row">
            <button type="submit" className="primary-btn w-100" disabled={isSubmitting}>
              {isSubmitting ? 'Posting...' : 'Share Post'}
            </button>
          </div>
        </form>
      </div>

      <h3 className="section-heading mt-3">News Feed</h3>

      {loading ? (
        <p className="text-muted text-center py-3">Loading news...</p>
      ) : error ? (
        <p className="text-danger text-center py-3">{error}</p>
      ) : news.length === 0 ? (
        <p className="text-muted text-center py-3">No news posted yet.</p>
      ) : (
        news.map((item) => (
          <article className="news-card mb-4 shadow-sm" key={item.id}>
            {item.imageUrl ? (
              <img src={`http://localhost:3000${item.imageUrl}`} alt={item.title} />
            ) : (
              <div className="bg-light d-flex align-items-center justify-content-center" style={{ height: '210px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '3rem', color: '#ccc' }}>newspaper</span>
              </div>
            )}

            <div className="news-body">
              <div className="news-meta">
                <span className="tag gold-tag">News</span>
                <small>{formatDate(item.date)}</small>
              </div>

              <h4>{item.title}</h4>
              <p>
                {item.content.length > 100 ? `${item.content.substring(0, 100)}...` : item.content}
              </p>

              <div className="news-actions justify-content-between">
                <div style={{ fontSize: '0.8rem', fontStyle: 'italic' }}>Posted by {item.author}</div>
                <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(item.id)}>
                  <i className="bi bi-trash"></i> Delete
                </button>
              </div>
            </div>
          </article>
        ))
      )}
    </section>
  );
}
