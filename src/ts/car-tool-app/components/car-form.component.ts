import { Component, Output, EventEmitter }  from "@angular/core";

import { Car } from "../interfaces/car";

@Component({
    selector: "car-form",
    template: require("./car-form.component.html"),
})
export class CarForm {
    
    public newCar: Car = {} as Car;

    //when event is emitted will return a Car
    @Output()
    public carSubmitted: EventEmitter<Car> = new EventEmitter<Car>();

    public addCar() {
        //emit car out of cuntion
        this.carSubmitted.emit(this.newCar);
        //use 'as Car' to cast '{}' to Car
        this.newCar = {} as Car;
    }

}