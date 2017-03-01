import { Injectable } from "@angular/core";
import { Car } from "../interfaces/car";

@Injectable()
export class Cars2 {
    private carsData : { id: number, make: string, model: string, year: number, color: string, price: number }[] = [
        {
            id: 1,
            make: "Toyota", 
            model: "Camry", 
            year: 2015, 
            color: "silver", 
            price: 25000,
        },

    ];

    public getAll() {
        return this.carsData;
    }

}