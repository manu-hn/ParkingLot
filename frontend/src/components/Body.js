import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Home from './nav/Home';
import About from './nav/About';
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import BookSlot from './booking/BookSlot';
import PayAndPark from './booking/PayAndPark';
import PrivateRoute from './auth/PrivateRoute';

const Body = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/signup' element={<SignUp />} />
          <Route element={<PrivateRoute />}>

            <Route path='/book-slot' element={<BookSlot />} />
            <Route path='/pay-park' element={<PayAndPark />} />
          </Route>
        </Routes>

      </BrowserRouter>

    </div>
  )
}

export default Body