import {Catalogue} from '../ignug/catalogue'

export class EvaluationType {
    id: number;
    code: string;
    name: string;
    percentage: number;
    global_percentage: number;
    parent_code?: Catalogue;
    state?: Catalogue;
    
    
    constructor() {
        this.id = 0;
    }

}
