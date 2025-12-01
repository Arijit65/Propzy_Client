import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Home, Calendar, Bell } from 'lucide-react';

const PostPropertyComingPopup = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, type: "spring", damping: 25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
              {/* Header with gradient background */}
              <div className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 p-6 text-white">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                    <Home className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Post Property</h2>
                  <p className="text-purple-100">Feature Coming Soon</p>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    We're Working Hard to Bring You This Feature!
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Our property posting feature is currently under development. Soon you'll be able to list your properties with ease and connect with potential buyers and tenants.
                  </p>
                </div>

                {/* Features preview */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Home className="w-4 h-4 text-purple-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Easy property listing process</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-pink-50 rounded-lg">
                    <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-pink-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Smart scheduling for viewings</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Bell className="w-4 h-4 text-purple-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Instant notifications for inquiries</span>
                  </div>
                </div>

                {/* Call to action */}
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-4">
                    Want to be notified when this feature launches?
                  </p>
                  <div className="flex space-x-3">
                    <button
                      onClick={onClose}
                      className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                    >
                      Maybe Later
                    </button>
                    <button
                      onClick={onClose}
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg"
                    >
                      Notify Me
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom decoration */}
              <div className="h-1 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600"></div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PostPropertyComingPopup;
