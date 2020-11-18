import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../shared/breadcrumb.service';
import { MessageService } from 'primeng/api';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { TeacherEvalService } from '../../../services/teacher-eval/teacher-eval.service';
import { TranslateService } from '@ngx-translate/core';
import { SelfEvaluation } from 'src/app/models/teacher-eval/self-evaluation';
import { EVALUATION_TYPES } from 'src/environments/catalogues';


@Component({
    selector: 'app-self-evaluation',
    templateUrl: './self-evaluation.component.html',
    styleUrls: ['./self-evaluation.component.scss']
})
export class SelfEvaluationComponent implements OnInit {

    status: any[];
    formSelfEvaluation: FormGroup;
    questionsTeaching: any[];
    questionsManagement: any[];
    selfEvaluation: SelfEvaluation;
    selectedSelfEvaluation: SelfEvaluation;
    displayFormSelEvaluation: boolean;

    constructor(private _breadcrumbService: BreadcrumbService,
        private _fb: FormBuilder,
        private _spinnerService: NgxSpinnerService,
        private _teacherEvalService: TeacherEvalService,
        private _messageService: MessageService,
        private _translate: TranslateService
    ) {
        this._breadcrumbService.setItems([
            { label: 'selfEvaluations' }
        ]);

        this.questionsTeaching = [];
        this.questionsManagement = [];

        this.buildformSelfEvaluation();

    }

    ngOnInit(): void {

        this.getQuestions();

    }

    getQuestions(): void {
        this._spinnerService.show();
        this.displayFormSelEvaluation = false;
        this._teacherEvalService.get('types_questions/self_evaluations').subscribe(
            response => {
                this._spinnerService.hide();
                this.displayFormSelEvaluation = true;

                response['data'].map(question => {
                    if (question.evaluation_type_id == EVALUATION_TYPES.SELF_TEACHING) {
                        this.questionsTeaching.push(question)
                    } else if (question.evaluation_type_id == EVALUATION_TYPES.SELF_MANAGEMENT) {
                        this.questionsManagement.push(question)
                    }
                })

                this.questionsTeaching.map(question => {
                    this.teachingArray.push(new FormControl("", Validators.required));
                })

                this.questionsManagement.map(question => {
                    this.managementArray.push(new FormControl("", Validators.required));
                })

            }, error => {
                this._spinnerService.hide();
                this._messageService.add({
                    key: 'tst',
                    severity: 'error',
                    summary: error.error.msg.summary,
                    detail:  error.error.msg.detail,
                    life: 5000
                });
            });
    }

    buildformSelfEvaluation() {
        this.formSelfEvaluation = this._fb.group({
            id: [''],
            teacher_id: ['', Validators.required],
            teachingArray: new FormArray([]),
            managementArray: new FormArray([])
        });
    }
    get teachingArray() {
        return this.formSelfEvaluation.get('teachingArray') as FormArray;
    }
    get managementArray() {
        return this.formSelfEvaluation.get('managementArray') as FormArray;
    }
    onSubmitSelfEvaluation(event: Event) {
        event.preventDefault();
        if (this.formSelfEvaluation.valid) {
            this.createSelfEvaluationTeaching();
            this.createSelfEvaluationManagement();

        } else {
            this.formSelfEvaluation.markAllAsTouched();
        }

    }

    createSelfEvaluationTeaching() {
        this.selectedSelfEvaluation = this.castSelfEvaluationTeaching();
        this._spinnerService.show();
        this._teacherEvalService.post('self_evaluations', {
            teacher: this.selectedSelfEvaluation.teacher,
            answer_questions: this.selectedSelfEvaluation.answer_questions
        }).subscribe(
            response => {
                this._spinnerService.hide();
                this.formSelfEvaluation.reset();
                this._messageService.add({
                    key: 'tst',
                    severity: 'success',
                    summary: response['msg']['summary'],
                    detail:  response['msg']['detail'],
                    life: 5000
                });
            }, error => {
                this._spinnerService.hide();
                this._messageService.add({
                    key: 'tst',
                    severity: 'error',
                    summary: error.error.msg.summary,
                    detail:  error.error.msg.detail,
                    life: 5000
                });
            });
    }
    createSelfEvaluationManagement() {
        this.selectedSelfEvaluation = this.castSelfEvaluationManagement();
        this._spinnerService.show();
        this._teacherEvalService.post('self_evaluations', {
            teacher: this.selectedSelfEvaluation.teacher,
            answer_questions: this.selectedSelfEvaluation.answer_questions
        }).subscribe(
            response => {
                this._spinnerService.hide();
                this.formSelfEvaluation.reset();
                this._messageService.add({
                    key: 'tst',
                    severity: 'success',
                    summary: response['msg']['summary'],
                    detail:  response['msg']['detail'],
                    life: 5000
                });
            }, error => {
                this._spinnerService.hide();
                this._messageService.add({
                    key: 'tst',
                    severity: 'error',
                    summary: error.error.msg.summary,
                    detail: error.error.msg.detail,
                    life: 5000
                });
            });
    }

    castSelfEvaluationTeaching(): SelfEvaluation {
        return {
            id: this.formSelfEvaluation.controls['id'].value,
            teacher: { id: this.formSelfEvaluation.controls['teacher_id'].value },
            answer_questions: this.formSelfEvaluation.controls['teachingArray'].value.map((answer_question_id: any) => {
                return { id: answer_question_id }
            }),

        } as SelfEvaluation;
    }
    castSelfEvaluationManagement(): SelfEvaluation {
        return {
            id: this.formSelfEvaluation.controls['id'].value,
            teacher: { id: this.formSelfEvaluation.controls['teacher_id'].value },
            answer_questions: this.formSelfEvaluation.controls['managementArray'].value.map((answer_question_id: any) => {
                return { id: answer_question_id }
            }),

        } as SelfEvaluation;
    }

}
