import { Component, Input }  from "@angular/core";

@Component({
    selector: "car-form",
    template: `
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
    `,
})
export class CarForm {


}