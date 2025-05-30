import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Vehicle } from "./Vehicle";

@Entity()
export class VehicleType {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    wheelCount!: number;

    @OneToMany(() => Vehicle, (vehicle) => vehicle.vehicleType)
    vehicles!: Vehicle[];
}
