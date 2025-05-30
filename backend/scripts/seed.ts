import "reflect-metadata";
import { AppDataSource } from "../data-source";
import { VehicleType } from "../entity/VehicleType";
import { Vehicle } from "../entity/Vehicle";

const seed = async () => {
    await AppDataSource.initialize();
    console.log("Database initialized");

    const vehicleTypeRepo = AppDataSource.getRepository(VehicleType);
    const vehicleRepo = AppDataSource.getRepository(Vehicle);

    // Clear existing data (optional)
    // await vehicleRepo.delete({});
    // await vehicleTypeRepo.delete({});

    // Add vehicle types
    const hatchback = vehicleTypeRepo.create({ name: "Hatchback", wheelCount: 4 });
    const suv = vehicleTypeRepo.create({ name: "SUV", wheelCount: 4 });
    const sedan = vehicleTypeRepo.create({ name: "Sedan", wheelCount: 4 });
    const cruiser = vehicleTypeRepo.create({ name: "Cruiser", wheelCount: 2 });

    await vehicleTypeRepo.save([hatchback, suv, sedan, cruiser]);

    // Add vehicles
    const vehicles = vehicleRepo.create([
        { modelName: "Swift", vehicleType: hatchback },
        { modelName: "Creta", vehicleType: suv },
        { modelName: "Honda City", vehicleType: sedan },
        { modelName: "Royal Enfield", vehicleType: cruiser },
    ]);

    await vehicleRepo.save(vehicles);

    console.log("Seeding completed!");
    process.exit(0);
};

seed().catch((err) => {
    console.error("Seed error:", err);
    process.exit(1);
});
