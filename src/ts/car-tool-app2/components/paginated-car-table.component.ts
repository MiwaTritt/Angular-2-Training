import { Component, Input, OnInit } from "@angular/core";

import { Car } from "../interfaces/car";

@Component({
    selector: "paginated-car-table",
    template: `     
        <div>
            <car-table [cars]="carPage"></car-table>
        </div>   
        <div>
            <button type="button" (click)="go(-1)">Prev</button>
            <button type="button" (click)="go(1)">Next</button>
        </div>
        <span>
            Page {{currentPage+1}} of {{totalPages}}
        </span>
        `,
})
export class PaginatedCarTable implements OnInit{

    @Input()
    public cars: Car[] = [];
    @Input()
    public pageLength: number;
    @Input()
    public initialPage: number;

    public ngOnInit() {
        this.currentPage = this.initialPage;
    }

    public get carPage(): Car[] {
        const startIndex = this.currentPage * this.pageLength;
        const endIndex = this.currentPage + this.pageLength;
        return this.cars.slice(startIndex, endIndex);
    }

    public get totalPages(): number {
        return Math.ceil(this.cars.length/this.pageLength);
    }

    public currentPage: number = 0;

    public go(pages: number){
        this.currentPage += pages;
    }
}
