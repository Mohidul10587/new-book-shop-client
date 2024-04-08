import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { FiUser, FiMail, FiLock, FiLoader ,FiAlertCircle } from 'react-icons/fi';
import url from '@/components/url';

const Signup = () => {
  const router = useRouter();

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${url}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const { token } = await response.json();
      localStorage.setItem('token', token);
      router.push('/');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen pt-24'>
    <div className='flex justify-center px-2'>
    <form onSubmit={handleFormSubmit} className="border bg-violet-400 rounded border-gray-400 md:w-1/2 p-10">
          <p className="text-center text-3xl  mb-4">Sign Up</p>
          {error && (
            <div className="flex items-center space-x-2 mb-4">
              <FiAlertCircle className="text-red-500" size={20} />
              <p className="text-red-500">{error}</p>
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <div className="relative">
              <FiUser className="absolute top-3 left-3 text-gray-400" />
              <input
                id="name"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                className="border border-gray-400 p-2 rounded w-full pl-10"
                type="text"
                placeholder="Name"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <div className="relative">
              <FiMail className="absolute top-3 left-3 text-gray-400" />
              <input
                id="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                className="border border-gray-400 p-2 rounded w-full pl-10"
                type="email"
                placeholder="Email"
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="relative">
              <FiLock className="absolute top-3 left-3 text-gray-400" />
              <input
                id="password"
                name="password"
                value={userData.password}
                onChange={handleInputChange}
                className="border border-gray-400 p-2 rounded w-full pl-10"
                type="password"
                placeholder="Password"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-violet-600 text-white py-2 px-4 rounded-lg w-full transition duration-300 ease-in-out hover:bg-violet-700"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <FiLoader className="animate-spin mr-2" />
                <span>Loading...</span>
              </div>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>
   </div>
  </div>


  );
};

export default Signup;
