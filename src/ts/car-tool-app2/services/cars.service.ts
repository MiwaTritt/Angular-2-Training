import { Injectable } from "@angular/core";

import { Car } from "../interfaces/car";
import { Http, RequestOptions, Headers } from "@angular/http";

import "rxjs";
import { Observable } from "rxjs";


@Injectable()
export class Cars {

    private updateFns: Function[] = [];

    private cars: Car[] = [];

    constructor(private http : Http) { };

    public refresh(): Observable<Car[]> {
         return this.http.get("http://localhost:3010/cars")
         .map((res) => res.json())
         .map((cars) =>{
             this.cars = cars;
             this.notifyUpdate();
             return this.cars;
         });
    }

    public getAll(): Car[] {
       return this.cars;
    }

    public append(car: Car) {
        car.id = ++this.cars[this.cars.length-1].id;
        this.cars = this.cars.concat(car);

        const requestOptions = new RequestOptions({
            headers: new Headers({
                "Content-Type": "application/json",
            }),
        });

        return this.http.post("http://localhost:3010/cars", JSON.stringify(car), requestOptions)
            .toPromise().then((res) => res.json())
            .then((car) => { this.refresh();});
    }

    public updated(fn: Function) {
        this.updateFns.push(fn);
    }

    public notifyUpdate() {
        this.updateFns.forEach((updateFn) => {
            updateFn();
        });
    }
}
