import { Component, OnInit } from '@angular/core';
import { TeacherEvalService } from '../../../services/teacher-eval/teacher-eval.service';
import { IgnugService } from '../../../services/ignug/ignug.service';
import { Question } from '../../../models/teacher-eval/question';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BreadcrumbService } from '../../../shared/breadcrumb.service';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  questions: Question[];
  colsQuestion: any[];
  formQuestion: FormGroup;
  displayFormQuestion: boolean;
  flagEditQuestion: boolean;
  selectedQuestion: Question;
  headerDialogQuestion: string;
  typeIdQuestion: SelectItem[];

  evaluationTypes: any[];
  types: any[];
  status: any[];

  constructor(private _teacherEvalService: TeacherEvalService,
    private _ignugService: IgnugService,
    private _messageService: MessageService,
    private _fb: FormBuilder,
    private _translate: TranslateService,
    private _confirmationService: ConfirmationService,
    private _spinnerService: NgxSpinnerService,
    private _breadcrumbService: BreadcrumbService,
  ) {
    this._breadcrumbService.setItems([
      { label: 'Questions' }
    ]);

    this.questions = [];
    this.buildFormQuestion();

  }

  ngOnInit(): void {


    this.evaluationTypes = [];
    this.types = [];
    this.status = [
      { label: '', value: '' }
    ];

    this.getQuestions();
    this.getEvaluationTypes();
    this.getCatalogueTypes();
    this.getCatalogueStatus();
    this.setColsQuestion();
  }


  setColsQuestion() {
    this._translate.stream('CODE').subscribe(response => {
      this.colsQuestion = [
        { field: 'code', header: this._translate.instant('CODE') },
        { field: 'order', header: this._translate.instant('ORDER') },
        { field: 'name', header: this._translate.instant('NAME') },
        { field: 'description', header: this._translate.instant('DESCRIPTION') },
        { field: 'evaluationType.name', header: this._translate.instant('EVALUATION TYPE') },
        { field: 'type.name', header: this._translate.instant('TYPE') },
        { field: 'status.name', header: this._translate.instant('STATUS') },
      ];
    });
  }
  getEvaluationTypes(): void {
    const parameters = '?name=DOCENCIA';
    this._teacherEvalService.get('evaluation_types' + parameters).subscribe(
      response => {
        const evaluationTypes = response['data'];
        this.evaluationTypes = [{ label: 'Seleccione', value: '' }];
        evaluationTypes.forEach(item => {
          this.evaluationTypes.push({ label: item.name, value: item.id });
        });
        console.log(response);
      }, error => {
        this._messageService.add({
          key: 'tst',
          severity: 'error',
          summary: 'Oops! Problemas al cargar el tipos de evaluaciones',
          detail: 'Vuelve a intentar más tarde',
          life: 5000
        });
      });
  }
  getCatalogueTypes(): void {
    const parameters = '?type=TYPE_QUESTIONS';
    this._ignugService.get('catalogues' + parameters).subscribe(
      response => {
        const catalogueTypes = response['data']['catalogues'];
        this.types = [{ label: 'Seleccione', value: '' }];
        catalogueTypes.forEach(item => {
          this.types.push({ label: item.name, value: item.id });
        });
      }, error => {
        this._messageService.add({
          key: 'tst',
          severity: 'error',
          summary: 'Oops! Problemas al cargar el catálogo de preguntas',
          detail: 'Vuelve a intentar más tarde',
          life: 5000
        });
      });
  }
  getCatalogueStatus(): void {
    const parameters = '?type=STATUS';
    this._ignugService.get('catalogues' + parameters).subscribe(
      response => {
        const catalogueStatus = response['data']['catalogues'];
        this.status = [{ label: 'Seleccione', value: '' }];

        catalogueStatus.forEach(item => {
          this.status.push({ label: item.name, value: item.id });
        });
      }, error => {
        this._messageService.add({
          key: 'tst',
          severity: 'error',
          summary: 'Oops! Problemas al cargar el catálogo de estados',
          detail: 'Vuelve a intentar más tarde',
          life: 5000
        });
      });
  }

  getStatuName(id: number) {
    const statu = this.status.find(statu => statu.value === id)
    if (statu) {
      return statu.label
    }
  }
  getTypeName(id: number) {
    const type = this.types.find(type => type.value === id)
    if (type) {
      return type.label
    }
  }
  getEvaluationTypeName(id: number) {
    const type = this.evaluationTypes.find(type => type.value === id)
    if (type) {
      return type.label
    }
  }

  getQuestions() {
    this._spinnerService.show();
    this._teacherEvalService.get('questions').subscribe(
      response => {
        this._spinnerService.hide();
        this.questions = response['data'];
        console.log('preguntas',this.questions);
      }, error => {
        this._messageService.add({
          key: 'tst',
          severity: 'error',
          summary: 'Oops! Problemas con el servidor',
          detail: 'Vuelve a intentar más tarde',
          life: 5000
        });
      });
  }

  buildFormQuestion() {
    this.formQuestion = this._fb.group({
      id: [''],
      code: ['', Validators.required],
      order: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      evaluation_type_id: ['', Validators.required],
      type_id: ['', Validators.required],
      status_id: ['', Validators.required],
    });
  }

  onSubmitQuestion(event: Event) {
    event.preventDefault();
    console.log("a");
    if (this.formQuestion.valid) {
      if (this.flagEditQuestion) {
        this.updateQuestion();
        console.log("b");
      } else {
        this.createQuestion();
        console.log("c");
      }
    } else {
      console.log("d");
      this.formQuestion.markAllAsTouched();
    }
  }

  selectQuestion(question: Question): void {
    console.log(question);
    if (question) {
      this.selectedQuestion = question;
      this.formQuestion.controls['id'].setValue(question.id);
      this.formQuestion.controls['code'].setValue(question.code);
      this.formQuestion.controls['order'].setValue(question.order);
      this.formQuestion.controls['name'].setValue(question.name);
      this.formQuestion.controls['description'].setValue(question.description);
      this.formQuestion.controls['evaluation_type_id'].setValue(question.evaluation_type.id);
      this.formQuestion.controls['type_id'].setValue(question.type.id);
      this.formQuestion.controls['status_id'].setValue(question.status.id);

    } else {
      this.selectedQuestion = {};
      console.log(question);
      this.formQuestion.reset();
    }
    this.displayFormQuestion = true;
  }

  createQuestion() {
    this.selectedQuestion = this.castQuestion();
    this._spinnerService.show();
    this._teacherEvalService.post('questions', {
      question: this.selectedQuestion,
      evaluation_type: this.selectedQuestion.evaluation_type,
      type: this.selectedQuestion.type,
      status: this.selectedQuestion.status,
    }).subscribe(
      response => {
        this.questions.unshift(this.selectedQuestion);
        this._spinnerService.hide();
        this._messageService.add({
          key: 'tst',
          severity: 'success',
          summary: 'Se creó correctamente',
          detail: this.selectedQuestion.name,
          life: 5000
        });
        this.displayFormQuestion = false;
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

  updateQuestion() {
    this.selectedQuestion = this.castQuestion();
    this._spinnerService.show();
    this._teacherEvalService.update('questions/' + this.selectedQuestion.id, {
      question: this.selectedQuestion,
      evaluation_type: this.selectedQuestion.evaluation_type,
      type: this.selectedQuestion.type,
      status: this.selectedQuestion.status,
    }).subscribe(
      response => {
        this._spinnerService.hide();
        this._messageService.add({
          key: 'tst',
          severity: 'success',
          summary: 'Se actualizó correctamente',
          detail: this.selectedQuestion.name,
          life: 5000
        });
        this.displayFormQuestion = false;
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

  deleteQuestion(question: Question) {
    this._confirmationService.confirm({
      header: 'Delete ' + question.name,
      message: 'Are you sure to delete?',
      acceptButtonStyleClass: 'ui-button-danger',
      rejectButtonStyleClass: 'ui-button-secondary',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      icon: 'pi pi-trash',
      accept: () => {
        this._spinnerService.show();
        this._teacherEvalService.delete('questions/' + question.id).subscribe(
          response => {
            const indiceUser = this.questions
              .findIndex(element => element.id === question.id);
            this.questions.splice(indiceUser, 1);
            this._spinnerService.hide();
            this._messageService.add({
              key: 'tst',
              severity: 'success',
              summary: 'Se eliminó correctamente',
              detail: question.name,
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

  castQuestion(): Question {
    return {
      id: this.formQuestion.controls['id'].value,
      code: this.formQuestion.controls['code'].value,
      order: this.formQuestion.controls['order'].value,
      name: this.formQuestion.controls['name'].value,
      description: this.formQuestion.controls['description'].value,
      evaluation_type: { id: this.formQuestion.controls['evaluation_type_id'].value },
      type: { id: this.formQuestion.controls['type_id'].value },
      status: { id: this.formQuestion.controls['status_id'].value },
    } as Question;
  }

}