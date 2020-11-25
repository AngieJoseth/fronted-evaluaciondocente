import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../shared/breadcrumb.service';
import { MessageService } from 'primeng/api';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { TeacherEvalService } from '../../../services/teacher-eval/teacher-eval.service';
import { TranslateService } from '@ngx-translate/core';
import { SelfEvaluation } from 'src/app/models/teacher-eval/self-evaluation';
import { EVALUATION_TYPES } from 'src/environments/catalogues';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';


@Component({
    selector: 'app-self-evaluation',
    templateUrl: './self-evaluation.component.html',
    styleUrls: ['./self-evaluation.component.scss']
})
export class SelfEvaluationComponent implements OnInit {

    formSelfEvaluation: FormGroup;
    questionsTeaching: any[];
    questionsManagement: any[];
    selfEvaluation: SelfEvaluation;
    selectedSelfEvaluationTeaching: SelfEvaluation;
    selectedSelfEvaluationManagement: SelfEvaluation;
    displayFormSelEvaluation: boolean;
    displayNote: boolean;
    userLogged: number;


    constructor(private _breadcrumbService: BreadcrumbService,
        private _fb: FormBuilder,
        private _spinnerService: NgxSpinnerService,
        private _teacherEvalService: TeacherEvalService,
        private _messageService: MessageService,
        private _translate: TranslateService,
        private _router: Router
    ) {
        this._breadcrumbService.setItems([
            { label: 'selfEvaluations' }
        ]);

        this.questionsTeaching = [];
        this.questionsManagement = [];

        this.buildformSelfEvaluation();

    }

    ngOnInit(): void {
        this.userLogged = JSON.parse(localStorage.getItem('user')).id;
        this.getEvaluations();
        this.getQuestions();

    }

    getQuestions(): void {
        this._spinnerService.show();
        this.displayFormSelEvaluation = false;
        this._teacherEvalService.get('types_questions/self_evaluations').subscribe(
            response => {
                this._spinnerService.hide();
                this.displayFormSelEvaluation = true;

                response['data'].map((question: any) => {
                    if (question.evaluation_type.code == EVALUATION_TYPES.SELF_TEACHING) {
                        this.questionsTeaching.push(question)
                    } else if (question.evaluation_type.code == EVALUATION_TYPES.SELF_MANAGEMENT) {
                        this.questionsManagement.push(question)
                    }
                })

                this.questionsTeaching.map(question => {
                    this.teachingArray.push(new FormControl("", Validators.required));
                })

                this.questionsManagement.map(question => {
                    this.managementArray.push(new FormControl("", Validators.required));
                })

            }
        );
    }

    showNoteEvaluation(): void {
        this._router.navigate(['/teacher-eval/evaluation-results'])
    }

    getEvaluations(): void {
        this._spinnerService.show();
        this._teacherEvalService.get('evaluations').subscribe(
            response => {
                this._spinnerService.hide();
                response['data'].map((evaluation: any) => {
                    if (evaluation.teacher_id == this.userLogged
                         && evaluation.evaluation_type.code==EVALUATION_TYPES.SELF_TEACHING
                         ||evaluation.evaluation_type.code==EVALUATION_TYPES.SELF_TEACHING) {
                        this.showNoteEvaluation()
                    } else {
                        this.displayNote = false
                    }
                })

            });
    }

    buildformSelfEvaluation() {
        this.formSelfEvaluation = this._fb.group({
            id: [''],
            teacher_id: [''],
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
            this.createSelfEvaluation();
        } else {
            this.formSelfEvaluation.markAllAsTouched();
        }
    }

    createSelfEvaluation() {

        this.selectedSelfEvaluationTeaching = this.castSelfEvaluationTeaching();
        this.selectedSelfEvaluationManagement = this.castSelfEvaluationManagement();
        this._spinnerService.show();

        const teachingEval = this._teacherEvalService.post('self_evaluations', {
            teacher: this.selectedSelfEvaluationTeaching.teacher,
            answer_questions: this.selectedSelfEvaluationTeaching.answer_questions
        })
        const managementEval = this._teacherEvalService.post('self_evaluations', {
            teacher: this.selectedSelfEvaluationManagement.teacher,
            answer_questions: this.selectedSelfEvaluationManagement.answer_questions
        })

        forkJoin([teachingEval, managementEval]).subscribe(

            response => {

                this._spinnerService.hide();
                this.formSelfEvaluation.reset();
                this.showNoteEvaluation()

            }, error => {

                this._spinnerService.hide();
                this._messageService.add({
                    key: 'tst',
                    severity: 'error',
                    summary: 'Intenta de nuevo',
                    detail: 'AutoEvaluación no creada',
                    life: 5000

                });
            }
        );
    }

    castSelfEvaluationTeaching(): SelfEvaluation {
        return {
            id: this.formSelfEvaluation.controls['id'].value,
            teacher: { id: this.userLogged },
            answer_questions: this.formSelfEvaluation.controls['teachingArray'].value.map((answer_question_id: any) => {
                return { id: answer_question_id }
            }),

        } as SelfEvaluation;
    }
    castSelfEvaluationManagement(): SelfEvaluation {
        return {
            id: this.formSelfEvaluation.controls['id'].value,
            teacher: { id: this.userLogged },
            answer_questions: this.formSelfEvaluation.controls['managementArray'].value.map((answer_question_id: any) => {
                return { id: answer_question_id }
            }),

        } as SelfEvaluation;
    }

}
