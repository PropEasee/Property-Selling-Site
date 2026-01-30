// ...existing code...
import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fetchWithAuth } from '../../utils/api/fetchWithAuth';

export default function AddProperty() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    city: '',
    state: '',
    pincode: '',
    propertyType: 'HOUSE',
    status: 'AVAILABLE',
  });

  const [amenities] = useState(['WiFi', 'Parking', 'Pool', 'Gym', 'Security']);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [images, setImages] = useState([]); // File objects
  const [imagePreview, setImagePreview] = useState([]); // dataURLs
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const propertyTypes = ['APARTMENT', 'HOUSE', 'VILLA', 'LAND'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const toggleAmenity = (a) => {
    setSelectedAmenities((prev) => (prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
    setImages(prev => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setImagePreview(prev => prev.filter((_, i) => i !== index));
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const getSellerIdFromStorage = () => {
    try {
      const st = localStorage.getItem('user');
      if (!st) return null;
      const u = JSON.parse(st);
      return u?.id ?? u?.userId ?? u?.sellerId ?? null;
    } catch {
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const sellerId = getSellerIdFromStorage();
    if (!sellerId) {
      setError('Seller ID not found. Please login as a seller.');
      setSubmitting(false);
      return;
    }

    // 1) Create property (JSON) - API: POST /api/properties
    const createPayload = {
      title: formData.title,
      description: formData.description,
      price: Number(formData.price),
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      propertyType: formData.propertyType,
      sellerId: sellerId
    };

    // include status only if you want to send it (your API example didn't include it)
    if (formData.status) createPayload.status = formData.status;

    try {
      const createRes = await fetchWithAuth('http://localhost:8080/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(createPayload)
      });

      if (!createRes.ok) {
        const text = await createRes.text();
        throw new Error(text || 'Failed to create property');
      }

      const created = await createRes.json();

      // extract propertyId from response (try common fields)
      const propertyId = created?.propertyId ?? created?.id ?? created?.property_id;
      if (!propertyId) {
        throw new Error('Property created but propertyId not returned by server.');
      }

      // 2) Upload images to /api/properties/{propertyId}/images as form-data (key: images)
      if (images.length > 0) {
        const form = new FormData();
        images.forEach((file) => form.append('images', file)); // backend expects 'images'

        const uploadRes = await fetchWithAuth(`http://localhost:8080/api/properties/${propertyId}/images`, {
          method: 'POST',
          body: form
        });

        if (!uploadRes.ok) {
          const text = await uploadRes.text();
          throw new Error(text || 'Image upload failed');
        }
      }

      // success
      alert('Property created successfully');
      setFormData({
        title: '',
        description: '',
        price: '',
        city: '',
        state: '',
        pincode: '',
        propertyType: 'HOUSE',
        status: 'AVAILABLE',
      });
      setSelectedAmenities([]);
      setImages([]);
      setImagePreview([]);
      navigate('/SellerPropertiesList');
    } catch (err) {
      setError(err.message || 'Error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        .add-property-page { padding: 2rem; background: #f9fafb; min-height: 100vh; }
        .form-container { max-width: 900px; margin: 0 auto; background: #fff; padding: 2rem; border-radius: 12px; box-shadow: 0 6px 18px rgba(0,0,0,0.06); }
        .form-row { display: grid; gap: 1rem; grid-template-columns: 1fr 1fr; margin-bottom: 1rem; }
        .form-row.full { grid-template-columns: 1fr; }
        .form-label { font-weight: 600; margin-bottom: 0.5rem; }
        .form-input, .form-select, .form-textarea { width: 100%; padding: 0.75rem 1rem; border: 1px solid #e5e7eb; border-radius: 8px; }
        .image-preview-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px,1fr)); gap: 0.75rem; margin-top: 1rem; }
        .image-preview-item { position: relative; border-radius: 8px; overflow: hidden; }
        .remove-image-btn { position: absolute; top: 6px; right: 6px; background: rgba(0,0,0,0.6); color:#fff; border: none; padding: 6px; border-radius: 50%; cursor:pointer; }
        .btn { padding: 0.75rem 1.5rem; border-radius: 8px; border: none; cursor:pointer; }
        .btn-primary { background:#3b82f6; color:#fff; }
        .btn-secondary { background:#e5e7eb; }
        .amenities-grid { display:flex; gap:0.5rem; flex-wrap:wrap; margin-top:0.5rem; }
        .amenity-chip { padding:0.4rem 0.6rem; border-radius:999px; border:1px solid #e5e7eb; cursor:pointer; }
        @media (max-width:768px) { .form-row { grid-template-columns: 1fr; } }
      `}</style>

      <div className="add-property-page">
        <div className="form-container">
          <h2 style={{ marginBottom: '1rem' }}>Add New Property</h2>
          {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-row full">
              <div>
                <label className="form-label">Title</label>
                <input name="title" value={formData.title} onChange={handleInputChange} className="form-input" required />
              </div>
            </div>

            <div className="form-row full">
              <div>
                <label className="form-label">Description</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} className="form-textarea" rows={5} required />
              </div>
            </div>

            <div className="form-row">
              <div>
                <label className="form-label">Price (INR)</label>
                <input type="number" name="price" value={formData.price} onChange={handleInputChange} className="form-input" step="0.01" required />
              </div>

              <div>
                <label className="form-label">Property Type</label>
                <select name="propertyType" value={formData.propertyType} onChange={handleInputChange} className="form-select" required>
                  {propertyTypes.map(pt => <option key={pt} value={pt}>{pt}</option>)}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div>
                <label className="form-label">City</label>
                <input name="city" value={formData.city} onChange={handleInputChange} className="form-input" required />
              </div>
              <div>
                <label className="form-label">State</label>
                <input name="state" value={formData.state} onChange={handleInputChange} className="form-input" required />
              </div>
            </div>

            <div className="form-row">
              <div>
                <label className="form-label">Pincode</label>
                <input name="pincode" value={formData.pincode} onChange={handleInputChange} className="form-input" />
              </div>
              <div>
                <label className="form-label">Status</label>
                <select name="status" value={formData.status} onChange={handleInputChange} className="form-select">
                  <option value="AVAILABLE">AVAILABLE</option>
                  <option value="PENDING">PENDING</option>
                  <option value="SOLD">SOLD</option>
                </select>
              </div>
            </div>

            <div className="form-section">
              <label className="form-label">Amenities</label>
              <div className="amenities-grid">
                {amenities.map(a => (
                  <div
                    key={a}
                    className="amenity-chip"
                    onClick={() => toggleAmenity(a)}
                    style={{ background: selectedAmenities.includes(a) ? '#e0f2fe' : 'transparent', borderColor: selectedAmenities.includes(a) ? '#3b82f6' : '#e5e7eb' }}
                  >
                    {a}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: '1rem' }}>
              <label className="form-label">Property Images</label>
              <label htmlFor="image-input" style={{ display: 'block', cursor: 'pointer', padding: '1rem', border: '2px dashed #3b82f6', borderRadius: 8, textAlign: 'center', background: '#f0f9ff' }}>
                <Upload size={20} /> Click or drop to upload images
              </label>
              <input id="image-input" type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={handleImageUpload} />
              {imagePreview.length > 0 && (
                <div className="image-preview-grid">
                  {imagePreview.map((src, i) => (
                    <div key={i} className="image-preview-item">
                      <img src={src} alt={`preview-${i}`} style={{ width: '100%', height: 120, objectFit: 'cover' }} />
                      <button type="button" className="remove-image-btn" onClick={() => removeImage(i)}><X size={14} color="#fff" /></button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.25rem' }}>
              <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
              <button type="submit" className="btn btn-primary" disabled={submitting}>{submitting ? 'Publishing...' : 'Publish Property'}</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
// ...existing code...