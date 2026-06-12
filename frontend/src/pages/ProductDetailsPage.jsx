import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/BuyerDashboardComponents/Header';
import Footer from '../components/BuyerDashboardComponents/Footer';
import API from '../api';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useBuyer } from '../context/BuyerContext';
import { IoMdAdd, IoMdRemove, IoMdArrowBack, IoMdStar, IoMdStarHalf, IoMdStarOutline, IoMdCart, IoMdFlash, IoMdTrophy, IoMdChatbubbles, IoMdSend, IoMdBusiness } from 'react-icons/io';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const { userInfo } = useBuyer();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  // Review State
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  const fetchProduct = async () => {
    try {
      const { data } = await API.get(`/products/${id}`);
      setProduct(data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    showToast(`${product.name} added to cart!`, 'success');
  };

  const submitReviewHandler = async (e) => {
    e.preventDefault();
    setSubmittingReview(true);
    try {
      await API.post(`/products/${id}/reviews`, { rating, comment });
      showToast('Review submitted successfully!', 'success');
      setComment('');
      fetchProduct(); // Refresh product data
    } catch (err) {
      showToast(err.response?.data?.message || err.message, 'error');
    } finally {
      setSubmittingReview(false);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<IoMdStar key={i} className="text-yellow-400" />);
      } else if (i - 0.5 <= rating) {
        stars.push(<IoMdStarHalf key={i} className="text-yellow-400" />);
      } else {
        stars.push(<IoMdStarOutline key={i} className="text-gray-300" />);
      }
    }
    return stars;
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-gray-500 font-black uppercase tracking-widest text-[10px]">Unpacking Product Details...</p>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-red-50 p-10 rounded-[40px] border-2 border-dashed border-red-200 text-center max-w-md w-full">
        <div className="text-6xl mb-6">🏜️</div>
        <h2 className="text-2xl font-black text-gray-900 mb-2">Oops! Product Not Found</h2>
        <p className="text-red-500 mb-8">{error}</p>
        <button onClick={() => navigate('/buyer')} className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-green-600 transition-all">Back to Market</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col">
      <Header />
      
      <main className="flex-grow max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        {/* Navigation */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-bold text-xs mb-8 transition-colors group"
        >
          <IoMdArrowBack className="text-lg group-hover:-translate-x-1 transition-transform" />
          Back to Results
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Image Gallery (5 cols) */}
          <div className="lg:col-span-5 space-y-4 sticky top-24">
            <div className="aspect-square rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-lg group relative">
              <img 
                src={product.images && product.images.length > 0 ? product.images[activeImage] : ''} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                 <div className="bg-green-600 text-white px-3 py-1.5 rounded-full font-black text-[9px] uppercase tracking-widest shadow-xl w-fit">Authentic</div>
                 {product.countInStock > 0 && (
                   <div className="bg-white/90 backdrop-blur-md text-gray-900 px-3 py-1.5 rounded-full font-black text-[9px] uppercase tracking-widest shadow-lg border border-gray-100 w-fit">In Stock</div>
                 )}
              </div>
            </div>
            
            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto no-scrollbar py-2">
                {product.images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shadow-sm
                      ${activeImage === idx ? 'border-green-600 ring-2 ring-green-50' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <img src={img} alt={`${product.name} ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Quality Badges */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center text-yellow-700 text-xl">
                  <IoMdTrophy />
                </div>
                <div>
                    <p className="text-[8px] font-black uppercase tracking-widest text-gray-400">Quality</p>
                    <p className="text-[10px] font-black text-gray-900 uppercase">Trusted Source</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-700 text-xl">
                  <IoMdFlash />
                </div>
                <div>
                    <p className="text-[8px] font-black uppercase tracking-widest text-gray-400">Delivery</p>
                    <p className="text-[10px] font-black text-gray-900 uppercase">Fast Shipping</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Info & Checkout (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="bg-gray-900 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                  {product.category}
                </span>
                <div className="flex items-center text-yellow-400 gap-1 bg-white px-2.5 py-1 rounded-full border border-gray-100 shadow-sm">
                  {renderStars(product.rating)}
                  <span className="text-gray-900 text-xs font-black ml-2">{product.rating.toFixed(1)}</span>
                  <span className="text-gray-400 text-[10px] font-bold">({product.numReviews} Reviews)</span>
                </div>
              </div>
              <h1 className="text-4xl font-black text-gray-900 tracking-tight leading-tight uppercase">{product.name}</h1>
              <div className="flex items-center gap-3">
                 <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <IoMdBusiness className="text-base" />
                 </div>
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Sold by: <span className="text-blue-600 font-bold">{product.sellerId?.shopName || 'Premium Partner'}</span></p>
              </div>
              <p className="text-gray-500 text-base leading-relaxed font-medium pt-4 border-t border-gray-100">
                {product.description || "Experience the finest local selection, carefully curated for those who value authenticity and quality in every single purchase."}
              </p>
            </div>

            {/* Pricing & Cart Action */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/30">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
                <div className="space-y-1">
                   <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Inclusive of all taxes</p>
                   <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-black text-gray-900 tracking-tighter">₹{product.price}</span>
                    <span className="text-xl text-gray-300 font-bold line-through uppercase">₹{Math.round(product.price * 1.25)}</span>
                    <div className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-[10px] font-black">20% OFF</div>
                  </div>
                </div>
                
                <div className="flex items-center bg-gray-50 p-1.5 rounded-2xl border border-gray-100 shadow-inner">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-sm border border-gray-100 hover:text-green-600 transition-all active:scale-90 text-gray-400"
                  >
                    <IoMdRemove className="text-lg" />
                  </button>
                  <span className="px-6 font-black text-gray-900 text-lg w-16 text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-sm border border-gray-100 hover:text-green-600 transition-all active:scale-90 text-gray-400"
                  >
                    <IoMdAdd className="text-lg" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={handleAddToCart}
                  className="flex-grow flex items-center justify-center gap-3 bg-gray-900 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-green-600 transition-all transform active:scale-95 shadow-lg shadow-gray-200"
                >
                  <IoMdCart className="text-2xl" />
                  Add to Bag
                </button>
                <button className="p-5 bg-green-50 border border-green-100 rounded-2xl text-green-600 hover:bg-green-600 hover:text-white transition-all shadow-lg shadow-green-100 group">
                  <IoMdFlash className="text-2xl group-hover:animate-pulse" />
                </button>
              </div>
              <p className="text-[9px] text-center text-gray-400 font-black uppercase tracking-widest mt-6">✨ Guaranteed Delivery within 2-4 Business Days</p>
            </div>

            {/* Ratings & Reviews Section */}
            <div className="space-y-8 pt-8 border-t border-gray-100">
               <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                    Customer Reviews
                    <span className="text-xs bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full">{product.numReviews}</span>
                  </h2>
                  <div className="text-right">
                    <p className="text-3xl font-black text-gray-900 leading-none">{product.rating.toFixed(1)}</p>
                    <div className="flex text-yellow-400 mt-1 text-sm">{renderStars(product.rating)}</div>
                  </div>
               </div>

               {/* Review Form */}
               {userInfo ? (
                 <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                    <h3 className="text-base font-black text-gray-900 mb-4 flex items-center gap-2">
                        <IoMdChatbubbles className="text-green-600" />
                        Share your experience
                    </h3>
                    <form onSubmit={submitReviewHandler} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Overall Rating</label>
                            <div className="flex gap-1.5">
                                {[1,2,3,4,5].map(num => (
                                    <button 
                                        key={num}
                                        type="button"
                                        onClick={() => setRating(num)}
                                        className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl transition-all
                                            ${rating >= num ? 'bg-yellow-400 text-white shadow-lg shadow-yellow-100' : 'bg-gray-50 text-gray-300 hover:bg-gray-100'}`}
                                    >
                                        <IoMdStar />
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Your Thoughts</label>
                            <textarea 
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                required
                                rows="3"
                                placeholder="What did you like or dislike?"
                                className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 outline-none focus:bg-white focus:border-green-500 focus:shadow-[0_0_0_4px_rgba(34,197,94,0.1)] transition-all font-medium text-sm text-gray-700 placeholder:text-gray-300 resize-none"
                            ></textarea>
                        </div>
                        <button 
                            type="submit" 
                            disabled={submittingReview}
                            className="bg-gray-900 text-white px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-green-600 transition-all shadow-xl disabled:opacity-50 flex items-center gap-2"
                        >
                            {submittingReview ? 'Submitting...' : <><IoMdSend /> Post Review</>}
                        </button>
                    </form>
                 </div>
               ) : (
                 <div className="bg-gray-50 p-6 rounded-[2rem] border border-dashed border-gray-200 text-center">
                    <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Please login to write a review</p>
                 </div>
               )}

               {/* Review List */}
               <div className="space-y-4">
                 {product.reviews.length === 0 ? (
                    <div className="text-center py-6">
                        <p className="text-gray-300 font-black uppercase tracking-widest text-[10px] italic">Be the first to review this product</p>
                    </div>
                 ) : (
                    product.reviews.map((review) => (
                        <div key={review._id} className="bg-white p-6 rounded-[2rem] border border-gray-50 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center text-white font-black uppercase shadow-lg text-sm">
                                        {review.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-black text-gray-900 text-sm">{review.name}</p>
                                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{new Date(review.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="flex text-yellow-400 text-xs">
                                    {renderStars(review.rating)}
                                </div>
                            </div>
                            <p className="text-gray-600 leading-relaxed font-medium pl-13 text-sm">
                                {review.comment}
                            </p>
                        </div>
                    ))
                 )}
               </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
