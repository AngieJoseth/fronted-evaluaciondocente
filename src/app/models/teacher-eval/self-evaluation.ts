import { AnswerQuestion } from './answer-question';
import {Teacher} from '../ignug/models.index'

export interface SelfEvaluation {
    id?: number;
    teacher?: Teacher;
    answer_questions?: AnswerQuestion[];
}