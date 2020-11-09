import {State} from '../ignug/models.index';
import {EvaluationType} from '../teacher-eval/models.index';
import {Teacher} from '../ignug/models.index';

export class Evaluation{
    id?: number;
    result: number;
    evaluation?: EvaluationType;
    teacher?: Teacher;
    state?: State;
}