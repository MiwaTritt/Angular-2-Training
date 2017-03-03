import { Component } from "@angular/core";
import { Cars } from "./services/cars.service";
import { Car } from "./interfaces/car";

@Component({
    selector: "main",
    template: `
    <form novalidate>
        <div>
            <label for="first-name-input">First Name:</label>
            <input type="text" id="first-name-input" 
                name="firstNameInput" [(ngModel)]="firstName" 
                required #firstNameInputRef="ngModel">
            <span *ngIf="firstNameInputRef.invalid && firstNameInputRef.touched">
                First Name is required
            </span>
            <br>Value: {{firstName}}, 
                {{firstNameInputRef.invalid ? 'invalid' : 'valid'}}
        </div>
        <div>
            <label for="last-name-input">Last Name:</label>
            <input type="text" id="last-name-input" 
                name="lastNameInput" [(ngModel)]="lastName" 
                required>
            <br>Value: {{lastName}}
        </div>
    </form>
    `,
    styles: [
        "input.ng-invalid.ng-touched { border: red 1px solid; }",
    ],
})
export class AppComponent { 

    public firstName: string = "";
    public lastName: string = "";
    
}
