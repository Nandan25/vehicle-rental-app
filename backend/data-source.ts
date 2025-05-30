import { DataSource } from "typeorm";
import { VehicleType } from "./entity/VehicleType";
import { Vehicle } from "./entity/Vehicle";
import { Booking } from "./entity/Booking";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "vehicle_rental",
    synchronize: true,
    logging: false,
    entities: [VehicleType, Vehicle, Booking],
});
