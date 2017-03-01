import { Component, Input, OnInit } from "@angular/core";

import { Car } from "../interfaces/car";

@Component({
    selector: "paginated-car-table",
    template: `
    <car-table [cars]="carPage"></car-table>
    <form>
        <button type="button" (click)="go(-1)">Prev</button>
        <button type="button" (click)="go(1)">Next</button>
        <span>
            Page {{currentPage+1}} of {{totalPages}}
        </span>
    </form>`,
})
export class PaginatedCarTable implements OnInit {

    @Input()
    public cars: Car[] = [];

    @Input()
    public pageLength: number;

    @Input()
    public initialPage: number;

    public get carPage(): Car[] {
        const startIndex = this.currentPage * this.pageLength;
        const endIndex = startIndex + this.pageLength;
        return this.cars.slice(startIndex, endIndex);
    }

    public get totalPages(): number {
        return Math.ceil(this.cars.length / this.pageLength);
    }

    public currentPage: number = 0;

    public ngOnInit() {
        this.currentPage = this.initialPage;
    }

    public go(pages: number) {
        this.currentPage += pages;
    }
}
