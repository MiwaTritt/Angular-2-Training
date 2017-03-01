import { Component, Output, EventEmitter } from "@angular/core";

import { Car } from "../interfaces/car";

@Component({
    selector: "car-form",
    template: require("./car-form.component.html"),
})
export class CarForm {

    public newCar: Car = {} as Car;

    @Output()
    public carSubmitted: EventEmitter<Car> = new EventEmitter<Car>();

    public addCar() {
        this.carSubmitted.emit(this.newCar);
        this.newCar = {} as Car;
    }

}