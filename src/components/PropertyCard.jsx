import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Share2, Camera, MapPin, Bed, Bath, Maximize, CheckCircle, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const PropertyCard = ({ property }) => {
  const [isLiked, setIsLiked] = useState(false);

  // Map backend property data to component format
  const data = {
    id: property?.id || 0,
    title: property?.propertySubType ? `${property.bedrooms || ''} BHK ${property.propertySubType}` : 'Property',
    price: property?.expectedPrice ? `₹ ${property.expectedPrice}` : 'Price on request',
    pricePerSqft: property?.pricePerSqFt ? `₹ ${property.pricePerSqFt}/sqft` : '',
    location: property?.locality && property?.city ? `${property.locality}, ${property.city}` : 'Location',
    area: property?.carpetArea ? `${property.carpetArea} ${property.areaUnit || 'sq.ft'}` : 
          property?.builtUpArea ? `${property.builtUpArea} ${property.areaUnit || 'sq.ft'}` : 
          property?.plotArea ? `${property.plotArea} ${property.areaUnit || 'sq.ft'}` : 'N/A',
    bedrooms: property?.bedrooms || 'N/A',
    bathrooms: property?.bathrooms || 'N/A',
    furnishing: property?.furnishing || 'N/A',
    floor: property?.totalFloors ? `${property.totalFloors} Floors` : 'N/A',
    facing: 'N/A', // Not in backend model
    postedBy: property?.ownership || 'Owner',
    images: property?.photos?.length > 0 ? property.photos : [
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop'
    ],
    verified: property?.status === 'approved',
    featured: property?.featured || false,
    availableFrom: property?.availabilityStatus || 'N/A',
    ageOfProperty: property?.propertyAge || 'N/A',
    contactName: property?.owner?.name || 'Property Owner',
    contactVerified: true
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <Link to={`/property/${data.id}`} className="relative md:w-2/5 h-64 md:h-auto block">
          {/* Main Image */}
          <img
            src={data.images[currentImageIndex]}
            alt={data.title}
            className="w-full h-full object-cover"
          />

          {/* Image Counter */}
          <div className="absolute bottom-3 left-3 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
            <Camera className="w-3 h-3" />
            <span>{currentImageIndex + 1}/{data.images.length}</span>
          </div>

          {/* Navigation Dots */}
          <div className="absolute bottom-3 right-3 flex space-x-1">
            {data.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition ${
                  currentImageIndex === index ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>

          {/* Badges */}
          {data.featured && (
            <div className="absolute top-3 left-3 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-bold">
              FEATURED
            </div>
          )}
          {data.verified && (
            <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold flex items-center space-x-1">
              <CheckCircle className="w-3 h-3" />
              <span>VERIFIED</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex flex-col space-y-2 mt-8">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
            >
              <Heart
                className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
              />
            </button>
            <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition">
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </Link>

        {/* Content Section */}
        <div className="flex-1 p-5">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <Link to={`/properties/${data.id}`} className="hover:text-purple-600 transition">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{data.title}</h3>
              </Link>
              <div className="flex items-center text-gray-600 text-sm mb-2">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{data.location}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{data.price}</div>
              <div className="text-xs text-gray-500">{data.pricePerSqft}</div>
            </div>
          </div>

          {/* Property Details */}
          <div className="grid grid-cols-4 gap-4 py-3 border-t border-b border-gray-200 mb-3">
            <div className="flex flex-col items-center">
              <Bed className="w-5 h-5 text-gray-600 mb-1" />
              <span className="text-xs text-gray-600">Bedrooms</span>
              <span className="font-semibold text-gray-900">{data.bedrooms}</span>
            </div>
            <div className="flex flex-col items-center">
              <Bath className="w-5 h-5 text-gray-600 mb-1" />
              <span className="text-xs text-gray-600">Bathrooms</span>
              <span className="font-semibold text-gray-900">{data.bathrooms}</span>
            </div>
            <div className="flex flex-col items-center">
              <Maximize className="w-5 h-5 text-gray-600 mb-1" />
              <span className="text-xs text-gray-600">Area</span>
              <span className="font-semibold text-gray-900">{data.area}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xs text-gray-600 mb-1">Furnishing</span>
              <span className="font-semibold text-gray-900 text-xs text-center">{data.furnishing}</span>
            </div>
          </div>

          {/* Additional Details */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="flex items-center text-sm">
              <span className="text-gray-600 mr-2">Floor:</span>
              <span className="text-gray-900 font-medium">{data.floor}</span>
            </div>
            <div className="flex items-center text-sm">
              <span className="text-gray-600 mr-2">Facing:</span>
              <span className="text-gray-900 font-medium">{data.facing}</span>
            </div>
            <div className="flex items-center text-sm">
              <span className="text-gray-600 mr-2">Posted By:</span>
              <span className="text-purple-600 font-medium">{data.postedBy}</span>
            </div>
            <div className="flex items-center text-sm">
              <span className="text-gray-600 mr-2">Available:</span>
              <span className="text-gray-900 font-medium">{data.availableFrom}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full border border-green-200">
              {data.ageOfProperty}
            </span>
            <span className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-full border border-purple-200">
              Parking Available
            </span>
            <span className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-full border border-purple-200">
              Pet Friendly
            </span>
          </div>

          {/* Contact Section */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="font-bold text-purple-600">{data.contactName.charAt(0)}</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{data.contactName}</p>
                {data.contactVerified && (
                  <p className="text-xs text-green-600 flex items-center">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center space-x-1 px-4 py-2 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition font-semibold">
                <Phone className="w-4 h-4" />
                <span>Call</span>
              </button>
              <button className="flex items-center space-x-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold">
                <Mail className="w-4 h-4" />
                <span>Contact</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
