import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Login from './Login';

const SignUp = () => {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
  });
  const navigate = useNavigate();
  console.log(signupData)
  const handleSignupDataChange = (e) => {
    e.preventDefault();

    setSignupData({
      ...signupData, [e.target.id]: e.target.value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/users/signup', JSON.stringify(signupData), { headers: { 'Content-type': 'application/json' } });
      console.log(response?.data);
      setMessage(response?.data?.message);
      setLoading(false);
      setTimeout(() => {
        setMessage('');
      
      }, 2500)
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.message);
      setLoading(false);

      setTimeout(() => {
        setError('');

      }, 2500)
    }
  }
  return (
    <div className='w-full flex items-center'>

      <div className="container py-12 lg:py-20 flex justify-center ">
        <div className=" gap-6 px-4 text-center md:px-6 lg:gap-10 border rounded-lg">
          <div className="my-5">
            <h2 className="text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl"> Register</h2>
            <p className="mx-auto max-w-2xl text-gray-500">
              Create your account to access our parking services. It's quick and easy!
            </p>
          </div>

          <div className='w-full flex flex-col items-center justify-center '>


            <form onSubmit={handleSubmit} className=' flex flex-col w-9/12 py-4'>
              <div className='my-2'>
                <input type="text" placeholder='Enter Your Name...' id='fullName' name='fullName'
                  value={signupData.fullName} onChange={handleSignupDataChange}
                  className='w-full px-4 rounded-lg border bg-white border-gray-300'
                />
              </div>
              <div className='my-2'>
                <input type="email" placeholder='Enter Your Email...' id='email' name='email'
                  value={signupData.email} onChange={handleSignupDataChange}
                  className='w-full px-4 rounded-lg border bg-white border-gray-300'
                />
              </div>
              <div className='my-2'>
                <input type="text" placeholder='Enter Mobile Number...' id='mobile' name='mobile'
                  value={signupData.mobile} onChange={handleSignupDataChange}
                  className='w-full px-4 rounded-lg border bg-white border-gray-300'
                />
              </div>
              <div className='my-2'>
                <input type="text" placeholder='Enter Password...' id='password' name='password'
                  value={signupData.password} onChange={handleSignupDataChange}
                  className='w-full px-4 rounded-lg border bg-white border-gray-300'
                />
              </div>
              <button disabled={loading} type='submit'
                className='w-full bg-black text-white rounded-md py-1 my-2 
              disabled:opacity-80'>SignUp</button>
            </form>
            <h5 className='text-green-500'>{message}</h5>
            <h5 className='text-red-500'>{error}</h5>
          </div>

        </div>
      </div>

      <Login />

    </div>
  )
}

export default SignUp