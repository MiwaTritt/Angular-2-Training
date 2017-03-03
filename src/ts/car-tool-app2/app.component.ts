import { Component } from "@angular/core";
import { FormControl, FormGroup, FormArray, Validators} from "@angular/forms";

@Component({
    selector: "main",
    template: `
    <div [formGroup]="profileForm">
        First Name: <input type="text" formControlName="firstNameControl">
        <br>
        Last Name: <input type="text" formControlName="lastNameControl">
        <br>
    </div>
        <button type="button" (click)="save()">Save</button>
    `,
    styles: [
        
    ],
})
export class AppComponent { 

    public profileForm: FormGroup;
    public firstName: string;

    constructor(){
        //first param - value of control - second param - validators of formcontrol
        //this.firstNameControl = new FormControl("", [Validators.required]);
        this.profileForm = new FormGroup({
            firstNameControl: new FormControl("", [Validators.required]),
            lastNameControl: new FormControl("", [Validators.required]),
            addressGroups: new FormArray([
                new FormGroup({
                    streetControl: new FormControl(""),
                    cityControl: new FormControl(""),
                    stateControl: new FormControl(""),
                    
                })
            ])
        });
    }
    
    public save() {
        console.dir(this.profileForm.value);
        //this.firstName = this.firstNameControl.value;
    }
}
