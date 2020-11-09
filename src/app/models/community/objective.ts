import {Catalogue, State} from '../ignug/models.index';

export interface Objective {
    id?:number;
    parent?:Objective;
    indicator?: string;
    medio_verificacion?: string // cambiar a ingles;
    type?: Catalogue;
    children?: Objective[];
    state?: State; // todos llevan state
}
