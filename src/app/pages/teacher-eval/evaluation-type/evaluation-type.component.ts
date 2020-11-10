import { Component, OnInit } from '@angular/core';
import {EvaluationType} from '../../../models/teacher-eval/evaluation-type';
import {TeacherEvalService} from '../../../services/teacher-eval/teacher-eval.service';
import { BreadcrumbService } from '../../../shared/breadcrumb.service';
import { IgnugService } from '../../../services/ignug/ignug.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService,  MessageService, SelectItem } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-evaluation-type',
  templateUrl: './evaluation-type.component.html',
  styleUrls: ['./evaluation-type.component.css']
})
export class EvaluationTypeComponent implements OnInit {
  formEvaluationType:FormGroup;
  evaluationtypes: EvaluationType[];
  selectedEvaluationtype: EvaluationType;
  validacion: any;
  colsEvaluationType: any[];
  flagEditEvaluationType: boolean;
  headerDialogEvaluationType: string;
  displayFormEvaluationType: boolean;


  

  constructor( private _teacherEvalService: TeacherEvalService,
    private _breadcrumbService: BreadcrumbService, 
    private _fb: FormBuilder,
    private _spinnerService: NgxSpinnerService,
    private _messageService: MessageService,
    private _translate: TranslateService,
    private _confirmationService: ConfirmationService,

    ) {
    
    this._breadcrumbService.setItems([
      { label: 'evaluationtypes' }
  ]);
    this.evaluationtypes=[];
    this.buildFormEvaluationType();
  }

