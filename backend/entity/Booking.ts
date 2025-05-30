import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Vehicle } from "./Vehicle";

@Entity()
export class Booking {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @ManyToOne(() => Vehicle, { eager: true })
    vehicle!: Vehicle;

    @Column({ type: "date" })
    startDate!: string;

    @Column({ type: "date" })
    endDate!: string;
}
