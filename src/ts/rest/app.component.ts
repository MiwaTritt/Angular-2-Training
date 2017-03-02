import { Component } from "@angular/core";
import { Http } from "@angular/http";



@Component({
    selector: "main",
    template: `

    `,
})
export class AppComponent {

    constructor(private http : Http) {

        this.http.get("http://localhost:3010/widgets")
            .toPromise().then(res => res.json())
            .then(result => console.log(result));
   }

}
