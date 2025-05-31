import { Router } from "express";
import { AppDataSource } from "../data-source";
import { VehicleType } from "../entity/VehicleType";
import { Vehicle } from "../entity/Vehicle";

const router = Router();

router.get("/vehicle-types", async (req, res): Promise<any> => {

    const wheelCount = parseInt(req.query.wheelCount as string);
    if (![2, 4].includes(wheelCount)) return res.status(400).json({ message: "Invalid wheel count" });

    const types = await AppDataSource.getRepository(VehicleType).find({
        where: { wheelCount },
    });

    res.json(types);
});

router.get("/vehicles", async (req, res) => {
    const typeId = parseInt(req.query.typeId as string);
    const vehicles = await AppDataSource.getRepository(Vehicle).find({
        where: {
            vehicleType: { id: typeId },
        },
    });
    res.json(vehicles);
});

export default router;
