import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-observaciones',
  templateUrl: './observations.component.html',
})
export class ObservationsComponent implements OnInit {

  //VARIABLES FORM CONTROL
  form: FormGroup;

  rol = 'coordinador';
  //rol = 'docente';
  observacionEditable: boolean;

  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
   }

  ngOnInit(): void {
    if (this.rol == 'docente') {
      this.observacionEditable = true;
    } else { 
      this.observacionEditable = false;
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      observaciones: [''],
    });

    this.form.valueChanges
    .pipe(
      debounceTime(500)
    )
    .subscribe(value => {
      console.log(value);
    });
  }
}
