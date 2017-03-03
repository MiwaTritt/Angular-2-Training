import { Component } from "@angular/core";
import { Cars } from "./services/cars.service";
import { Car } from "./interfaces/car";

@Component({
    selector: "main",
    template: `
    <div> {{message}} </div>

    `,
})
export class AppComponent { 

    public message = "Hello World";
    
}
