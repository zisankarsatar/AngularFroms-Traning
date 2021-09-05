import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable, of } from "rxjs";
import { delay, map} from "rxjs/operators";

@Injectable({
    providedIn:'root'
})
export class UserNameService {

    takenUsernames = ['melih', 'alp', 'derya', 'zisan'];

    constructor(){}

    checkIfUsernameExists(username: string) : Observable<boolean>{
        return of(this.takenUsernames.includes(username)).pipe(delay(1000));
    }

    usernameValidator(): AsyncValidatorFn{
        return (control : AbstractControl) : Observable<ValidationErrors | null> => {
           return this.checkIfUsernameExists(control.value).pipe(
               map(response => {
                   return response ? {usernameExists : true} : null;
               })
           )
        }
    }
}