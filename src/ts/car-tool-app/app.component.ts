import { Component } from "@angular/core";
import { Cars } from "./services/cars.service";
import { Car } from "./interfaces/car";

@Component({
    selector: "main",
    template: `
    <div>
        <h1>{{header | myUppercase}}</h1>
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
                <label for="new-car-id-input">ID</label>
                <input type="text" [(ngModel)]="newCar.id" id="new-car-id-input" name="newCarIdInput">
            </div>
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
    </div>
    `,
})
export class AppComponent { 
    public header: string = "car tool is cool by mckar";
    public message: string;
    public messageLength: number = 0;

    public newCar = {
            id: 0,
            make: "", 
            model: "", 
            year: 0, 
            color: "", 
            price: 0,
    };

    constructor(private carsService: Cars){ };

    public carMakeFilter: string = "";
    public oldCarMakeFilter: string = "";

    public pageLength: number = 2;
    public pageIndex: number = 0;
    public totalPages: number = Math.ceil(this.carsService.getAll().length / this.pageLength);

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

    public lastCars: any[];
    private internalSortedCars: Car[];

    private filterCache: Map<string, Car[]> = new Map<string, Car[]>();

    public get filteredCars(): Car[] {
        //see if key value pair for that color exists in map
        if(!this.filterCache.has(this.carMakeFilter)){
            //actually filter colors and store in map
            //pass callback function in filter
            this.filterCache.set(this.carMakeFilter, 
                this.carsService.getAll().filter((car) =>  car.make.toUpperCase().startsWith(this.carMakeFilter.toUpperCase())));
        }
        this.totalPages = Math.ceil(this.filterCache.get(this.carMakeFilter).length / this.pageLength);
        if( this.carMakeFilter !== this.oldCarMakeFilter){
            this.pageIndex = 0;
        }
        this.oldCarMakeFilter = this.carMakeFilter; 
        return this.filterCache.get(this.carMakeFilter);
    }

    public get sortedCars () {
        //if you only mutate array this will not be true, need to update reference
        if(this.lastCars !== this.carsService.getAll()) {
            this.lastCars = this.carsService.getAll();
            //concat returns reference to new object array on heap
            //non destructive sort
            this.internalSortedCars = this.carsService.getAll().concat().sort((a , b) => a.year-b.year); 
        }
        return this.internalSortedCars;
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
        this.filterCache.clear();
        this.totalPages = Math.ceil(this.carsService.getAll().length / this.pageLength);
    }
}
//traditional name for root Component is AppComponent