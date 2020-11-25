import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../shared/breadcrumb.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TeacherEvalService } from '../../../services/teacher-eval/teacher-eval.service';
import { TranslateService } from '@ngx-translate/core';
import { EVALUATION_TYPES } from 'src/environments/catalogues';
@Component({
  selector: 'app-evaluation-result',
  templateUrl: './evaluation-result.component.html',
  styleUrls: ['./evaluation-result.component.scss']
})
export class EvaluationResultComponent implements OnInit {

  evaluations: any[];
  colsEvaluationResult: any[];

  constructor(private _breadcrumbService: BreadcrumbService,
    private _spinnerService: NgxSpinnerService,
    private _teacherEvalService: TeacherEvalService,
    private _translate: TranslateService,
  ) {
    this._breadcrumbService.setItems([
      { label: 'evaluationResults' }
    ]);

  }

  ngOnInit(): void {

    this.setColsEvaluationResult();
    this.getEvaluations();

  }

  setColsEvaluationResult() {
    this._translate.stream('CODE').subscribe(response => {
      this.colsEvaluationResult = [
        { field: 'selfEvaluation', header: this._translate.instant('SELF EVALUATION') },
        { field: 'pairEvaluation', header: this._translate.instant('PAIR EVALUATION') },
        { field: 'studentEvaluation', header: this._translate.instant('STUDENT EVALUATION') },
        { field: 'authorityEvaluation', header: this._translate.instant('AUTHORITY EVALUATION') },
      ];
    });

  }

  getEvaluations(): void {
    let evalSelf : number = 0
    let evalPair : number = 0
    let evalStudent : number = 0
    let evalAuthority : number = 0
    this._spinnerService.show();
    this._teacherEvalService.get('evaluations').subscribe(
      response => {
        this._spinnerService.hide();
          response['data'].forEach(evaluation => {
            if (evaluation.evaluation_type.code == EVALUATION_TYPES.SELF_TEACHING || evaluation.evaluation_type.code == EVALUATION_TYPES.SELF_MANAGEMENT) {
              evalSelf += parseFloat(evaluation.result)
            } else if (evaluation.evaluation_type.code == EVALUATION_TYPES.PAIR_TEACHING || evaluation.evaluation_type.code == EVALUATION_TYPES.PAIR_MANAGEMENT) {
              evalPair += parseFloat(evaluation.result)
            } else if (evaluation.evaluation_type.code == EVALUATION_TYPES.STUDENT_TEACHING || evaluation.evaluation_type.code == EVALUATION_TYPES.STUDENT_MANAGEMENT) {
              evalStudent += parseFloat(evaluation.result)
            } else if (evaluation.evaluation_type.code == EVALUATION_TYPES.AUTHORITY_TEACHING || evaluation.evaluation_type.code == EVALUATION_TYPES.AUTHORITY_MANAGEMENT) {
              evalAuthority += parseFloat(evaluation.result)
            }
  
          })
          this.evaluations = [
            {
              selfEvaluation: evalSelf.toFixed(2),
              pairEvaluation: evalPair.toFixed(2),
              studentEvaluation: evalStudent.toFixed(2),
              authorityEvaluation: evalAuthority.toFixed(2)
            }]
      }, error => {
        this._spinnerService.hide();
        this.evaluations = [
          {
            selfEvaluation: evalSelf.toFixed(2),
            pairEvaluation: evalPair.toFixed(2),
            studentEvaluation: evalStudent.toFixed(2),
            authorityEvaluation: evalAuthority.toFixed(2)
          }]
      }
      );
  }

}
