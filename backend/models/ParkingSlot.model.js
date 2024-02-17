import { Schema, model } from "mongoose";


const ParkingSlotSchema = new Schema({
  userRef: { type: String, required: true },
  carSize: { type: String, enum: ['Small', 'Medium', 'Large', 'XLarge'], required: true },
  isSlotBooked: {
    type: Boolean, required: true, default: false
  },
  occupiedBay: { type: String, required: true, enum: ['Small Bay', 'Medium Bay', 'Large Bay', 'XLarge Bay'], },
  carNumber: { type: String, required: true },
  floorNumber: { type: Number, required: true, min: 1, max: 3 },
  slotNumber: { type: String, required: true, },
  price: { type: Number, required: true },
  ownerName: { type: String, required: true },
  ownerEmail: { type: String, required: true }
});


const ParkingSlotModel = model('parkingslot', ParkingSlotSchema);

export default ParkingSlotModel