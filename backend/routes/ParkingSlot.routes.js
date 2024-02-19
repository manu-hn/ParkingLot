import { Router } from "express";
import { bookParkingSlot, getParkingSlots } from "../controllers/ParkingSlot.controller.js";


const router= Router();

router.post('/get-slots', getParkingSlots);
router.post('/book-slot', bookParkingSlot);

export default router;