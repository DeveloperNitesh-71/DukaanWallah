import React, { useState } from 'react'
import ProductCard from './ProductCard'
import { products } from '../../../data/mockData'
import { IoMdFlash, IoMdTrendingUp, IoMdStar } from 'react-icons/io'

const Product = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    
    const categories = ['All', ...new Set(products.map(p => p.category))];

    const filteredProducts = selectedCategory === 'All' 
        ? products 
        : products.filter(p => p.category === selectedCategory);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Premium Hero Section */}
            <div className="relative rounded-3xl overflow-hidden mb-12 shadow-2xl group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-900 via-green-800 to-green-600 opacity-95"></div>
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                
                {/* Decorative Blobs */}
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-400 rounded-full blur-[100px] opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-yellow-400 rounded-full blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity"></div>

                <div className="relative z-10 p-10 md:p-20 flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="max-w-xl text-center md:text-left">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-6">
                            <IoMdFlash className="text-yellow-400" />
                            <span className="text-white text-xs font-bold uppercase tracking-widest">Mega Monsoon Sale</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                            Get Up To <span className="text-yellow-400 italic">40% OFF</span> On Daily Essentials
                        </h2>
                        <p className="text-green-100 text-lg mb-10 leading-relaxed opacity-90">
                            Experience the fastest delivery from your local trusted shops. Quality products, pocket-friendly prices.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                            <button className="bg-white text-green-900 px-10 py-4 rounded-2xl font-black text-lg hover:bg-yellow-400 hover:scale-105 transition-all shadow-xl shadow-green-950/20 active:scale-95">
                                Shop Now
                            </button>
                            <button className="bg-transparent border-2 border-white/30 text-white px-10 py-4 rounded-2xl font-black text-lg hover:bg-white/10 transition-all backdrop-blur-sm">
                                View Offers
                            </button>
                        </div>
                    </div>
                    
                    <div className="hidden lg:block relative">
                        <div className="bg-white/10 backdrop-blur-2xl p-8 rounded-[40px] border border-white/20 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-2xl shadow-lg">📦</div>
                                <div>
                                    <p className="text-white font-bold">Fastest Delivery</p>
                                    <p className="text-green-200 text-xs">Under 30 Minutes</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center text-2xl shadow-lg">✨</div>
                                <div>
                                    <p className="text-white font-bold">Quality Assured</p>
                                    <p className="text-green-200 text-xs">From Local Experts</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Premium Category Navigation */}
            <div className="mb-12">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-8 bg-green-600 rounded-full"></div>
                        <h3 className="text-2xl font-black text-gray-900 tracking-tight">Browse Categories</h3>
                    </div>
                    <div className="hidden sm:flex items-center gap-6 text-sm">
                        <span className="flex items-center gap-1.5 text-gray-500 font-bold"><IoMdTrendingUp className="text-green-600" /> Trending</span>
                        <span className="flex items-center gap-1.5 text-gray-500 font-bold"><IoMdStar className="text-yellow-500" /> Top Rated</span>
                    </div>
                </div>
                
                <div className='flex items-center w-full gap-4 overflow-x-auto no-scrollbar pb-4'>
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`group px-8 py-4 rounded-2xl whitespace-nowrap transition-all duration-300 relative ${
                                selectedCategory === category 
                                ? 'bg-green-600 text-white shadow-xl shadow-green-200 -translate-y-1' 
                                : 'bg-white text-gray-500 border border-gray-100 hover:border-green-200 hover:text-green-600 hover:shadow-lg'
                            }`}
                        >
                            <span className="relative z-10 font-bold tracking-wide">{category}</span>
                            {selectedCategory === category && (
                                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-white rounded-full"></span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Product Grid Section Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-8 bg-gray-900 rounded-full"></div>
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">
                        {selectedCategory === 'All' ? 'Popular Products' : `${selectedCategory} Specials`}
                    </h3>
                </div>
                <p className="text-gray-400 font-medium text-sm">Showing {filteredProducts.length} results</p>
            </div>

            {/* Modern Product Grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12 pb-24'>
                {filteredProducts.map((product, index) => (
                    <div key={product.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both" style={{animationDelay: `${index * 100}ms`}}>
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
            
            {filteredProducts.length === 0 && (
                <div className="text-center py-32 bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-200">
                    <div className="text-6xl mb-6">🔍</div>
                    <h4 className="text-2xl font-black text-gray-900 mb-2">No products found</h4>
                    <p className="text-gray-500 max-w-xs mx-auto">Try adjusting your filters or search to find what you're looking for.</p>
                    <button 
                        onClick={() => setSelectedCategory('All')}
                        className="mt-8 text-green-600 font-black hover:underline underline-offset-8"
                    >
                        Clear all filters
                    </button>
                </div>
            )}
        </div>
    )
}

export default Product