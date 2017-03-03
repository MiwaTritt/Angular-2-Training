import { Component, OnInit } from "@angular/core";
import { Http } from "@angular/http";

import { Car } from "./interfaces/car";
import { Cars } from "./services/cars.service";

import { Observable, Observer } from "rxjs";

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
export class AppComponent implements OnInit{

    public toolHeader: string = "Car Tool!!";
    public cars: Car[] = [];
    public newCar: Car = {} as Car;
    

    public ngOnInit() {

        this.carsSvc.refresh().subscribe((cars) => {
            this.cars = cars;
        });
        
        // const myObservable = Observable.create((observer : Observer<number>) =>{

        //     let counter = 0;
        //     setInterval(() =>{
        //         observer.next(counter++);
        //         //if error executed will still keep recieving data
        //         //observer.error();
        //         //similar to Promise.resolve()
        //         //observer.next();
        //         //No more data
        //         //observer.complete();
        //     },500);

        // });

        // //will be invoked each time observer.next() is called
        // myObservable.map((x: number) => x ** 2).subscribe((result: number) => {
        //     console.log(result);
        // });

    }

    public currentPage: number = 0;
    public pageLength: number = 10;

    public get startIndex() {
        return this.currentPage * this.pageLength;
    }

    public get endIndex() {
        return this.startIndex + this.pageLength;
    }

    constructor(private carsSvc: Cars, private http : Http) {

        this.carsSvc.updated(() => {
            console.log("car svc updated");
            this.cars = this.carsSvc.getAll();
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
