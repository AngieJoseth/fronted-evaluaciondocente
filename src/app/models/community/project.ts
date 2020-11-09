import {Catalogue, Career} from '../ignug/models.index';
import {Participant, Objective, BeneficiaryInstitution} from '../community/models.index';

export interface Project {
    id?: number;
    name?: string;
    // nuevo campo 
    state?: Catalogue;
    code?: string;
    assigned_line?: Catalogue; // linea de investigacion
    field?: Catalogue;
    career?: Career;
    aim?: string; // objeto
    cycle?: string; // ciclo
    location: Catalogue; // trae la parroquia y con eso saca los demas campos 
    lead_time: number; // plazo de ejecucion
    delivery_date: Date;
    start_date: Date;
    end_date: Date;
    introduction: string;
    situational_analysis: string;
    foundamentation: string;
    justification: string;
    frequency_activities: Catalogue; 
    bonding_activities: Catalogue[]; // activiades de vinculacion 
    strategic_axes: Catalogue[]; // ejes estrategicos
    application_areas: Catalogue[]; // areas de aplicacion 
    description: string; 
    participants: Participant[];
    objectives: Objective[];
    beneficiary_institution: BeneficiaryInstitution;
    observations: string[]; // REVISION (EN ESPERA)


    // por proyecto fuera de modelos 
    // institucion beneficiaria 
    // nombre representante legal 
    // ruc o ccedula representante legal 
    coordinator_name: string; 
    coordinator_postition: string;
    coordinator_funtion: string;
    
    direct_beneficiaries: string;
    indirect_beneficiaries: string;
}
