import { Component } from "@angular/core";
import { Cars } from "./services/cars.service";
import { Car } from "./interfaces/car";

@Component({
    selector: "main",
    template: `
    <tool-header [obj]="someObject" [header]="toolHeader"></tool-header>
    <form>
        <div>
            <label>Filter:</label>
            <input type="text" name="carMakeFilterInput" [(ngModel)]="carMakeFilter">
        </div>
    </form>
    <car-table [filteredCars]="filteredCars | slice:startIndex:endIndex"></car-table>
    <car-form (carSubmitted)="addCar($event)"></car-form>
    <div>
        <button *ngIf="pageIndex > 0" type="button" (click)="prevPage()">
            Prev
        </button>
            {{pageIndex+1}} of {{totalPages}}
        <button *ngIf="pageIndex+1 < totalPages" type="button" (click)="nextPage()">
            Next
        </button>
    </div>

    `,
})
export class AppComponent { 
    public toolHeader: string = "Car Tool";
    public message: string;
    public messageLength: number = 0;

    public someObject = { name: "blob", size: "huge"};

    public cars : Car[] = [];

    constructor(private carsService: Cars){ 
        //all subsequent load will execute callback function to update cars
        this.carsService.updated(() => {
            this.cars = carsService.getAll();
        });
        this.cars = carsService.getAll();
    };

    public pageLength: number = 2;
    public pageIndex: number = 0;
    public totalPages: number = Math.ceil(this.cars.length / this.pageLength);

    public nextPage() {
        this.pageIndex++;
    }

    public prevPage() {
        this.pageIndex--;
    }

    public get startIndex () {
        return this.pageIndex * this.pageLength;
    }

    public get endIndex () {
        return (this.pageIndex * this.pageLength) + this.pageLength;
    }

    private internalSortedCars: Car[];
    private returnedFilteredCars: Car[];

    public carMakeFilter: string = "";
    public oldCarMakeFilter: string = "";

    public get filteredCars () {
        this.returnedFilteredCars = this.carsService.filteredCars(this.carMakeFilter);
        this.totalPages = Math.ceil(this.returnedFilteredCars.length / this.pageLength);
        if( this.carMakeFilter !== this.oldCarMakeFilter){
            this.pageIndex = 0;
        }
        this.oldCarMakeFilter = this.carMakeFilter; 
        return this.returnedFilteredCars;
    }

    public addCar(newCar: Car) {
        this.carsService.add(newCar);
        this.totalPages = Math.ceil(this.cars.length / this.pageLength);
    }
}
//traditional name for root Component is AppComponent