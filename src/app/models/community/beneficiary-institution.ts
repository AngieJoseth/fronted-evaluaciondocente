import {Addreess} from '../ignug/address';
import {State} from '../ignug/state';

export interface BeneficiaryInstitution {
    id?:number;
    logo?: string;
    files?:File[];
    name?: string;
    address?: Addreess; // con calles
    function?: string;
    state?: State; // todos llevan state
}
