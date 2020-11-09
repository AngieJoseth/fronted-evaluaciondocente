import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherEvalRoutingModule } from './teacher-eval-routing.module';
import { EvaluationTypeComponent } from './evaluation-type/evaluation-type.component';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { QuestionComponent } from './question/question.component';
import { AnswerComponent } from './answer/answer.component';


import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// PrimeNg
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {CardModule} from 'primeng/card';
import {MessageModule} from 'primeng/message';
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ToastModule} from 'primeng/toast';
import {TableModule} from 'primeng/table';
import {ConfirmationService, MessageService} from 'primeng/api';
import {TooltipModule} from 'primeng/tooltip';
import {TabViewModule} from 'primeng/tabview';

@NgModule({
  declarations: [EvaluationTypeComponent, QuestionComponent, AnswerComponent, EvaluationComponent],
  imports: [
    CommonModule,
    TeacherEvalRoutingModule,
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    CardModule,
    MessageModule,
    DropdownModule,
    ReactiveFormsModule,
    ButtonModule,
    DialogModule,
    ConfirmDialogModule,
    ToastModule,
    TableModule,
    TooltipModule,
    TabViewModule
  ],
  providers: [ConfirmationService, MessageService]

})
export class TeacherEvalModule { }
