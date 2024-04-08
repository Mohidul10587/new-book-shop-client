import url from '@/components/url';
import { useState } from 'react';
import { FiLock, FiMail } from 'react-icons/fi';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [message, setMessage] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${url}/reset-password/${email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword }),
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (err) {
      console.error(err);
      setMessage('Failed to reset password');
    }
  };

  return (


    <div className='min-h-screen pt-24'>
      <div className='flex justify-center px-2'>
        <form className='border border-gray-400 bg-violet-400 rounded md:w-1/2 p-10' onSubmit={handleResetPassword}>
     <div className=''>
     <span className='text-violet-900'>Email</span>
     <div className='relative'>
            <FiMail className='absolute top-3 left-3 text-gray-400' />
            <input
              placeholder='Email'
              className=' p-2 rounded w-full pl-10'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)} required />
          </div>
     </div>
          <div className='mt-4'>
            <span className='text-violet-900'>New Password</span>
            <div className='relative'>
              <FiLock className='absolute top-3 left-3 text-gray-400' />
              <input
                placeholder='Password'
                className=' p-2 rounded w-full pl-10'
                type='password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)} required />
            </div>

          </div>

          <button className=' p-2  bg-violet-600 hover:bg-violet-700 text-white rounded mt-4 w-full flex items-center justify-center' type="submit">Reset Password</button>
        </form>
      </div>
    </div>

  );
};

export default ForgotPassword;

{/* <div className='min-h-screen pt-24'>
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
</div>  */}