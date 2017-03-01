import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "myEllipsis",
})
export class MyEllipsisPipe implements PipeTransform {

    public transform(value: any, size: any) {

        //will check undefined and null
        if(value == null)
            return "";
        return String(value).length > 0 ? String(value).substring(0,parseInt(size)) + "..." : "";

    }

}