  ngOnInit() : void{
      
    this.getEvaluationType();
    this.setColsEvaluationType();
    
  }
  setColsEvaluationType() {
    this._translate.stream('CODE').subscribe(response => {
        this.colsEvaluationType = [
            { field: 'code', header: this._translate.instant('CODE') },
            { field: 'name', header: this._translate.instant('NAME') },
            { field: 'percentage', header: this._translate.instant('PERCENTAGE') },
            { field: 'global_percentage', header: this._translate.instant('GLOBAL_PERCENTAGE') },
            { field: 'state.name', header: this._translate.instant('STATE') },
            
        ];
    });

}
  getEvaluationType() {
    this._spinnerService.show();
      this._teacherEvalService.get('evaluation_types').subscribe(
        response => {
          this._spinnerService.hide();
          this.evaluationtypes = response['data'];
          console.log('esto', this.evaluationtypes);
          
        },
        error => {
          this._spinnerService.hide();
          this._messageService.add({
              key: 'tst',
              severity: 'error',
              summary: 'Oops! Problemas con el servidor',
              detail: 'Vuelve a intentar más tarde',
              life: 5000
          });
      });
  }
  buildFormEvaluationType() {
    this.formEvaluationType = this._fb.group({
        id: [''],
        code: ['', Validators.required],
        percentage: ['', Validators.required],
        name: ['', Validators.required],
        global_percentage: ['', Validators.required],
        state_id: ['', Validators.required]
    });
  }
  onSubmitEvaluationType(event: Event) {
    event.preventDefault();
    if (this.formEvaluationType.valid) {
        if (this.flagEditEvaluationType) {
            this.updateEvaluationType();
        } else {
            this.createEvaluationType();
        }
    } else {
        this.formEvaluationType.markAllAsTouched();
    }
}
selectEvaluationType(evaluationType: EvaluationType): void {
  if (evaluationType) {
      this.selectedEvaluationtype= evaluationType;
      this.formEvaluationType.controls['id'].setValue(evaluationType.id);
      this.formEvaluationType.controls['code'].setValue(evaluationType.code);
      this.formEvaluationType.controls['name'].setValue(evaluationType.name);
      this.formEvaluationType.controls['percentage'].setValue(evaluationType.percentage);
      this.formEvaluationType.controls['global_percentage'].setValue(evaluationType.global_percentage);
      this.formEvaluationType.controls['state_id'].setValue(evaluationType.state.id);
      this._translate.stream('MODIFY RECORD').subscribe(response => {
          this.headerDialogEvaluationType = response;
      });
  } else {
      this.selectedEvaluationtype = {};
      this.formEvaluationType.reset();
      this._translate.stream('NEW RECORD').subscribe(response => {
          this.headerDialogEvaluationType  = response;
      });
  }
  this.displayFormEvaluationType = true;
}

createEvaluationType() {
  this.selectedEvaluationtype = this.castEvaluationType();
  this._spinnerService.show();
  this._teacherEvalService.post('evaluation_types', {
      evaluationType: this.selectedEvaluationtype,
      state: this.selectedEvaluationtype.state
  }).subscribe(
      response => {
          this.selectedEvaluationtype.id = response['data']['id']
          this.evaluationtypes.unshift(this.selectedEvaluationtype);
          this._spinnerService.hide();
          this._messageService.add({
              key: 'tst',
              severity: 'success',
              summary: 'Se creó correctamente',
              detail: this.selectedEvaluationtype.name,
              life: 5000
          });
          this.displayFormEvaluationType = false;
      }, error => {
          this._spinnerService.hide();
          this._messageService.add({
              key: 'tst',
              severity: 'error',
              summary: 'Oops! Problemas con el servidor',
              detail: 'Vuelve a intentar más tarde',
              life: 5000
          });
      });
}
updateEvaluationType() {
  this.selectedEvaluationtype = this.castEvaluationType();
  this._spinnerService.show();
  this._teacherEvalService.update('answers/' + this.selectedEvaluationtype.id, {
      answer: this.selectedEvaluationtype,
      state: this.selectedEvaluationtype.state
  }).subscribe(
      response => {
          const indiceUser = this.evaluationtypes
              .findIndex(element => element.id === this.selectedEvaluationtype.id);
          this.evaluationtypes.splice(indiceUser, 1, response['data']);
          this._spinnerService.hide();
          this._messageService.add({
              key: 'tst',
              severity: 'success',
              summary: 'Se actualizó correctamente',
              detail: this.selectedEvaluationtype.name,
              life: 5000
          });
          this.displayFormEvaluationType = false;
      }, error => {
          this._spinnerService.hide();
          this._messageService.add({
              key: 'tst',
              severity: 'error',
              summary: 'Oops! Problemas con el servidor',
              detail: 'Vuelve a intentar más tarde',
              life: 5000
          });
      });
}

deleteEvaliationType(evaluationType: EvaluationType) {
  this._confirmationService.confirm({
      header: 'Delete ' + evaluationType.name,
      message: 'Are you sure to delete?',
      acceptButtonStyleClass: 'ui-button-danger',
      rejectButtonStyleClass: 'ui-button-secondary',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      icon: 'pi pi-trash',
      accept: () => {
          this._spinnerService.show();
          this._teacherEvalService.delete('evaluation_types/' + evaluationType.id).subscribe(
              response => {
                  const indiceUser = this.evaluationtypes
                      .findIndex(element => element.id === evaluationType.id);
                  this.evaluationtypes.splice(indiceUser, 1);
                  this._spinnerService.hide();
                  this._messageService.add({
                      key: 'tst',
                      severity: 'success',
                      summary: 'Se eliminó correctamente',
                      detail: evaluationType.name,
                      life: 5000
                  });
              }, error => {
                  this._spinnerService.hide();
                  this._messageService.add({
                      key: 'tst',
                      severity: 'error',
                      summary: 'Oops! Problemas con el servidor',
                      detail: 'Vuelve a intentar más tarde',
                      life: 5000
                  });
              });
      }
  });

}

  castEvaluationType(): EvaluationType {
    return {
        id: this.formEvaluationType.controls['id'].value,
        code: this.formEvaluationType.controls['code'].value,
        name: this.formEvaluationType.controls['name'].value,
        percentage: this.formEvaluationType.controls['percentage'].value,
        global_percentage: this.formEvaluationType.controls['global_percentage'].value,
        state: { id: this.formEvaluationType.controls['state_id'].value },
    } as EvaluationType;
}

}
