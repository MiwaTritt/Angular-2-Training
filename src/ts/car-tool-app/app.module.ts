import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { MyUppercasePipe } from "./pipes/my-uppercase.pipe";
import { MyEllipsisPipe } from "./pipes/my-ellipsis.pipe";
//App Module eventually imported into main.ts

import { Cars } from "./services/cars.service";

@NgModule({
    //BrowserModule - actual module
    imports: [ BrowserModule, FormsModule ],
    declarations: [ AppComponent, MyUppercasePipe, MyEllipsisPipe ],
    bootstrap: [ AppComponent ],
    providers: [ { provide: Cars, useClass: Cars } ],
})
export class AppModule { }