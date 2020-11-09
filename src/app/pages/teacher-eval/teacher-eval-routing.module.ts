import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AnswerComponent} from './answer/answer.component';
import {QuestionComponent} from './question/question.component';
import {EvaluationTypeComponent} from './evaluation-type/evaluation-type.component';
import {EvaluationComponent} from './evaluation/evaluation.component';

const routes: Routes = [
  {
    path: 'evaluation-types',
    component: EvaluationTypeComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'evaluations',
    component: EvaluationComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'answers',
    component: AnswerComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'questions',
    component: QuestionComponent,
    // canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherEvalRoutingModule { }

