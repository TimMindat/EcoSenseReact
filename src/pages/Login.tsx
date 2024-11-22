import React from 'react';
import { AuthForm } from '../components/AuthForm';
import { Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically:
    // 1. Get form data
    // 2. Validate
    // 3. Make API call
    // 4. Handle response
    
    // For demo purposes, we'll just simulate a successful login
    await new Promise(resolve => setTimeout(resolve, 1000));
    navigate('/'); // Redirect to home page after successful login
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Leaf className="h-12 w-12 text-green-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign in to EcoSense
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <AuthForm type="login" onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}