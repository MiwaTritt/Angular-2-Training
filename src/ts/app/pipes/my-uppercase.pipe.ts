import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "myUppercase",
})
export class MyUppercasePipe implements PipeTransform {

    public transform(value: any) {

        return String(value).toLowerCase();

    }

}