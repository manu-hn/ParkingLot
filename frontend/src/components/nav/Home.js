import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = () => {
  const { isAuthenticated } = useSelector(store => store.user)
  return (
    <div className="bg-gray-50/90  h-screen ">
      <div className="container py-12 lg:py-20">
        <div className="flex flex-col items-center gap-6 px-4 text-center md:px-6 lg:gap-10">
          <div className="my-5">
            <h2 className="text-3xl my-2 font-bold tracking-tighter sm:text-4xl md:text-5xl">Park with Ease</h2>
            <p className="mx-auto max-w-2xl text-gray-500 text-xs sm:text-sm md:text-lg">
              Welcome to ParkSync, a cloud-based parking lot management service. Park with ease and convenience in mind.
              Register, book, and pay for your parking space hassle-free.
            </p>
          </div>
          <div className="mx-auto flex  max-w-sm gap-4 lg:max-w-none ">
            {
              !isAuthenticated && <div className="flex flex-col items-center justify-center group">
                <Link to={'signup'}>
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border  group-hover:text-orange-600  border-gray-200 bg-white shadow-sm ">
                    1
                  </span>
                  <span className="text-xs block sm:hidden  text-gray-500 group-hover:underline group-hover:text-orange-600">Register</span>
                  <span className="text-sm text-gray-500 hidden sm:block group-hover:underline group-hover:text-orange-600">Create an account</span>
                </Link>
              </div>
            }
            <div className="flex flex-col items-center justify-center group">
              <Link to={'/book-slot'}>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-gray-200  bg-white shadow-sm group-hover:text-orange-600 ">
                  {isAuthenticated ? "1" : "2"}
                </span>
                <span className="text-xs block sm:hidden group-hover:underline group-hover:text-orange-600 text-gray-500 ">Book</span>
                <span className="text-sm text-gray-500 hidden sm:block group-hover:underline group-hover:text-orange-600">Reserve your space</span>
              </Link>
            </div>
            <div className="flex flex-col items-center justify-center group">
              <Link to={'/pay-park'}>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border  border-gray-200 bg-white shadow-sm group-hover:text-orange-600">
                  {isAuthenticated ? "2" : "3"}
                </span>
                <span className="text-xs block sm:hidden  text-gray-500 group-hover:underline group-hover:text-orange-600">Park</span>
                <span className="text-sm text-gray-500 hidden sm:block group-hover:underline group-hover:text-orange-600">Pay and park</span>

              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;

