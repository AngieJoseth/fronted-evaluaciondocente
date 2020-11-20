import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AnswerComponent} from './answer/answer.component';
import {QuestionComponent} from './question/question.component';
import {EvaluationTypeComponent} from './evaluation-type/evaluation-type.component';
import {EvaluationComponent} from './evaluation/evaluation.component';
import { SelfEvaluationComponent } from './self-evaluation/self-evaluation.component';
import { StudentEvaluationComponent } from './student-evaluation/student-evaluation.component';

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
  },
  {
    path: 'self-evaluations',
    component: SelfEvaluationComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'student-evaluations',
    component: StudentEvaluationComponent,
    // canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherEvalRoutingModule { }

