import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-institucion-beneficiaria',
  templateUrl: './beneficiary-institution.component.html',
})
export class BeneficiaryInstitutionComponent implements OnInit {

  //VARIABLES FORM CONTROL
  form: FormGroup;

  //STEPS
  itemsInstBene: MenuItem[];
  activeIndexitemsInstBene: Number;

  //TABLAS
  tablaCoorInstBene: any[];
  //coordinadoresInstitucion: Coordinador[] = [];
  //coordinadorInstitucion: Coordinador;

  //DIALOG
  display: boolean;

  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.steps();
    this.tablaCoor();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      nombreInstitucion: [''],
      parroquia: [''],
      canton: [''],
      provincia: [''],
      ubicacion: [''],
      beneficiariosDirectos: [''],
      beneficiariosIndirectos: [''],
      nombreRepreLegal: [''],
      RucRepreLegal: [''],
      funcion: [''],
      nombreCoorInstBen: ['', [Validators.required]],
      cargoCoorInstBen: ['', [Validators.required]],
      funcionCoorComu: ['', [Validators.required]],
    });
  }

  steps() {
    this.activeIndexitemsInstBene = 0;
    this.itemsInstBene = [{
      label: 'Archivos adjuntos',
      command: (event: any) => {
        this.activeIndexitemsInstBene = 0;
      }
    },
    {
      label: 'Informacion general',
      command: (event: any) => {
        this.activeIndexitemsInstBene = 1;
      }
    },
    {
      label: 'Informacion del coordinador',
      command: (event: any) => {
        this.activeIndexitemsInstBene = 2;
      }
    },];
  }

  tablaCoor() {
    this.tablaCoorInstBene = [
      { field: 'nombreCoorInstBen', header: 'Nombre completo' },
      { field: 'cargoCoorInstBen', header: 'Cargo institución' },
      { field: 'funcionCoorComu', header: 'Funciones comunidad' },
    ]
  }

  addCoorInstBene(event: Event) {
    event.preventDefault();
      const values = this.form.value;
      /* 
      this.coordinadoresInstitucion.push(this.coordinadorInstitucion = {
        nombreCoorInstBen: values.nombreCoorInstBen,
        cargoCoorInstBen: values.cargoCoorInstBen,
        funcionCoorComu: values.funcionCoorComu,
      }); */
      this.form.controls['nombreCoorInstBen'].setValue('');
      this.form.controls['cargoCoorInstBen'].setValue('');
      this.form.controls['funcionCoorComu'].setValue('');
  }
}
