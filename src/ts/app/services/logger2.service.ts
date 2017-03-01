import { Injectable } from "@angular/core";

@Injectable()
export class Logger2 {

    public log(message: string) {
        console.log("logger 2 =>" , message);
    }

    public error(message: string) {
        console.error("logger 2 =>" , message);
    }

}