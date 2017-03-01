import { Component } from "@angular/core";
import { Cars } from "./services/cars.service";
import { Car } from "./interfaces/car";

@Component({
    selector: "main",
    template: `
    <tool-header header=""></tool-header>
    <form>
        <div>
            <label>Message:</label>
            <input type="text" name="messageInput" [(ngModel)]="message">
        </div>
        <div>
            <label>Message Length:</label>
            <input type="text" name="messageLength" [(ngModel)]="messageLength">
        </div>
        {{message | myEllipsis:messageLength}}
    </form>
    <form>
        <div>
            <label>Filter:</label>
            <input type="text" name="carMakeFilterInput" [(ngModel)]="carMakeFilter">
        </div>
    </form>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Make</th>
                <th>Model</th> 
                <th>Year</th>
                <th>Color</th>
                <th>Price</th>
            </tr>
        </thead>
        <tbody>
            <tr *ngFor="let car of filteredCars | slice:startIndex:endIndex">
                <td>{{car.id}}</td>
                <td>{{car.make}}</td>
                <td>{{car.model}}</td> 
                <td>{{car.year}}</td>
                <td>{{car.color}}</td>
                <td>{{car.price}}</td>
            </tr>
        </tbody>
    </table>
    <form>
        <div>
            <label for="new-car-make-input">Make</label>
            <input type="text" [(ngModel)]="newCar.make" id="new-car-make-input" name="newCarMakeInput">
        </div>
        <div>     
            <label for="new-car-model-input">Model</label>
            <input type="text" [(ngModel)]="newCar.model" id="new-car-model-input" name="newCarModelInput">
        </div>    
        <div>
            <label for="new-car-year-input">Year</label>
            <input type="text" [(ngModel)]="newCar.year" id="new-car-year-input" name="newCarYearInput">
        </div>
        <div>     
            <label for="new-car-color-input">Color</label>
            <input type="text" [(ngModel)]="newCar.color" id="new-car-color-input" name="newCarColorInput">
        </div>
        <div>     
            <label for="new-car-price-input">Price</label>
            <input type="text" [(ngModel)]="newCar.price" id="new-car-price-input" name="newCarPriceInput">
        </div>
        <div>
            <button type="button" (click)="addCar()">
                Save
            </button>
        </div>
    </form>
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
    public toolHeader: string = "car tool is cool by mckar";
    public message: string;
    public messageLength: number = 0;

    public newCar : Car = {
            id: 0,
            make: "", 
            model: "", 
            year: 0, 
            color: "", 
            price: 0,
    };

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

    public addCar() {
        this.carsService.add(this.newCar);
        this.newCar = {
            id: 0,
            make: "", 
            model: "", 
            year: 0, 
            color: "", 
            price: 0,
        };
        this.totalPages = Math.ceil(this.cars.length / this.pageLength);
    }
}
//traditional name for root Component is AppComponent