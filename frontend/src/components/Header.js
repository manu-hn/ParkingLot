import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/slices/userSlice';

const Header = () => {
  const { isAuthenticated } = useSelector(store => store.user);
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const logoutHandler = (e) => {
    e.preventDefault();
    try {
      dispatch(logoutUser())
      localStorage.removeItem('persist:root');
      setTimeout(() => {
        navigate('/')
      }, 1000)

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='flex justify-between p-5 items-center shadow-md bg-slate-300'>
      <div>
        <h1 className='text-xl font-bold sm:text-2xl md:text-2xl lg:text-3xl'><Link to={'/'}>
          Park<span className='text-orange-500 text-xl md:text-3xl lg:text-4xl'>Sync</span></Link></h1>
      </div>
      <div className='w-3/12 '>
        <ul className='flex gap-3 justify-evenly'>
          <li className='text-xs sm:text-md md:text-lg'><Link to={'/about'}>About</Link></li>
          {
            isAuthenticated ? <button className='text-xs sm:text-md md:text-lg cursor-pointer' onClick={logoutHandler}>Logout</button>
              :
              <li className='text-xs sm:text-md md:text-lg'><Link to={'/signup'}>Login</Link></li>

          }

        </ul>
      </div>
    </div>
  )
}

export default Header