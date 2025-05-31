import "reflect-metadata";
import express from "express";
import cors from 'cors';
import { AppDataSource } from "./data-source";
import vehicleRoutes from "./routes/vehicleRoutes";
import bookingRoutes from "./routes/bookingRoutes";

const app = express();

app.use(express.json());
app.use(cors());

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source Initialized");

        app.use("/api", vehicleRoutes);
        app.use("/api", bookingRoutes);

        app.use("/", () => {
            console.log("hello world")
        })

        app.listen(4000, () => {
            console.log("Server running at http://localhost:4000");
        });
    })
    .catch((error) => {
        console.error("Error during Data Source initialization", error);
    });
