import { Component, Input }  from "@angular/core";

@Component({
    selector: "tool-header",
    template: `
    <header>
        <h1>{{header}}</h1>
    </header>
    `,
})
export class ToolHeader {

    //property name needs to be the same as the attribute in the html element
    @Input()
    public header: string = "";

 }