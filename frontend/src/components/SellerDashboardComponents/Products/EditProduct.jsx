import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProducts } from '../../../context/ProductContext';
import { IoMdArrowBack } from 'react-icons/io';
import ImageUpload from './ImageUpload';
import { useToast } from '../../../context/ToastContext';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, updateProduct } = useProducts();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Dairy',
    price: '',
    description: '',
    images: [], // New file objects
    existingImages: [], // Existing Cloudinary URLs
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const product = products.find((p) => p._id === id);
    if (product) {
      setFormData({
        name: product.name,
        category: product.category,
        price: product.price.toString(),
        description: product.description,
        images: [],
        existingImages: product.images || [],
      });
      setIsLoading(false);
    } else if (products.length > 0) {
        navigate('/seller/products');
    }
  }, [id, products, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImagesSelect = (newFiles, remainingExisting) => {
    setFormData((prev) => ({ 
        ...prev, 
        images: newFiles,
        existingImages: remainingExisting !== undefined ? remainingExisting : prev.existingImages
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price) {
        showToast('Name and Price are required', 'error');
        return;
    }

    if (formData.images.length === 0 && formData.existingImages.length === 0) {
        showToast('At least one product image is required', 'error');
        return;
    }

    setLoading(true);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('category', formData.category);
    data.append('price', formData.price);
    data.append('description', formData.description);
    
    // Add existing images back
    formData.existingImages.forEach(img => {
        data.append('existingImages', img);
    });

    // Add new images
    formData.images.forEach((file) => {
      data.append('images', file);
    });

    try {
      await updateProduct(id, data);
      showToast('Product updated successfully!', 'success');
      navigate('/seller/products');
    } catch (err) {
      showToast(err.message || 'Failed to update product', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return <div className="p-8 text-center text-gray-500 font-black uppercase tracking-widest">Loading Product...</div>;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <button 
        onClick={() => navigate('/seller/products')}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-8 group"
      >
        <IoMdArrowBack className="text-xl group-hover:-translate-x-1 transition-transform" />
        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Back to Products</span>
      </button>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_2px_20px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-2xl font-black text-gray-900 tracking-tighter uppercase">Edit Product</h2>
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mt-1">Update the product information below.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Name */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Product Name *</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Amul Milk 1L"
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-green-500 focus:shadow-[0_0_0_4px_rgba(22,163,74,0.1)] outline-none transition-all font-medium text-gray-900"
                required
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Category</label>
              <select 
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-green-500 focus:shadow-[0_0_0_4px_rgba(22,163,74,0.1)] outline-none transition-all font-medium text-gray-900 appearance-none"
              >
                <option value="Dairy">Dairy</option>
                <option value="Grocery">Grocery</option>
                <option value="Bakery">Bakery</option>
                <option value="Beverages">Beverages</option>
                <option value="Snacks">Snacks</option>
              </select>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Price (₹) *</label>
              <input 
                type="number" 
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-green-500 focus:shadow-[0_0_0_4px_rgba(22,163,74,0.1)] outline-none transition-all font-medium text-gray-900"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Description</label>
            <textarea 
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell customers more about your product..."
              rows="4"
              className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-green-500 focus:shadow-[0_0_0_4px_rgba(22,163,74,0.1)] outline-none transition-all font-medium text-gray-900 resize-none"
            ></textarea>
          </div>

          {/* Image Upload Section */}
          <ImageUpload onImagesSelect={handleImagesSelect} initialImages={formData.existingImages} />

          <div className="pt-4 flex gap-4">
            <button 
              type="button"
              disabled={loading}
              onClick={() => navigate('/seller/products')}
              className="flex-1 px-8 py-4 bg-white border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-all active:scale-95 disabled:opacity-50"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={loading}
              className="flex-1 px-8 py-4 bg-gray-900 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-lg shadow-gray-200 hover:bg-green-600 transition-all active:scale-95 disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
