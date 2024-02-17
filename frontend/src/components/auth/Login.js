import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import {loginFailure, loginStart, loginSuccess} from "../../redux/slices/userSlice.js";

const Login = () => {
 
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const dispatch= useDispatch();
  const { loading} = useSelector((store)=>store.user);

  const navigate = useNavigate();
  
  const handleSignupDataChange = (e) => {
    e.preventDefault();

    setLoginData({
      ...loginData, [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart())
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', JSON.stringify(loginData), { headers: { 'Content-type': 'application/json' } });
     
      setMessage(response?.data?.message);
     dispatch(loginSuccess(response?.data?.data))
      setTimeout(() => {
        setMessage('');
        navigate('/book-slot')
      }, 2500)
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.message);
      dispatch(loginFailure(error?.response?.data?.message));

      setTimeout(() => {
        setError('');

      }, 2500)
    }
  }
  return (
    <div className='w-3/4  flex justify-center'>

      <div className="container py-12 lg:py-20  flex justify-center">
        <div className="w-3/4 gap-6 px-4 text-center flex flex-col items-center md:px-6 lg:gap-10 border rounded-lg">
          <div className="my-3">
            <h2 className="text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl">Login.</h2>
            <p className="mx-auto max-w-2xl mt-2 text-gray-500">
              Already have account?<br />
              Enter your credentials and log in  </p>
          </div>

          <div className='w-full flex flex-col items-center justify-center '>


            <form onSubmit={handleSubmit} className=' flex flex-col w-full py-4'>

              <div className='my-2'>
                <input type="email" placeholder='Enter Your Email...' id='email' name='email'
                  value={loginData?.email} onChange={handleSignupDataChange}
                  className='w-full px-4 rounded-lg border bg-white border-gray-300'
                />
              </div>

              <div className='my-2'>
                <input type="password" placeholder='Enter Password...' id='password' name='password'
                  value={loginData?.password} onChange={handleSignupDataChange}
                  className='w-full px-4 rounded-lg border bg-white border-gray-300'
                />
              </div>
              <button disabled={loading} type='submit'
                className='w-full bg-black text-white rounded-md py-1 my-2 
            disabled:opacity-80'>Login</button>
            </form>
            <h5 className='text-green-500'>{message}</h5>
            <h5 className='text-red-500'>{error}</h5>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Login