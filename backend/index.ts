import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./data-source";
import vehicleRoutes from "./routes/vehicleRoutes";
import bookingRoutes from "./routes/bookingRoutes";

const app = express();

app.use(express.json());

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source Initialized");

        app.use("/api", vehicleRoutes);
        app.use("/api", bookingRoutes);

        app.listen(3000, () => {
            console.log("Server running at http://localhost:3000");
        });
    })
    .catch((error) => {
        console.error("Error during Data Source initialization", error);
    });
