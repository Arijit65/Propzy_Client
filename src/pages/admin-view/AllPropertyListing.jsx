import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Edit, Eye, Trash2, Star, TrendingUp, Award, MapPin, Calendar, Tag, Filter, Search, Download, RefreshCw } from 'lucide-react';

const AllPropertyListing = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    propertyType: 'all',
    purpose: 'all',
    category: 'all',
    city: '',
    search: ''
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalProperties: 0,
    limit: 20
  });
  const [selectedProperties, setSelectedProperties] = useState([]);

  // Fetch properties from API
  const fetchProperties = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: pagination.currentPage,
        limit: pagination.limit,
        ...filters
      });

      const response = await fetch(`/api/admin/properties?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });

      const data = await response.json();
      
      if (data.success) {
        setProperties(data.data.properties);
        setPagination(prev => ({
          ...prev,
          totalPages: data.data.totalPages,
          totalProperties: data.data.total
        }));
      } else {
        setError(data.message || 'Failed to fetch properties');
      }
    } catch (err) {
      setError('Error fetching properties');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Update property categorization
  const updatePropertyCategory = async (propertyId, categoryData) => {
    try {
      const response = await fetch(`/api/admin/properties/${propertyId}/categorize`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(categoryData)
      });

      const data = await response.json();
      
      if (data.success) {
        // Update the property in the local state
        setProperties(prev => prev.map(prop => 
          prop.id === propertyId ? { ...prop, ...categoryData } : prop
        ));
        return true;
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      console.error('Error updating property:', err);
      return false;
    }
  };

  // Toggle category for a property
  const toggleCategory = async (propertyId, category) => {
    const property = properties.find(p => p.id === propertyId);
    const newValue = !property[category];
    
    const success = await updatePropertyCategory(propertyId, {
      [category]: newValue
    });

    if (success) {
      // Show success message
      console.log(`Property ${newValue ? 'added to' : 'removed from'} ${category}`);
    }
  };

  // Bulk update categories
  const bulkUpdateCategories = async (categoryData) => {
    try {
      const response = await fetch('/api/admin/properties/bulk-categorize', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({
          propertyIds: selectedProperties,
          ...categoryData
        })
      });

      const data = await response.json();
      
      if (data.success) {
        fetchProperties(); // Refresh the list
        setSelectedProperties([]);
      }
    } catch (err) {
      console.error('Bulk update error:', err);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [pagination.currentPage, filters]); // eslint-disable-line react-hooks/exhaustive-deps

  // Get status badge color
  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return styles[status] || 'bg-gray-100 text-gray-800';
  };

  // Get category badges for a property
  const getCategoryBadges = (property) => {
    const categories = [];
    if (property.isFeatured) categories.push({ name: 'Featured', icon: Star, color: 'bg-blue-100 text-blue-800' });
    if (property.isTopPick) categories.push({ name: 'Top Pick', icon: Award, color: 'bg-purple-100 text-purple-800' });
    if (property.isHighlighted) categories.push({ name: 'Highlighted', icon: TrendingUp, color: 'bg-orange-100 text-orange-800' });
    if (property.isInvestmentProperty) categories.push({ name: 'Investment', icon: TrendingUp, color: 'bg-green-100 text-green-800' });
    if (property.isRecentlyAdded) categories.push({ name: 'Recently Added', icon: Calendar, color: 'bg-indigo-100 text-indigo-800' });
    return categories;
  };

  return (
    <AdminLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">All Properties</h1>
              <p className="text-gray-600 mt-1">Manage and categorize property listings</p>
            </div>
          <div className="flex gap-3">
            <button 
              onClick={() => fetchProperties()}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filters:</span>
            </div>
            
            {/* Search */}
            <div className="relative flex-1 min-w-[200px] max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search properties..."
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <select
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>

            {/* Property Type Filter */}
            <select
              value={filters.propertyType}
              onChange={(e) => setFilters(prev => ({ ...prev, propertyType: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Types</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
            </select>

            {/* Purpose Filter */}
            <select
              value={filters.purpose}
              onChange={(e) => setFilters(prev => ({ ...prev, purpose: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Purposes</option>
              <option value="Sell">For Sale</option>
              <option value="Rent / Lease">For Rent</option>
              <option value="PG">PG</option>
            </select>

            {/* Category Filter */}
            <select
              value={filters.category}
              onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Categories</option>
              <option value="featured">Featured</option>
              <option value="topPick">Top Pick</option>
              <option value="highlighted">Highlighted</option>
              <option value="investment">Investment</option>
              <option value="recent">Recently Added</option>
            </select>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedProperties.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-700">
                {selectedProperties.length} properties selected
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => bulkUpdateCategories({ isFeatured: true })}
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                >
                  Mark Featured
                </button>
                <button
                  onClick={() => bulkUpdateCategories({ isTopPick: true })}
                  className="px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700"
                >
                  Mark Top Pick
                </button>
                <button
                  onClick={() => bulkUpdateCategories({ isHighlighted: true })}
                  className="px-3 py-1 bg-orange-600 text-white text-sm rounded hover:bg-orange-700"
                >
                  Mark Highlighted
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Properties Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
              <p className="mt-2 text-gray-600">Loading properties...</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center text-red-600">
              <p>{error}</p>
            </div>
          ) : properties.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p>No properties found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left">
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedProperties(properties.map(p => p.id));
                          } else {
                            setSelectedProperties([]);
                          }
                        }}
                        className="rounded border-gray-300"
                      />
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Property</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Location</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Price</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Categories</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {properties.map((property) => (
                    <tr key={property.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <input
                          type="checkbox"
                          checked={selectedProperties.includes(property.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedProperties(prev => [...prev, property.id]);
                            } else {
                              setSelectedProperties(prev => prev.filter(id => id !== property.id));
                            }
                          }}
                          className="rounded border-gray-300"
                        />
                      </td>
                      
                      <td className="px-4 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                            {property.photos && property.photos[0] ? (
                              <img src={property.photos[0]} alt="Property" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <MapPin className="w-6 h-6" />
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              {property.propertySubType} in {property.locality}
                            </div>
                            <div className="text-sm text-gray-500">
                              {property.bedrooms}BHK • {property.purpose}
                            </div>
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-4 py-4">
                        <div className="text-sm text-gray-900">{property.city}</div>
                        <div className="text-sm text-gray-500">{property.locality}</div>
                      </td>
                      
                      <td className="px-4 py-4">
                        <div className="text-sm font-medium text-gray-900">₹{property.expectedPrice}</div>
                        <div className="text-sm text-gray-500">₹{property.pricePerSqFt}/sq.ft</div>
                      </td>
                      
                      <td className="px-4 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(property.status)}`}>
                          {property.status}
                        </span>
                      </td>
                      
                      <td className="px-4 py-4">
                        <div className="flex flex-wrap gap-1">
                          {getCategoryBadges(property).map((category, index) => {
                            const IconComponent = category.icon;
                            return (
                              <span key={index} className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${category.color}`}>
                                <IconComponent className="w-3 h-3 mr-1" />
                                {category.name}
                              </span>
                            );
                          })}
                        </div>
                      </td>
                      
                      <td className="px-4 py-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => toggleCategory(property.id, 'isFeatured')}
                            className={`p-1 rounded ${property.isFeatured ? 'text-blue-600 bg-blue-50' : 'text-gray-400 hover:text-blue-600'}`}
                            title="Toggle Featured"
                          >
                            <Star className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => toggleCategory(property.id, 'isTopPick')}
                            className={`p-1 rounded ${property.isTopPick ? 'text-purple-600 bg-purple-50' : 'text-gray-400 hover:text-purple-600'}`}
                            title="Toggle Top Pick"
                          >
                            <Award className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => toggleCategory(property.id, 'isHighlighted')}
                            className={`p-1 rounded ${property.isHighlighted ? 'text-orange-600 bg-orange-50' : 'text-gray-400 hover:text-orange-600'}`}
                            title="Toggle Highlighted"
                          >
                            <TrendingUp className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-green-600 rounded">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-blue-600 rounded">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-red-600 rounded">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-between items-center mt-6">
            <div className="text-sm text-gray-700">
              Showing {((pagination.currentPage - 1) * pagination.limit) + 1} to {Math.min(pagination.currentPage * pagination.limit, pagination.totalProperties)} of {pagination.totalProperties} properties
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage - 1 }))}
                disabled={pagination.currentPage === 1}
                className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              {[...Array(Math.min(5, pagination.totalPages))].map((_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setPagination(prev => ({ ...prev, currentPage: page }))}
                    className={`px-3 py-2 border rounded-lg ${
                      pagination.currentPage === page
                        ? 'bg-purple-600 text-white border-purple-600'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
              <button
                onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage + 1 }))}
                disabled={pagination.currentPage === pagination.totalPages}
                className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    </AdminLayout>
  );
};

export default AllPropertyListing;
