import { Component } from "@angular/core";
import { Cars } from "./services/cars.service";
import { Car } from "./interfaces/car";

let counter: number = 0;

@Component({
    selector: "my-comp",
    template: `<span>index: {{this.index}}</span>`,
})
export class MyComp {
    public index: number;

    constructor() {
        this.index = counter++;
        console.dir(this);
    }

    public doIt() {
        console.log('doIt');
        console.log(this.index);
    }
}

@Component({
    selector: "main",
    template: `
    <!--<my-comp></my-comp>
    <my-comp></my-comp>
    <my-comp></my-comp>
    <my-comp></my-comp>
    <my-comp></my-comp>-->
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
                required #lastNameInputRef="ngModel">
            <span *ngIf="lastNameInputRef.invalid && lastNameInputRef.touched">
                Last Name is required
            </span>
            <br>Value: {{lastName}},
                {{lastNameInputRef.invalid ? 'invalid' : 'valid'}}
        </div>
        <div>
            <label for="birth-date-input">Birth Date:</label>
            <input type="date" id="birth-date-input" 
                name="birthDateInput" [(ngModel)]="birthDate" 
                #birthDateInputRef="ngModel" min="2010-01-01">
            <br>Value: {{birthDate}}
        </div>
        <div>
            <label for="fav-color-input">Favorite Color:</label>
            <input type="color" id="fav-color-input" 
                name="favColorInput" [(ngModel)]="favColor" 
                #favColorInputRef="ngModel">
            <br>Value: {{favColor}}
        </div>
        <div>
            <label for="experience-level-input">Experience Level:</label>
            <input type="range" id="experience-level-input" 
                name="experienceLevel" [(ngModel)]="experienceLevel" 
                #experienceLevelInputRef="ngModel">
            <br>Value: {{experienceLevel}}
        </div>
        <div>
            <label for="is-customer-input">Is Customer:</label>
            <input type="checkbox" id="is-customer-input" 
                name="isCustomer" [(ngModel)]="isCustomer" 
                #isCustomerInputRef="ngModel">
            <br>Value: {{isCustomer ? 'Is a Customer' : 'Is not a Customer'}}
        </div>       
        <fieldset>
            <legend>Kind of User</legend>
            <div>
                <label for="kind-of-user-proffesional-input">Professional: </label>
                <input type="radio" id="kind-of-user-proffesional-input"
                    name="kindOfUser" [(ngModel)]="kindOfUser" value="Professional">
            </div>
            <div>
                <label for="kind-of-user-hobbyist-input">Hobbyist: </label>
                <input type="radio" id="kind-of-user-hobbyist-input"
                    name="kindOfUser" [(ngModel)]="kindOfUser" value="Hobbyist">
            </div>
            <div>
                <label for="kind-of-user-student-input">Student: </label>
                <input type="radio" id="kind-of-user-student-input"
                    name="kindOfUser" [(ngModel)]="kindOfUser" value="Student">
            </div>
            <br>Value: {{kindOfUser}}
        </fieldset>
        <div>
            <label for="comments-textarea">Comments:</label>
            <textarea id="comments-textarea" name="commentsTextArea" [(ngModel)]="comments"></textarea>
        </div>
        <div>
            <label for="sample-select">Sample Select:</label>
            <select id="sample-select" name="sampleSelectInput" [(ngModel)]="sampleSelect">
                <option value="">Select One</option>
                <option *ngFor="let option of options" [value]="option.value">
                    {{option.label}}
                </option>
            </select>
            <br>Value: {{sampleSelect}}
        </div>        


        <button type="button" (click)="save()">Save</button>
    </form>
    `,
    styles: [
        "input.ng-invalid.ng-touched { border: red 1px solid; }",
        "textarea {vertical-align: middle;}"
    ],
})
export class AppComponent { 

    public firstName: string = "";
    public lastName: string = "";
    public birthDate: string = "";

    public options: any[] =[
        {value: 1, label: "option 1"}, 
        {value: 2, label: "option 2"},
        {value: 3, label: "option 3"},
    ]

    public save() {
        console.dir(this);
    }
    
}
