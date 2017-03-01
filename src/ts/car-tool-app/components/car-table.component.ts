import { Component, Input }  from "@angular/core";

@Component({
    selector: "car-table",
    template: `
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
            <tr *ngFor="let car of filteredCars">
                <td>{{car.id}}</td>
                <td>{{car.make}}</td>
                <td>{{car.model}}</td> 
                <td>{{car.year}}</td>
                <td>{{car.color}}</td>
                <td>{{car.price}}</td>
            </tr>
        </tbody>
    </table>
    `,
})
export class CarTable {

    @Input()
    public filteredCars: any[];

 }