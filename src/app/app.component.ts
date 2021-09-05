import { Component } from '@angular/core';
import { FormGroup , FormBuilder, Validators, FormArray} from '@angular/forms';
import { UserNameService } from './username.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'traning-forms';

  criteriaFrom : FormGroup;

  constructor(
    private fb: FormBuilder,
    private usernameService: UserNameService
    ){}

  get criterias(): FormArray{
    return this.criteriaFrom.get('criterias') as FormArray
  }

  ngOnInit() {
    this.criteriaFrom = this.fb.group({
      email : ['' , Validators.email],
      username : ['', [Validators.required], [this.usernameService.usernameValidator()]],
      criterias : this.fb.array([]),
      terms : [false, Validators.requiredTrue]
    });
  }

  addCriteria(){
    //let control = <FormArray>this.criteriaFrom.controls.criterias;

    this.criterias.push(
      this.fb.group({
        criteriaName:['', Validators.maxLength(200)],
        criteriaRule:'',
        isRequired: false,
        hasValue: false
      })
    )
  }

  deleteCriteria(index : number){
    this.criterias.removeAt(index);
  }

  createCreteria(){
    console.log(this.criteriaFrom.value);
  }

}
