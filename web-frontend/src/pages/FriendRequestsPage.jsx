import React, { useEffect, useState } from 'react';
import NavigationBar from './NavigationBar';

const FriendRequestsPage = ({ toggleChatbot, isChatbotVisible }) => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRequests = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3005/friend-requests', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      setRequests(data);
    } catch (err) {
      console.error('Error fetching friend requests:', err);
    } finally {
      setIsLoading(false);
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
        // Use toast notification instead of alert for better UX
        const message = action === 'accept' ? 'Friend request accepted!' : 'Friend request rejected';
        // Replace alert with toast when you have a toast system
        alert(message);
        setRequests(prev => prev.filter(req => req.id !== requestId));
      } else {
        alert(result.message || 'Failed to respond to request');
      }
    } catch (err) {
      console.error(`Error responding to request:`, err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="border-b border-gray-200 px-6 py-5">
            <h1 className="text-2xl font-bold text-gray-900">Friend Requests</h1>
          </div>
          
          <div className="px-6 py-4">
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : requests.length === 0 ? (
              <div className="text-center py-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <p className="text-gray-500 text-lg">No pending friend requests</p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {requests.map((req) => (
                  <li key={req.id} className="py-4 sm:py-5">
                    <div className="flex items-center justify-between flex-wrap sm:flex-nowrap gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-600 font-medium text-lg">
                              {req.senderName.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-base font-medium text-gray-900">{req.senderName}</h3>
                          <p className="text-sm text-gray-500">{req.senderEmail}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-3 mt-2 sm:mt-0">
                        <button
                          onClick={() => respondToRequest(req.id, 'accept')}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => respondToRequest(req.id, 'reject')}
                          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <button 
              onClick={fetchRequests} 
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Refresh requests
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendRequestsPage;