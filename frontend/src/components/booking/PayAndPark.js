import React from 'react';
import { useSelector } from "react-redux";
import { usePDF } from 'react-to-pdf';


const PayAndPark = () => {
  const { bookedSlotTicket } = useSelector(store => store.ticket);
  const { toPDF, targetRef } = usePDF({ filename: `Parking Ticket ${new Date().getTime()}_${bookedSlotTicket?.carNumber}` });
  
  return (
    <div className='w-full flex flex-col my-5 h-screen'>

      <div className='w-full flex flex-col items-center'>
        <div className='w-full flex flex-col items-center p-4' ref={targetRef}>
          <h1 className='text-3xl'>Ticket Details!</h1>
          <div className=''>
            <div className='w-[20em] '>
              <div className='flex w-full justify-between'>
                <span className='font-semibold'>Name :  </span> <span>  {bookedSlotTicket?.ownerName}</span>
              </div>

              <div className='flex w-full justify-between'> <span className='font-semibold'>Email :</span> <span>  {bookedSlotTicket?.ownerEmail}</span></div>
              <div className='flex w-full justify-between'><span className='font-semibold'>Car Number : </span><span>  {bookedSlotTicket?.carNumber}</span></div>
              <div className='flex w-full justify-between'><span className='font-semibold'>Car Size : </span> <span>  {bookedSlotTicket?.carSize}</span></div>
              <div className='flex w-full justify-between'><span className='font-semibold'>Allotted Bay : </span> <span>  {bookedSlotTicket?.occupiedBay}</span></div>
              <div className='flex w-full justify-between'><span className='font-semibold'>Floor Number : </span><span>  {bookedSlotTicket?.floorNumber}</span></div>
              <div className='flex w-full justify-between'><span className='font-semibold'>Slot Number : </span><span>  {bookedSlotTicket?.slotNumber}</span></div>
              <div className='flex w-full justify-between'><span className='font-semibold'>Price : </span><span>  {bookedSlotTicket?.price}</span></div>
            </div>
          </div>
        </div>

        <button onClick={() => toPDF()} className='bg-black text-white py-2 w-24 rounded-md my-4'>Print</button>
      </div>
    </div>
  )
}

export default PayAndPark