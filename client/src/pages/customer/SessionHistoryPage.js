import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function SessionHistoryPage() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/sessions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSessions(response.data.sessions);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-8">Loading sessions...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Session History</h1>
      
      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-4 py-3 text-left">Start Time</th>
              <th className="px-4 py-3 text-left">Duration (mins)</th>
              <th className="px-4 py-3 text-left">Data Used (MB)</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session) => (
              <tr key={session._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{new Date(session.startTime).toLocaleString()}</td>
                <td className="px-4 py-3">{session.duration || '-'}</td>
                <td className="px-4 py-3">{session.dataUsed || 0}</td>
                <td className="px-4 py-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    session.status === 'active' ? 'bg-green-100 text-green-800' :
                    session.status === 'ended' ? 'bg-gray-100 text-gray-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {session.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {sessions.length === 0 && (
          <p className="text-center py-8 text-gray-600">No sessions yet. Activate a voucher to start browsing!</p>
        )}
      </div>
    </div>
  );
}

export default SessionHistoryPage;
