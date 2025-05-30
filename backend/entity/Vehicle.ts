import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { VehicleType } from "./VehicleType";

@Entity()
export class Vehicle {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    modelName!: string;

    @ManyToOne(() => VehicleType, (type) => type.vehicles, { eager: true })
    vehicleType!: VehicleType;
}
