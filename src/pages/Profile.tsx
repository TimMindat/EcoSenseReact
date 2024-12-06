import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Settings, Clock, Activity, LogOut } from 'lucide-react';
import { Link } from '../components/Link';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';

export function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-green-600 px-6 py-16">
            <div className="flex flex-col items-center">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'Profile'}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                />
              ) : (
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-white flex items-center justify-center">
                  <User className="w-16 h-16 text-green-600" />
                </div>
              )}
              <h1 className="mt-4 text-3xl font-bold text-white">
                {user.displayName || 'Welcome!'}
              </h1>
              <p className="text-green-100">{user.email}</p>
              <Button
                variant="secondary"
                onClick={handleLogout}
                className="mt-6 inline-flex items-center"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            {/* Account Details */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-4">
                <Settings className="w-6 h-6 text-green-600 mr-2" />
                <h2 className="text-xl font-semibold">Account Details</h2>
              </div>
              <div className="space-y-3">
                <p className="text-gray-600">
                  <span className="font-medium">Account Type:</span> Regular User
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Member Since:</span>{' '}
                  {user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A'}
                </p>
                <Link
                  href="/settings"
                  className="inline-flex items-center text-green-600 hover:text-green-700"
                >
                  Edit Profile Settings
                  <Settings className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-4">
                <Clock className="w-6 h-6 text-green-600 mr-2" />
                <h2 className="text-xl font-semibold">Recent Activity</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Activity className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <p className="text-gray-900">Logged in successfully</p>
                    <p className="text-sm text-gray-500">
                      {new Date().toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Environmental Impact */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-4">
                <Activity className="w-6 h-6 text-green-600 mr-2" />
                <h2 className="text-xl font-semibold">Environmental Impact</h2>
              </div>
              <div className="space-y-3">
                <p className="text-gray-600">
                  Track your contribution to environmental monitoring and awareness.
                </p>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center text-green-600 hover:text-green-700"
                >
                  View Full Dashboard
                  <Activity className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}