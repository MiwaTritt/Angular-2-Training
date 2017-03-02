import { Component } from "@angular/core";
import { Http } from "@angular/http";

import { Car } from "./interfaces/car";
import { Cars } from "./services/cars.service";


@Component({
    selector: "main",
    template: `
        <tool-header [header]="toolHeader"></tool-header>
        <paginated-car-table
            [initialPage]="0" [pageLength]="3" 
            [cars]="cars"></paginated-car-table>
        <filtered-car-table
            [cars]="cars"></filtered-car-table>
        <car-form (carSubmitted)="addCar($event)"></car-form>
    `,
    providers: [ Cars ],
})
export class AppComponent {

    public toolHeader: string = "Car Tool!!";
    public cars: Car[] = [];
    public newCar: Car = {} as Car;


    public currentPage: number = 0;
    public pageLength: number = 10;

    public get startIndex() {
        return this.currentPage * this.pageLength;
    }

    public get endIndex() {
        return this.startIndex + this.pageLength;
    }

    constructor(private carsSvc: Cars, private http : Http) {

        this.carsSvc.refresh().then(() =>{
            this.cars = this.carsSvc.getAll();
        })

        this.carsSvc.updated(() => {
            console.log("car svc updated");
            this.carsSvc.refresh().then(() =>{
                this.cars = this.carsSvc.getAll();
            })
        });
   }

    public nextPage() {
        this.currentPage++;
    }

    public prevPage() {
        this.currentPage--;
    }

    public addCar(newCar: Car) {
        this.carsSvc.append(newCar).then(() =>{
            console.log("added car");
        })
    }
}
