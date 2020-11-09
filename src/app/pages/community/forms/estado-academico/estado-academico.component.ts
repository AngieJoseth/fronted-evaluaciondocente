import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { CommunityService } from '../../../../services/community/community.service'

@Component({
  selector: 'app-estado-academico',
  templateUrl: './estado-academico.component.html',
})
export class EstadoAcademicoComponent implements OnInit {

  //VARIABLES FORM CONTROL
  form: FormGroup;

  //COMBOS
  careers: SelectItem[];

  //URLS 
  urlcombo = "combo";

  constructor(private vinculacionService: CommunityService,
    private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      carrer: [''],
      objeto: [''],
      ciclo: [''],
      modalidad: [''],
      localizacion: [''],
      plazo: [''],
      fechaPresentacion: [''],
      fechaInicio: [''],
      fechaFinal: [''],
    });
    this.form.valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe(value => {
        this.calcularPlazo(value.fechaInicio, value.fechaFinal);
        this.setModalidad(value.carrer);
      });
  }

  setModalidad(carrer){
    this.vinculacionService.get(this.urlcombo).subscribe(
      response => {
        const careers = response['career'];
        careers.forEach(element => {  
          if (carrer == element.name)
            this.form.controls['modalidad'].setValue(element.modality);       
        });
      },
      error => {
        console.log(error);
      });

  }

  filterAssignedLines(event) {
    this.vinculacionService.get(this.urlcombo).subscribe(
      response => {
        this.careers = [];
        const careers = response['career'];
        for (const item of careers) {
          const brand = item.name;
          if (brand.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
            this.careers.push(brand);
          }
        }
      },
      error => {
        console.log(error);
      });
  }

  calcularPlazo(fechaInicio, fechaFin) {
    if (fechaInicio != undefined && fechaInicio.length != 0
      && fechaFin != undefined && fechaFin.length != 0) {
      var inicio = transformDate(fechaInicio);
      var final = transformDate(fechaFin);
      var plazo = final - inicio;
      var meses = (plazo / (1000 * 60 * 60 * 24)) / 30;
      this.form.controls['plazo'].setValue(Math.trunc(meses) + ' meses');
    }
  }
}

function transformDate(date: Date) {
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var year = date.getFullYear();
  var stringDate = year + '-' + month + '-' + day;
  var finalDate = new Date(stringDate);
  return finalDate.getTime();
}
