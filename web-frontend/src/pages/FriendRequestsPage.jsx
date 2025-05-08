import React, { useEffect, useState } from 'react';
import { FiUser, FiCheck, FiX, FiRefreshCw } from 'react-icons/fi';
import { toast } from 'react-toastify';

const FriendRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchRequests = async () => {
    const loadingState = isRefreshing ? setIsRefreshing : setIsLoading;
    loadingState(true);
    try {
      const response = await fetch('http://localhost:3005/friend-requests', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      setRequests(data);
    } catch (err) {
      console.error('Error fetching friend requests:', err);
      toast.error('Failed to load friend requests');
    } finally {
      loadingState(false);
    }
  };

  const respondToRequest = async (requestId, action) => {
    try {
      const endpoint = `http://localhost:3005/friend-request/${action}`;
      const response = await fetch(endpoint, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ requestId }),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success(action === 'accept' ? 'Friend request accepted!' : 'Friend request declined');
        setRequests(prev => prev.filter(req => req.id !== requestId));
      } else {
        toast.error(result.message || 'Failed to respond to request');
      }
    } catch (err) {
      console.error(`Error responding to request:`, err);
      toast.error('An error occurred while processing your request');
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
      <div className="max-w-2xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-5">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold text-white">Friend Requests</h1>
              <button
                onClick={fetchRequests}
                disabled={isRefreshing}
                className="text-indigo-100 hover:text-white transition-colors flex items-center"
              >
                <FiRefreshCw className={`mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span className="text-sm">Refresh</span>
              </button>
            </div>
          </div>
          
          {/* Content */}
          <div className="px-6 py-4">
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
              </div>
            ) : requests.length === 0 ? (
              <div className="text-center py-10">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 mb-4">
                  <FiUser className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">No pending requests</h3>
                <p className="mt-1 text-gray-500">
                  When you receive friend requests, they'll appear here.
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {requests.map((req) => (
                  <li key={req.id} className="py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                            <span className="text-indigo-600 font-bold text-lg">
                              {req.senderName.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-base font-medium text-gray-900">{req.senderName}</h3>
                          <p className="text-sm text-gray-500">{req.senderEmail}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            Sent {new Date(req.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => respondToRequest(req.id, 'accept')}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                          title="Accept request"
                        >
                          <FiCheck className="mr-1" />
                          Accept
                        </button>
                        <button
                          onClick={() => respondToRequest(req.id, 'reject')}
                          className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-full shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                          title="Decline request"
                        >
                          <FiX className="mr-1" />
                          Decline
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendRequestsPage;