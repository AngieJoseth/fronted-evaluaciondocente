import {Catalogue} from '../ignug/models.index';

export interface Participant {
    id?:number;
    function?:Catalogue;
    // SOLO DOCENTE
    position?: string; // revisar en la base
    working_hours?: number;
}
