import React, { useState, useRef, useCallback } from 'react';
import { IoMdCloudUpload, IoMdCamera, IoMdClose, IoMdRefresh } from 'react-icons/io';

const ImageUpload = ({ onImageSelect, initialImage }) => {
  const [preview, setPreview] = useState(initialImage || null);
  const [isDragging, setIsDragging] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setPreview(base64String);
      onImageSelect(base64String);
    };
    reader.readAsDataURL(file);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      videoRef.current.srcObject = stream;
      streamRef.current = stream;
      setShowCamera(true);
    } catch (err) {
      alert('Could not access camera: ' + err.message);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setShowCamera(false);
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    const imageData = canvas.toDataURL('image/jpeg');
    setPreview(imageData);
    onImageSelect(imageData);
    stopCamera();
  };

  const clearImage = () => {
    setPreview(null);
    onImageSelect('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-4">
      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Product Image *</label>
      
      {!showCamera ? (
        <div 
          className={`relative border-2 border-dashed rounded-3xl transition-all flex flex-col items-center justify-center p-8 min-h-[300px] cursor-pointer
            ${isDragging ? 'border-green-500 bg-green-50' : 'border-gray-100 bg-gray-50 hover:bg-gray-100'}
            ${preview ? 'border-solid p-4' : ''}`}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => !preview && fileInputRef.current?.click()}
        >
          {preview ? (
            <div className="relative w-full h-full flex flex-col items-center">
              <div className="w-full max-h-[400px] rounded-2xl overflow-hidden bg-white shadow-sm flex items-center justify-center">
                <img src={preview} alt="Preview" className="max-w-full max-h-[400px] object-contain" />
              </div>
              <div className="absolute top-2 right-2 flex gap-2">
                <button 
                  type="button"
                  onClick={(e) => { e.stopPropagation(); clearImage(); }}
                  className="p-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg text-red-500 hover:bg-red-50 transition-all"
                  title="Remove Image"
                >
                  <IoMdClose className="text-xl" />
                </button>
              </div>
              <div className="mt-4 flex gap-4">
                <button 
                  type="button"
                  onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-gray-900 shadow-sm transition-all"
                >
                  <IoMdRefresh className="text-lg" /> Replace
                </button>
                <button 
                  type="button"
                  onClick={(e) => { e.stopPropagation(); startCamera(); }}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-gray-900 shadow-sm transition-all"
                >
                  <IoMdCamera className="text-lg" /> Camera
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm text-gray-300">
                <IoMdCloudUpload className="text-4xl" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Drag & Drop Image</p>
                <p className="text-xs text-gray-400 mt-1 font-medium">PNG, JPG or WEBP (MAX. 5MB)</p>
              </div>
              <div className="flex items-center justify-center gap-4 pt-2">
                <button 
                  type="button"
                  onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                  className="px-6 py-2.5 bg-gray-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-gray-200 hover:bg-green-600 transition-all active:scale-95"
                >
                  Select File
                </button>
                <span className="text-[10px] font-black text-gray-300 uppercase">OR</span>
                <button 
                  type="button"
                  onClick={(e) => { e.stopPropagation(); startCamera(); }}
                  className="px-6 py-2.5 bg-white border border-gray-100 text-gray-900 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm hover:bg-gray-50 transition-all active:scale-95"
                >
                  Take Photo
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="relative rounded-3xl overflow-hidden bg-black aspect-video flex items-center justify-center group">
          <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
          
          <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-8">
            <button 
              type="button"
              onClick={stopCamera}
              className="p-4 bg-white/20 backdrop-blur-md rounded-2xl text-white hover:bg-white/30 transition-all"
              title="Cancel"
            >
              <IoMdClose className="text-2xl" />
            </button>
            <button 
              type="button"
              onClick={capturePhoto}
              className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-90 transition-all"
              title="Capture"
            >
              <div className="w-12 h-12 border-2 border-gray-900 rounded-full"></div>
            </button>
          </div>
          
          <canvas ref={canvasRef} className="hidden" />
        </div>
      )}
      
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden" 
      />
    </div>
  );
};

export default ImageUpload;
