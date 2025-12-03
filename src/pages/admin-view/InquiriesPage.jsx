import { useState, useEffect, useCallback } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { 
  Mail, 
  Phone, 
  User, 
  MapPin, 
  Calendar,
  Filter,
  Search,
  Eye,
  Trash2,
  CheckCircle,
  Clock,
  XCircle,
  MessageSquare,
  Home,
  Building2,
  TrendingUp
} from 'lucide-react';

const InquiriesPage = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  // Filters
  const [filters, setFilters] = useState({
    status: 'all',
    source: 'all',
    search: '',
    page: 1,
    limit: 20
  });

  // Pagination
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 0,
    currentPage: 1
  });

  // Fetch enquiries
  const fetchEnquiries = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const queryParams = new URLSearchParams({
        status: filters.status,
        source: filters.source,
        search: filters.search,
        page: filters.page,
        limit: filters.limit
      });

      const response = await fetch(`http://localhost:5001/api/admin/enquiries?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (data.success) {
        setEnquiries(data.data.enquiries);
        setPagination({
          total: data.data.total,
          totalPages: data.data.totalPages,
          currentPage: data.data.currentPage
        });
      } else {
        console.error('Failed to fetch enquiries:', data.error);
      }
    } catch (error) {
      console.error('Error fetching enquiries:', error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Fetch statistics
  const fetchStats = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5001/api/admin/enquiries/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  }, []);

  // Update enquiry status
  const updateEnquiryStatus = async (enquiryId, status, adminNotes) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5001/api/admin/enquiries/${enquiryId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status, adminNotes })
      });

      const data = await response.json();

      if (data.success) {
        alert('Enquiry status updated successfully');
        fetchEnquiries();
        fetchStats();
        setShowModal(false);
      } else {
        alert(data.error || 'Failed to update enquiry');
      }
    } catch (error) {
      console.error('Error updating enquiry:', error);
      alert('Failed to update enquiry');
    }
  };

  // Delete enquiry
  const deleteEnquiry = async (enquiryId) => {
    if (!window.confirm('Are you sure you want to delete this enquiry?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5001/api/admin/enquiries/${enquiryId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (data.success) {
        alert('Enquiry deleted successfully');
        fetchEnquiries();
        fetchStats();
        setShowModal(false);
      } else {
        alert(data.error || 'Failed to delete enquiry');
      }
    } catch (error) {
      console.error('Error deleting enquiry:', error);
      alert('Failed to delete enquiry');
    }
  };

  // View enquiry details
  const viewEnquiryDetails = async (enquiryId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5001/api/admin/enquiries/${enquiryId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (data.success) {
        setSelectedEnquiry(data.enquiry);
        setShowModal(true);
      }
    } catch (error) {
      console.error('Error fetching enquiry details:', error);
    }
  };

  useEffect(() => {
    fetchEnquiries();
    fetchStats();
  }, [fetchEnquiries, fetchStats]);

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock },
      contacted: { bg: 'bg-blue-100', text: 'text-blue-800', icon: Phone },
      resolved: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
      closed: { bg: 'bg-gray-100', text: 'text-gray-800', icon: XCircle }
    };

    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <Icon className="w-3 h-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Source badge component
  const SourceBadge = ({ source }) => {
    const sourceConfig = {
      home: { bg: 'bg-purple-100', text: 'text-purple-800', icon: Home, label: 'Home Page' },
      property_detail: { bg: 'bg-orange-100', text: 'text-orange-800', icon: Building2, label: 'Property Detail' },
      other: { bg: 'bg-gray-100', text: 'text-gray-800', icon: MessageSquare, label: 'Other' }
    };

    const config = sourceConfig[source] || sourceConfig.other;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${config.bg} ${config.text}`}>
        <Icon className="w-3 h-3" />
        {config.label}
      </span>
    );
  };

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Customer Enquiries</h1>
          <p className="text-gray-600">Manage and respond to customer enquiries</p>
        </div>

        {/* Statistics Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Enquiries</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <MessageSquare className="w-10 h-10 text-purple-600" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Pending</p>
                  <p className="text-3xl font-bold text-yellow-600">{stats.byStatus.pending}</p>
                </div>
                <Clock className="w-10 h-10 text-yellow-600" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Contacted</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.byStatus.contacted}</p>
                </div>
                <Phone className="w-10 h-10 text-blue-600" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Recent (30 days)</p>
                  <p className="text-3xl font-bold text-green-600">{stats.recentEnquiries}</p>
                </div>
                <TrendingUp className="w-10 h-10 text-green-600" />
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-wrap gap-4">
            {/* Status Filter */}
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Filter className="w-4 h-4 inline mr-1" />
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value, page: 1 })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="contacted">Contacted</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            {/* Source Filter */}
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Filter className="w-4 h-4 inline mr-1" />
                Source
              </label>
              <select
                value={filters.source}
                onChange={(e) => setFilters({ ...filters, source: e.target.value, page: 1 })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Sources</option>
                <option value="home">Home Page</option>
                <option value="property_detail">Property Detail</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Search */}
            <div className="flex-1 min-w-[300px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Search className="w-4 h-4 inline mr-1" />
                Search
              </label>
              <input
                type="text"
                placeholder="Search by name, email, phone, location..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value, page: 1 })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Enquiries Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          ) : enquiries.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No enquiries found</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Source
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {enquiries.map((enquiry) => (
                      <tr key={enquiry.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          #{enquiry.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-purple-600" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{enquiry.name}</div>
                              {enquiry.location && (
                                <div className="text-xs text-gray-500 flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {enquiry.location}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 flex items-center gap-1">
                            <Phone className="w-4 h-4 text-gray-400" />
                            {enquiry.phone}
                          </div>
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <Mail className="w-3 h-3 text-gray-400" />
                            {enquiry.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <SourceBadge source={enquiry.source} />
                          {enquiry.property && (
                            <div className="text-xs text-gray-500 mt-1">
                              Property #{enquiry.propertyId}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={enquiry.status} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(enquiry.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => viewEnquiryDetails(enquiry.id)}
                              className="text-purple-600 hover:text-purple-900"
                              title="View Details"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => deleteEnquiry(enquiry.id)}
                              className="text-red-600 hover:text-red-900"
                              title="Delete"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Showing page {pagination.currentPage} of {pagination.totalPages} ({pagination.total} total)
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
                      disabled={filters.page === 1}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
                      disabled={filters.page === pagination.totalPages}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Enquiry Detail Modal */}
        {showModal && selectedEnquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Enquiry Details</h2>
                  <p className="text-sm text-gray-600">ID: #{selectedEnquiry.id}</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              {/* Customer Information */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Customer Information</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-gray-400" />
                    <span className="font-medium">{selectedEnquiry.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <span>{selectedEnquiry.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span>{selectedEnquiry.phone}</span>
                  </div>
                  {selectedEnquiry.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <span>{selectedEnquiry.location}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Enquiry Details */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Enquiry Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Source:</span>
                    <SourceBadge source={selectedEnquiry.source} />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <StatusBadge status={selectedEnquiry.status} />
                  </div>
                  {selectedEnquiry.enquiryType && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium">{selectedEnquiry.enquiryType.toUpperCase()}</span>
                    </div>
                  )}
                  {selectedEnquiry.userType && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">User Type:</span>
                      <span className="font-medium">{selectedEnquiry.userType}</span>
                    </div>
                  )}
                  {selectedEnquiry.reason && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Reason:</span>
                      <span className="font-medium">{selectedEnquiry.reason}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Created:</span>
                    <span>{new Date(selectedEnquiry.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Property Details (if applicable) */}
              {selectedEnquiry.property && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Property Details</h3>
                  <div className="bg-purple-50 rounded-lg p-4 space-y-2">
                    <div className="font-medium">Property ID: #{selectedEnquiry.property.id}</div>
                    <div>{selectedEnquiry.property.propertyType} - {selectedEnquiry.property.bedrooms} BHK</div>
                    <div className="text-sm text-gray-600">
                      {selectedEnquiry.property.locality}, {selectedEnquiry.property.city}
                    </div>
                    <div className="text-sm font-semibold text-purple-600">
                      ₹{selectedEnquiry.property.expectedPrice}
                    </div>
                  </div>
                </div>
              )}

              {/* Message */}
              {selectedEnquiry.message && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Message</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700">{selectedEnquiry.message}</p>
                  </div>
                </div>
              )}

              {/* Admin Notes */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Admin Notes</h3>
                <textarea
                  defaultValue={selectedEnquiry.adminNotes || ''}
                  id="adminNotes"
                  rows={3}
                  placeholder="Add internal notes here..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Status Update */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Update Status</h3>
                <select
                  id="statusSelect"
                  defaultValue={selectedEnquiry.status}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="pending">Pending</option>
                  <option value="contacted">Contacted</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    const status = document.getElementById('statusSelect').value;
                    const adminNotes = document.getElementById('adminNotes').value;
                    updateEnquiryStatus(selectedEnquiry.id, status, adminNotes);
                  }}
                  className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => deleteEnquiry(selectedEnquiry.id)}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default InquiriesPage;
