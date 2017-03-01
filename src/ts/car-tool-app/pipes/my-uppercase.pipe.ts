import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "myUppercase"
})
export class MyUppercasePipe implements PipeTransform {
    public transform(value: any) {
        return String(value).split(' ').map((s : string) => (s.includes("mc")) ? s.charAt(0).toUpperCase() + s.charAt(1) + s.charAt(2).toUpperCase() + s.slice(3) : s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
    }
}