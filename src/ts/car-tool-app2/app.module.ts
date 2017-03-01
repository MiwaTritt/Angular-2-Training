import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { ToolHeader } from "./components/tool-header.component";
import { CarTable } from "./components/car-table.component";
import { CarForm } from "./components/car-form.component";
import { PaginatedCarTable } from "./components/paginated-car-table.component";

@NgModule({
    imports: [ BrowserModule, FormsModule ],
    declarations: [ AppComponent, ToolHeader, CarForm, CarTable, PaginatedCarTable ],
    bootstrap: [ AppComponent ],
})
export class AppModule { }
