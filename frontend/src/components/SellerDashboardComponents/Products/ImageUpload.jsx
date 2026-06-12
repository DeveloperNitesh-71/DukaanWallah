import React, { useState, useRef } from 'react';
import { IoMdCloudUpload, IoMdCamera, IoMdClose, IoMdAdd } from 'react-icons/io';
import { useToast } from '../../../context/ToastContext';

const ImageUpload = ({ onImagesSelect, initialImages = [] }) => {
  const { showToast } = useToast();
  const [previews, setPreviews] = useState(initialImages);
  const [files, setFiles] = useState([]); // Store actual file objects
  const [isDragging, setIsDragging] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    processFiles(selectedFiles);
  };

  const processFiles = (newFiles) => {
    const validFiles = newFiles.filter(file => file.type.startsWith('image/'));
    
    if (validFiles.length !== newFiles.length) {
      showToast('Some files were skipped. Please upload only images.', 'error');
    }

    const newPreviews = [];
    const newFileObjects = [...files];

    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews(prev => [...prev, reader.result]);
        newFileObjects.push(file);
        setFiles(newFileObjects);
        onImagesSelect(newFileObjects);
      };
      reader.readAsDataURL(file);
    });
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
    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setShowCamera(true);
      }
    } catch (err) {
      showToast('Could not access camera: ' + err.message, 'error');
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
    
    canvas.toBlob((blob) => {
      const file = new File([blob], `captured-${Date.now()}.jpg`, { type: "image/jpeg" });
      const previewUrl = URL.createObjectURL(blob);
      
      setPreviews(prev => [...prev, previewUrl]);
      const newFiles = [...files, file];
      setFiles(newFiles);
      onImagesSelect(newFiles);
      
      stopCamera();
    }, 'image/jpeg');
  };

  const removeImage = (index) => {
    const newPreviews = previews.filter((_, i) => i !== index);
    setPreviews(newPreviews);
    
    // If it was a newly added file
    const newFiles = files.filter((_, i) => (i + (previews.length - files.length)) !== index);
    setFiles(newFiles);
    
    onImagesSelect(newFiles, newPreviews.filter(p => p.startsWith('http')));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
          Product Images (At least 1 required) *
        </label>
        <span className="text-[10px] font-bold text-gray-400">{previews.length}/5 Images</span>
      </div>
      
      {!showCamera ? (
        <div className="space-y-4">
          {/* Previews Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {previews.map((src, index) => (
              <div key={index} className="relative aspect-square rounded-2xl overflow-hidden border border-gray-100 group shadow-sm">
                <img src={src} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                <button 
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm rounded-lg text-red-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                >
                  <IoMdClose />
                </button>
              </div>
            ))}
            
            {previews.length < 5 && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className={`aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center transition-all
                  ${isDragging ? 'border-green-500 bg-green-50' : 'border-gray-100 bg-gray-50 hover:bg-gray-100'}`}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
              >
                <IoMdAdd className="text-2xl text-gray-400" />
                <span className="text-[10px] font-black uppercase text-gray-400 mt-1">Add Image</span>
              </button>
            )}
          </div>

          {previews.length === 0 && (
            <div 
              className="border-2 border-dashed rounded-3xl p-12 text-center space-y-4 border-gray-100 bg-gray-50"
              onClick={() => fileInputRef.current?.click()}
            >
              <IoMdCloudUpload className="text-4xl text-gray-300 mx-auto" />
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Click or drag images here</p>
            </div>
          )}

          <div className="flex gap-3">
             <button 
                type="button"
                onClick={startCamera}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-gray-900 shadow-sm transition-all active:scale-95"
              >
                <IoMdCamera className="text-lg" /> Use Camera
              </button>
          </div>
        </div>
      ) : (
        <div className="relative rounded-3xl overflow-hidden bg-black aspect-square max-w-md mx-auto">
          <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
          
          <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-6">
            <button 
              type="button"
              onClick={stopCamera}
              className="p-3 bg-white/20 backdrop-blur-md rounded-xl text-white hover:bg-white/30 transition-all"
            >
              <IoMdClose className="text-xl" />
            </button>
            <button 
              type="button"
              onClick={capturePhoto}
              className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 active:scale-90 transition-all"
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
        multiple
        className="hidden" 
      />
    </div>
  );
};

export default ImageUpload;
