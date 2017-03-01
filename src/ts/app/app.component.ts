import { Component, Pipe, PipeTransform } from "@angular/core";
import { Logger } from "./services/logger.service";
import { Logger2 } from "./services/logger2.service";

const MockLogger = {
    log: () => {},
    error: () => {},
};

// @Pipe({
//     name: "demo",
// })
// export class DemoPipe implements PipeTransform {
//     public transform(value: string) {
//         console.log("pipe excecuted");
//         return value;
//     }
// }



@Component({
    selector: "main",
    template: `
    <div>
        <h1>{{header | myUppercase | myAppend:'!!!!'}}</h1>
        <form>
            <div>
                <label>Filter:</label>
                <input type="text" name="colorFilterInput" [(ngModel)]="colorFilter">
            </div>
        </form>
        <ul>
            <li *ngFor="let color of filteredColors(colorSort) ">{{color}}</li>
        </ul>
    </div>
    <form>
        <div>
            <label for="new-color-input">NewColor</label>
            <input type="text" [(ngModel)]="newColor" id="new-color-input" name="newColorInput">
        </div>
        <div>
            <button type="button" (click)="addColor()">
                Add Color
            </button>
        </div>
    </form>
    <div>
        <button type="button" (click)="prevPage()">
            Prev
        </button>

        <button type="button" (click)="nextPage()">
            Next
        </button>
    </div>
    `,
    
})
export class AppComponent { 
    public header: string = "Color Tool";
    public newColor: string = "";
    public colorFilter: string = "";

    //inject logger service
    constructor(private logger: Logger){ };

    public colors: string[] = [
        "saffron", "green", "white", "red", "gold", "blue", "yellow",
    ];

    public lastColors: any[];
    private internalSortedColors: any[];

    private filterCache: Map<string, string[]> = new Map<string, string[]>();

//removed get accessor b/c can't pass in parameter for get
    public filteredColors(sortFn: Function) {
        if (!this.filterCache.has(this.colorFilter)) {
            this.logger.log("doing some filtering");
            this.filterCache.set(this.colorFilter,
                sortFn(this.colors.filter((color) => color.startsWith(this.colorFilter))));
        }
        return this.filterCache.get(this.colorFilter);
    }

    public colorSort(colors: string[]) {
        return colors.sort()

    }

    // public get filteredColors(): string[] {
    //     //see if key value pair for that color exists in map
    //     if(!this.filterCache.has(this.colorFilter)){
    //         //actually filter colors and store in map
    //         //pass callback function in filter
    //         this.filterCache.set(this.colorFilter, 
    //             this.colors.filter((color) =>  color.startsWith(this.colorFilter)));
    //     }
    //     return this.filterCache.get(this.colorFilter);
    // }

    public get sortedColors () {
        //if you only mutate array this will not be true, need to update reference
        if(this.lastColors !== this.colors) {
            console.log("do sort");
            this.lastColors = this.colors;
            //concat returns reference to new object array on heap
            //non destructive sort
            this.internalSortedColors = this.colors.concat().sort();
        }
        //console.log("called get sorted colors");
        return this.internalSortedColors;
    }
    

    public addColor() {
        //when add new color to list - produce new object reference
        //if nothing is pointing to old array - it is garbage collected
        this.colors = this.colors.concat(this.newColor);
        this.newColor = "";
        //want to clear cache if color added
        this.filterCache.clear();
    }
}
//traditional name for root Component is AppComponent