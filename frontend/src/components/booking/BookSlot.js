import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import useBookSlot from '../utils/useBookSlot';



const BookSlot = () => {
    const { currentUser } = useSelector(store => store.user);
    const navigate = useNavigate();

    const [bookingData, setBookingData] = useState({
        carSize: "Small",
        floorNumber: 1,
        carNumber: "KA01EE1111",
        slotNumber: "",

    });
    const { bookSlotForUser, errMessage } = useBookSlot()

    const handleFormDataChange = (e) => {
        setBookingData({ ...bookingData, [e.target.id]: e.target.value })
    }


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await bookSlotForUser({ ...bookingData, userRef: currentUser?.uid, ownerName: currentUser?.fullName, ownerEmail: currentUser?.email })
            navigate('/pay-park');
        } catch (error) {
            console.log(error)
        }

    }


    return (
        <div className="bg-gray-50/90   ">
            <div className="container py-6 lg:py-10">
                <div className="flex flex-col items-center gap-6 px-4 text-center md:px-6 lg:gap-10">
                    <div className="my-3">
                        <h2 className="text-3xl my-2 font-bold tracking-tighter sm:text-4xl md:text-5xl">Park with Ease</h2>
                        <p className="mx-auto max-w-2xl text-gray-500 text-xs sm:text-sm md:text-lg">
                            Welcome to ParkSync, a cloud-based parking lot management service. Park with ease and convenience in mind.
                            Register, book, and pay for your parking space hassle-free.
                        </p>
                    </div>


                    <div className='w-3/4 bg-white border rounded-md p-8 text-[1vw]'>
                        <h1 className='text-xl sm:text-2xl md:text-3xl font-semibold md:font-bold leading-tight'>
                            Booking Slot
                        </h1>

                        <form onSubmit={handleFormSubmit} >
                            <div className='w-full flex flex-col justify-start'>
                                <label htmlFor="carSize" className='w-full text-left my-2  font-normal  '>Car Size</label>
                                <select onChange={handleFormDataChange} value={bookingData?.carSize} name="" id="carSize" className='w-full py-1 px-4 border border-gray-200 outline-none rounded-md' required>
                                    <option value="Small">Small</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Large">Large</option>
                                    <option value="XLarge">X Large</option>
                                </select>
                            </div>
                            <div className='w-full flex flex-col justify-start'>
                                <label htmlFor="floorNumber" className='w-full text-left my-2'>Floor Number</label>
                                <select onChange={handleFormDataChange} value={bookingData?.floorNumber} name="floorNumber" id="floorNumber" className='w-full py-1 px-4 border  border-gray-200 outline-none rounded-md' required>
                                    <option value="">Select Floor</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>

                                </select>
                            </div>
                            <div className='w-full flex flex-col justify-start'>
                                <label htmlFor="carNumber" className='w-full text-left my-2'>Car Number</label>
                                <input onChange={handleFormDataChange} value={bookingData?.carNumber} type="text" id="carNumber" placeholder='Enter Car Number' name="carNumber" className='w-full py-1 px-4 border  border-gray-200 outline-none rounded-md' required />
                            </div>
                            <div className='w-full flex flex-col justify-start'>
                                <label htmlFor="slotNumber" className='w-full text-left my-2'>Slot Number</label>
                                <input onChange={handleFormDataChange} value={bookingData?.slotNumber} type="text" id="slotNumber" placeholder='Enter Car Number' name="slotNumber" className='w-full py-1 px-4 border  border-gray-200 outline-none rounded-md' />
                            </div>

                            <button className='bg-black text-white py-2 rounded-md my-3 w-2/5'>Book Slot</button>

                        </form>
                        <p className='text-red-500 text-sm'>{errMessage}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookSlot