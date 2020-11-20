import {State} from '../ignug/models.index';
import {EvaluationType} from '../teacher-eval/models.index';
import {Catalogue} from '../ignug/models.index';
import {Teacher} from '../ignug/models.index';

export interface Evaluation{
    id?: number;
    result?: number;
    evaluation_type?: EvaluationType;
    teacher?: Teacher;
    evaluators?: Teacher[];
    state?: State;
    status?: Catalogue;
}
