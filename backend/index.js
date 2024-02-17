import express from 'express';
import { config } from 'dotenv';
import "./connection/Database.connection.js";
import UserRoutes from "./routes/User.routes.js";
import ParkingSlotRoutes from "./routes/ParkingSlot.routes.js";
import cors from "cors";


config();
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/users', UserRoutes);
app.use('/api/parking', ParkingSlotRoutes);

app.use("*", (req, res, next) => {
    res.status(404).json({ error: true, message: "Error Page Not Found" })
})

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})