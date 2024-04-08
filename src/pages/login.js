import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import url from '@/components/url';
import { ThemeContext } from './_app';
import jwt_decode from 'jwt-decode';
import Link from 'next/link';
import { FiMail, FiLock, FiUserPlus, FiAlertCircle, FiHelpCircle, FiLoader } from 'react-icons/fi';

const Login = () => {
  const value = useContext(ThemeContext);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${url}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message);
        setIsLoading(false);
        return;
      }
      localStorage.setItem('token', data.token);
      router.push('/');
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }

    const fetchCartProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const decodedToken = jwt_decode(token);
        if (!decodedToken) {
          return;
        }

        const res = await fetch(`${url}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          return;
        }
        const { email } = await res.json();

        const data = await fetch(`${url}/users/${email}`).then((res) => res.json());

        if (data.role) {
          value.setAdmin(true);
        } else {
          value.setAdmin(false);
        }
      } catch (err) {
        console.error(err);
      }
    };
    await fetchCartProducts();
  };

  return (
   <div className='min-h-screen pt-24'>
     <div className='flex justify-center px-2'>
      <form className='border border-gray-400 bg-violet-400 rounded md:w-1/2 p-10' onSubmit={handleLogin}>
        <div className='text-center text-3xl mb-4'>Login</div>
        {error && (
          <div className='flex items-center space-x-2 mt-4'>
            <FiAlertCircle size={20} />
            <div className='text-red-500'>{error}</div>
          </div>
        )}
        <div className='relative'>
          <FiMail className='absolute top-3 left-3 text-gray-400' />
          <input className=' p-2 rounded w-full pl-10' type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className='relative mt-4'>
          <FiLock className='absolute top-3 left-3 text-gray-400' />
          <input className=' p-2 rounded w-full pl-10' type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <br />
        <button className=' p-2  bg-violet-600 hover:bg-violet-700 text-white rounded mt-4 w-full flex items-center justify-center'>
          {isLoading ? (
            <div className='flex gap-1 items-center'> <FiLoader className='animate-spin mr-2' /> <span>Loading...</span></div>
          ) : (
            'Login'
          )}
        </button>
        <div className='mt-4 md:text-base text-xs'>
          <div className='flex justify-between'>
            <Link href='forgotPassword'>
              <div className='text-red-800 hover:text-red-600 flex gap-1 items-center'>
                <FiHelpCircle className='' />
                <p> Forget password?</p>
              </div>
            </Link>
            <Link href='signUp'>
              <div className='text-green-800 hover:text-green-600 flex gap-1 items-center'>
                <FiUserPlus className='' />
                <p>Create account</p>
              </div>
            </Link>
          </div>
        </div>
      </form>
    </div>
   </div>

  );
};

export default Login;