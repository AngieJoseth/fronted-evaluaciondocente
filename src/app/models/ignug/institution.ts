import {State} from '../ignug/models.index';

export interface Institution {
    id?: number;
    acronym?: string;
    denomination?: string;
    name?: string;
    slogan?: string;
    logo?: string;
    state?: State;
   
    
}
