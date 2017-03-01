import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "myAppend",
})
export class MyAppendPipe implements PipeTransform {

    public transform(value: any, strToAppend : any) {

        return String(value) + String(strToAppend);

    }

}