import {Catalogue} from '../ignug/catalogue'

export interface EvaluationType {
    id?: number;
    code?: string;
    name?: string;
    percentage?: number;
    global_percentage?: number;
    parent_code?: Catalogue;
    state?: Catalogue;
    
   

}
