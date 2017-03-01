import { Injectable } from "@angular/core";
import { Car } from "../interfaces/car";

@Injectable()
export class Cars {

    private lastCarId: number = 6;
    private updateFns: Function[] = [];

    private carsData : Car[] = [
        { id: 1, make: "Toyota", model: "Sienna", year: 2004, color: "light blue", price: 2000 },
        { id: 2, make: "Ford", model: "Mustang", year: 2006, color: "black", price: 10000 },
        { id: 3, make: "Tesla", model: "Model S", year: 2017, color: "silver", price: 68000 },
        { id: 1, make: "Tesla", model: "Model X", year: 2004, color: "light blue", price: 2000 },

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

    private internalSortedCars: Car[];
    private lastCars: Car[];

    private filterCache: Map<string, Car[]> = new Map<string, Car[]>();
    public oldCarMakeFilter: string = "";

    public sortCarsByYear (cars: Car[]) {
        //if you only mutate array this will not be true, need to update reference
        if(this.lastCars !== cars) {
            this.lastCars = cars;
            //concat returns reference to new object array on heap
            //non destructive sort
            this.internalSortedCars = cars.concat().sort((a , b) => a.year-b.year); 
        }
        return this.internalSortedCars;
    }

    public filteredCars(carMakeFilter : string): Car[] {
        //see if key value pair for that color exists in map
        if(!this.filterCache.has(carMakeFilter)){
            //actually filter colors and store in map
            //pass callback function in filter
            this.filterCache.set(carMakeFilter, 
                this.sortCarsByYear(this.carsData.filter((car) =>  car.make.toUpperCase().startsWith(carMakeFilter.toUpperCase()))));
        }
        return this.filterCache.get(carMakeFilter);
    }

    public add(car : Car) {
        car.id = ++this.lastCarId;
        this.carsData = this.carsData.concat(car);
        this.filterCache.clear();
        this.notifyUpdate();
    }

    public updated(fn: Function) {
        //registering callback function
        this.updateFns.push(fn);
    }

    //cars service can be updated and notify all UIs
    public notifyUpdate() {
        this.updateFns.forEach((updateFn) => {
            updateFn();
        });
    }


}