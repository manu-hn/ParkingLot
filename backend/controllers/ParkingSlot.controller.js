import ParkingSlotModel from "../models/ParkingSlot.model.js";
import { randomSlotNumberGenerator, randomFloorNumber } from "../utils/numberAlotmentHelper.js";
import { config } from "dotenv";
config()

export const getParkingSlots = async (req, res, next) => {
    try {
        const { floorNumber, carSize } = req.body;


        const isSlotAvailable = await ParkingSlotModel.find({ floorNumber, carSize });

        let bookedSlots;
        if (isSlotAvailable.length > 0) {
            bookedSlots = isSlotAvailable.map((slot) => {
                return slot.slotNumber;
            });
        } else {
            return res.status(400).json({ error: true, message: 'No available parking slots' })
        }

        return res.status(200).json({
            error: false, message: 'Success', slotsInfo: {
                floorNumber: isSlotAvailable[0].floorNumber,
                bookedSlotNumber: bookedSlots
            }
        })
    } catch (error) {
        next(error);
    }
}


async function slotBookingHelper(slotNumber = randomSlotNumberGenerator(),
    floorNumber = randomFloorNumber(), userRef, carSize, carNumber, occupiedBay, price, ownerName, ownerEmail) {
    try {

        const bookedSlot = await ParkingSlotModel.create({
            userRef, carSize, carNumber,
            occupiedBay, isSlotBooked: true, floorNumber, slotNumber: floorNumber + " : " + slotNumber, price, ownerName, ownerEmail
        });
        return bookedSlot;
    } catch (error) {
        console.log(error)
    }
}


async function slotBookerForAll(carSize, slotNumber, floorNumber, userRef, carNumber, occupiedBay, price, ownerName, ownerEmail) {
    try {
        const isSlotBookedAlready = await ParkingSlotModel.findOne({ carSize, slotNumber: floorNumber + " : " + slotNumber, floorNumber, });

        if (!isSlotBookedAlready) {
            const bookedSlot = await slotBookingHelper(slotNumber, floorNumber, userRef, carSize, carNumber, occupiedBay, price, ownerName, ownerEmail);
            return {
                statusCode: 200,
                jsonMsg: { error: false, message: 'Success', data: bookedSlot }
            }
        } else {
            return {
                statusCode: 400,
                jsonMsg: {
                    error: false, message: 'Slot Already Booked'
                }
            }
        }
    } catch (error) {
        return error
    }
}

export const bookParkingSlot = async (req, res, next) => {
    try {
        
        let { userRef, carSize, carNumber, floorNumber, slotNumber, ownerName, ownerEmail } = req.body;
        const price = carSize === 'Small' ? 100 : (carSize === 'Medium' ? 200 : (carSize === 'Large' ? 300 : (carSize === 'XLarge' && 500)))

        const isSmallSlotAvailable = await ParkingSlotModel.find({ floorNumber, occupiedBay: 'Small Bay' });
        const isMediumSlotAvailable = await ParkingSlotModel.find({ floorNumber, occupiedBay: 'Medium Bay' });
        const isLargeSlotAvailable = await ParkingSlotModel.find({ floorNumber, occupiedBay: 'Large Bay' });
        const isXLargeSlotAvailable = await ParkingSlotModel.find({ floorNumber, occupiedBay: 'XLarge Bay' });

        if (isXLargeSlotAvailable.length >= process.env.MAX_SLOT) {
            return res.status(400).json({ error: true, message: `Slots Are full Please select another Floor` })
        }

        if (isLargeSlotAvailable.length >= process.env.MAX_SLOT && (carSize === 'Small' || carSize === 'Medium' || carSize === 'Large')) {

            const response = await slotBookerForAll(carSize, slotNumber, floorNumber, userRef, carNumber, "XLarge Bay", price, ownerName, ownerEmail)
            return res.status(response?.statusCode).json(response.jsonMsg)
        }

        if (isMediumSlotAvailable.length >= process.env.MAX_SLOT && (carSize === 'Small' || carSize === 'Medium')) {

            const response = await slotBookerForAll(carSize, slotNumber, floorNumber, userRef, carNumber, "Large Bay", price,ownerName, ownerEmail)
            return res.status(response?.statusCode).json(response.jsonMsg)
        }

        if (isSmallSlotAvailable.length >= process.env.MAX_SLOT && carSize === 'Small') {
            const response = await slotBookerForAll(carSize, slotNumber, floorNumber, userRef, carNumber, "Medium Bay",price, ownerName, ownerEmail)
            return res.status(response?.statusCode).json(response.jsonMsg)
        }


        if (isSmallSlotAvailable.length < process.env.MAX_SLOT || isMediumSlotAvailable.length < 5 || isLargeSlotAvailable.length < 5 || isXLargeSlotAvailable.length < 5) {
            const isSlotAvailable = await ParkingSlotModel.findOne({ slotNumber: floorNumber + " : " + slotNumber, carSize, floorNumber, occupiedBay: carSize + " Bay" });

            if (!slotNumber) {

                slotNumber = randomSlotNumberGenerator();
            }
            if (!floorNumber) {
                floorNumber = randomFloorNumber();
            }

            if (!isSlotAvailable) {
                const bookedSlot = await slotBookingHelper(slotNumber, floorNumber, userRef, carSize, carNumber, carSize + " Bay", price, ownerName, ownerEmail);
                return res.status(200).json({
                    error: false, message: 'Success', data: bookedSlot
                });
            } else {
                return res.status(404).json({ error: false, message: 'Slot Already Booked' });
            }

        }


    } catch (error) {
        next(error);
    }
};

