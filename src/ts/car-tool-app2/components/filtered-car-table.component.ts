import { Component, Input, OnInit } from "@angular/core";

import { Car } from "../interfaces/car";

@Component({
    selector: "filtered-car-table",
    template: `
    <form>
        <div>
            <label>Filter:</label>
            <input type="text" name="carMakeFilterInput" [(ngModel)]="carMakeFilter">
        </div>
    </form>
    <car-table [cars]="filteredCars"></car-table>
    `,
})
export class FilteredCarTable {

    @Input()
    public cars: Car[] = [];

    public carMakeFilter: string = "";

    private filterCache: Map<string, Car[]> = new Map<string, Car[]>();

    public lastCars: Car[] = null;

    public get filteredCars () {
        if(this.lastCars == null) {
            this.lastCars = this.cars;
        }

        if(this.lastCars !== this.cars) {
            this.filterCache.clear();
            this.lastCars = this.cars;
        }

        if(!this.filterCache.has(this.carMakeFilter)){
            //actually filter colors and store in map
            //pass callback function in filter
            this.filterCache.set(this.carMakeFilter, 
                this.cars.filter((car) =>  car.make.toUpperCase().startsWith(this.carMakeFilter.toUpperCase()) ));
        }

        return this.filterCache.get(this.carMakeFilter);
    }
}
