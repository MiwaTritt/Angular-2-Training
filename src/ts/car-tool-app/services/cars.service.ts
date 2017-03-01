import { Injectable } from "@angular/core";
import { Car } from "../interfaces/car";

@Injectable()
export class Cars {
    private carsData : Car[] = [
        {
            id: 1,
            make: "Toyota", 
            model: "Sienna", 
            year: 2004, 
            color: "light blue", 
            price: 2000,
        },
        {
            id: 2,
            make: "Ford", 
            model: "Mustang", 
            year: 2006, 
            color: "black", 
            price: 10000,
        },
        {
            id: 3,
            make: "Tesla", 
            model: "Model S", 
            year: 2017, 
            color: "silver", 
            price: 68000,
        },
        {
            id: 4,
            make: "Tesla", 
            model: "Model X", 
            year: 2017, 
            color: "black", 
            price: 85000,
        },
        {
            id: 5,
            make: "Nisan", 
            model: "Altima", 
            year: 2000, 
            color: "red", 
            price: 15000,
        },
        {
            id: 6,
            make: "Bugatti", 
            model: "Chiron", 
            year: 2016, 
            color: "blue", 
            price: 1600000,
        },

    ];

    public getAll() {
        return this.carsData;
    }

    public add(car : Car) {
        this.carsData = this.carsData.concat(car);
        console.log(this.carsData);
    }

}