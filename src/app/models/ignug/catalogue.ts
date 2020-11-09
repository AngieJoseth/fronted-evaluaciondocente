import {State} from '../ignug/models.index';

export interface Catalogue {
    id?: number;
    parent_code?: Catalogue;
    code?: string;
    name?: string;
    type?: string;
    icon?: string;
    state?: State;
    tasks?: Array<Catalogue>;

}
