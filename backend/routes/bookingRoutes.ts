import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Booking } from "../entity/Booking";
import { Between } from "typeorm";

const router = Router();

router.post("/book", async (req, res): Promise<any> => {
    try {
        const { firstName, lastName, vehicleId, startDate, endDate } = req.body;

        if (!firstName || !lastName || !vehicleId || !startDate || !endDate) {
            return res.status(400).json({ message: "Missing fields" });
        }

        const bookingRepo = AppDataSource.getRepository(Booking);

        // Check overlapping bookings for this vehicle
        const conflict = await bookingRepo.findOne({
            where: [
                {
                    vehicle: { id: vehicleId },
                    startDate: Between(startDate, endDate),
                },
                {
                    vehicle: { id: vehicleId },
                    endDate: Between(startDate, endDate),
                },
            ],
            relations: ["vehicle"],
        });

        if (conflict) {
            return res.status(409).json({ message: "Vehicle already booked for the selected dates" });
        }

        const vehicleRepo = AppDataSource.getRepository("Vehicle");
        const vehicle = await vehicleRepo.findOneBy({ id: vehicleId });
        if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });

        const booking = bookingRepo.create({
            firstName,
            lastName,
            vehicle,
            startDate,
            endDate,
        });

        await bookingRepo.save(booking);

        res.status(201).json({ message: "Booking confirmed", booking });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
