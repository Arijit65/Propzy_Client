import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { X, Sparkles, Rocket, Bell } from 'lucide-react';

const PostPropertyComingPopup = ({ isOpen, onClose }) => {
  // Close on escape key and manage body scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const popupContent = (
    <div className="fixed inset-0" style={{ zIndex: 99999 }}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        style={{ animation: 'fadeIn 0.2s ease-out' }}
      />

      {/* Popup Container */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div 
          className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
          onClick={(e) => e.stopPropagation()}
          style={{ animation: 'slideUp 0.3s ease-out', maxHeight: '90vh' }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white hover:bg-gray-100 rounded-full transition-all shadow-lg text-gray-700 hover:text-gray-900"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Content Container with Scroll */}
          <div className="overflow-y-auto scrollbar-hide" style={{ maxHeight: '90vh' }}>
            {/* Header with Purple Background */}
            <div className="relative bg-purple-600 px-8 pt-12 pb-8 text-white">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
              
              <div className="relative text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-4 rotate-6 hover:rotate-0 transition-transform">
                  <Rocket className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-bold mb-2">Coming Soon!</h2>
                <p className="text-purple-100 text-lg">Property Posting Feature</p>
              </div>
            </div>

            {/* Main Content */}
            <div className="px-8 py-8">
              {/* Announcement Box */}
              <div className="bg-linear-to-br from-purple-50 to-white border-2 border-purple-200 rounded-2xl p-6 mb-6">
                <div className="flex items-start space-x-3 mb-4">
                  <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center shrink-0 mt-1">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Something Exciting is Coming!
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      We're building an amazing property listing experience just for you. Soon you'll be able to showcase your properties to thousands of potential buyers and renters.
                    </p>
                  </div>
                </div>
              </div>

              {/* Features Grid */}
              <div className="mb-8">
                <h4 className="text-lg font-bold text-gray-900 mb-4">What to Expect:</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-4 p-4 bg-white border border-gray-200 rounded-xl hover:border-purple-300 hover:shadow-md transition-all">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center shrink-0">
                      <Rocket className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Lightning Fast Listings</p>
                      <p className="text-sm text-gray-600">Post your property in under 5 minutes</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-white border border-gray-200 rounded-xl hover:border-purple-300 hover:shadow-md transition-all">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center shrink-0">
                      <Bell className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Real-time Notifications</p>
                      <p className="text-sm text-gray-600">Get instant alerts for inquiries</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-white border border-gray-200 rounded-xl hover:border-purple-300 hover:shadow-md transition-all">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center shrink-0">
                      <Sparkles className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Premium Visibility</p>
                      <p className="text-sm text-gray-600">Reach thousands of active buyers</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="bg-linear-to-r from-purple-600 to-purple-700 rounded-2xl p-6 text-white text-center">
                <h4 className="text-xl font-bold mb-2">Be the First to Know!</h4>
                <p className="text-purple-100 mb-6">
                  Get notified the moment we launch this feature
                </p>
                <div className="flex space-x-3">
                  <button
                    onClick={onClose}
                    className="flex-1 px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/30 transition-all border border-white/30"
                  >
                    Not Now
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-1 px-6 py-3 bg-white text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-all shadow-lg"
                  >
                    Notify Me 🔔
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render to document.body using portal
  return ReactDOM.createPortal(popupContent, document.body);
};

export default PostPropertyComingPopup;
