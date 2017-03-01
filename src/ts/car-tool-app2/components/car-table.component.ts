import { Component, Input } from "@angular/core";

import { Car } from "../interfaces/car";

@Component({
    selector: "car-table",
    template: `        <table>
            <thead>
                <tr>
                    <th>Make</th>
                    <th>Model</th>
                    <th>Year</th>
                    <th>Color</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="let car of cars">
                    <td>{{car.make}}</td>
                    <td>{{car.model}}</td>
                    <td>{{car.year}}</td>
                    <td>{{car.color}}</td>
                    <td>{{car.price}}</td>
                </tr>
            </tbody>
        </table>`,
})
export class CarTable {

    @Input()
    public cars: Car[] = [];
}
