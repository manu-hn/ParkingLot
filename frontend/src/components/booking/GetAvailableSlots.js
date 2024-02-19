import axios from 'axios';
import React, { useEffect, useState } from 'react';


const GetAvailableSlots = () => {
    const [slotsInfo, setSlotsInfo] = useState(null);
    const [message, setMessage] = useState('');
    const [getSlots, setGetSlots] = useState({
        occupiedBay: "Small Bay",
        floorNumber: 1,
    });

    const handleFormDataChange = (e) => {
        setGetSlots({ ...getSlots, [e.target.id]: e.target.value });
    }

    const fetchSlotsDetails = async () => {
        try {

            const response = await axios.post(`http://localhost:5000/api/parking/get-slots`, JSON.stringify(getSlots), {
                headers: { 'Content-Type': 'application/json' }
            });
           
            setSlotsInfo(response?.data?.slotsInfo)
        } catch (error) {
            setMessage(error?.response?.data?.message)
            
        }
    }
    useEffect(() => {
        fetchSlotsDetails();
    }, [getSlots.occupiedBay, getSlots.floorNumber]);


    return (
        <div className='bg-white flex flex-col py-4'>


            <div className='w-2/4 mx-auto'>
                <div className=' w-full'>
                    <form className=' w-full'>
                        <div className='flex  justify-between my-4 '>
                            <label htmlFor="floorNumber">Floor Number</label>
                            <input onChange={handleFormDataChange} value={getSlots?.floorNumber}
                                type="number" name="floorNumber" id="floorNumber"
                                className='w-2/4 px-4 py-2 placeholder:text-lg outline-none border rounded-md border-gray-200' />
                        </div>
                        <div className='flex justify-between my-4'>
                            <label htmlFor="occupiedBay" className=' text-left  font-normal  '>Car Size</label>
                            <select onChange={handleFormDataChange} value={getSlots?.occupiedBay} name="" id="occupiedBay" className='w-2/4 py-2 border border-gray-200 outline-none rounded-md' >
                                <option value="Small Bay">Small</option>
                                <option value="Medium Bay">Medium</option>
                                <option value="Large Bay">Large</option>
                                <option value="XLarge Bay">X Large</option>
                            </select>
                        </div>
                       
                    </form>
                </div>
                <div className='w-full border rounded-lg my-4'>
                    <h1 className='text-2xl font-semibold my-3'>Available Slots</h1>
                    <p>{message}</p>
                    <div>
                        <table className='w-2/4  mx-auto'>

                            <tbody className=' w-full  '>
                                <tr>
                                    <td className='text-left'>Bay Size</td>
                                    <td className='text-right'>{slotsInfo?.baySize}</td>
                                </tr>
                                <tr>
                                    <td className='text-left'>Total of Slots in Each Bay</td>
                                    <td className='text-right'>{slotsInfo?.availableSlots}</td>
                                </tr>
                                <tr>
                                    <td className='text-left'>Floor Number</td>
                                    <td className='text-right'>{slotsInfo?.floorNumber}</td>
                                </tr>
                                <tr>
                                    <td className='text-left'>No of Slots Available</td>
                                    <td className='text-right'>{slotsInfo?.numberOfSlotsFree}</td>
                                </tr>
                            </tbody>
                        </table>


                    </div>
                </div>
            </div>
            

        </div>
    )
}

export default GetAvailableSlots