import { Component } from "@angular/core";

@Component({
    selector: "main",
    template: `
    <div>
        <h1>{{header}}</h1>
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
    public header: string = "Car Tool";

    public newCar = {
            id: 0,
            make: "", 
            model: "", 
            year: 0, 
            color: "", 
            price: 0,
    };

    public carMakeFilter: string = "";

    public cars: { id: number, make: string, model: string, year: number, color: string, price: number }[] = [
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

    public carsShown: Object[] = [];

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

    public lastCars: any[];
    private internalSortedCars: any[];

    // public compare(a : any, b : any) {
    //     return a.year - b.year;
    // }

    private filterCache: Map<string, Object[]> = new Map<string, Object[]>();

    public get filteredCars(): Object[] {
        //see if key value pair for that color exists in map
        if(!this.filterCache.has(this.carMakeFilter)){
            //actually filter colors and store in map
            //pass callback function in filter
            this.filterCache.set(this.carMakeFilter, 
                this.cars.filter((car) =>  car.make.toUpperCase().startsWith(this.carMakeFilter.toUpperCase())));
        }
        this.totalPages = Math.ceil(this.filterCache.get(this.carMakeFilter).length / this.pageLength);
        //this.pageIndex = 0;
        //console.log(this.pageIndex);
        return this.filterCache.get(this.carMakeFilter);
    }

    public get sortedCars () {
        //if you only mutate array this will not be true, need to update reference
        if(this.lastCars !== this.cars) {
            this.lastCars = this.cars;
            //concat returns reference to new object array on heap
            //non destructive sort
            this.internalSortedCars = this.cars.concat().sort((a , b) => a.year-b.year); 
        }
        //console.log("called get sorted colors");
        return this.internalSortedCars;
    }

    public addCar() {
        this.cars = this.cars.concat(this.newCar);
        console.log(this.cars);
        this.newCar = {
            id: 0,
            make: "", 
            model: "", 
            year: 0, 
            color: "", 
            price: 0,
        };
        this.filterCache.clear();
        this.totalPages = Math.ceil(this.cars.length / this.pageLength);
    }
}
//traditional name for root Component is AppComponent