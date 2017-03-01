import { Component, Input, OnInit }  from "@angular/core";

@Component({
    selector: "tool-header",
    template: `
    <header>
        <h1>{{header}}</h1>
    </header>
    `,
})
export class ToolHeader implements OnInit{

    //property name needs to be the same as the attribute in the html element
    @Input()
    public header: string = "";

    @Input()
    public obj: Object;

    public ngOnInit(){
        console.log(this.obj);
    }

 }