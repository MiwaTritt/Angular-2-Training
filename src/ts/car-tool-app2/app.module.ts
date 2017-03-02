import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { AppComponent } from "./app.component";
import { ToolHeader } from "./components/tool-header.component";
import { CarTable } from "./components/car-table.component";
import { CarForm } from "./components/car-form.component";
import { PaginatedCarTable } from "./components/paginated-car-table.component";
import { FilteredCarTable } from "./components/filtered-car-table.component";

@NgModule({
    imports: [ BrowserModule, FormsModule, HttpModule ],
    declarations: [
        AppComponent, ToolHeader,
        CarForm, CarTable, PaginatedCarTable, FilteredCarTable,
    ],
    bootstrap: [ AppComponent ],
})
export class AppModule { }
