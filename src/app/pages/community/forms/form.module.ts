import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {DataViewModule} from 'primeng/dataview';
import {PanelModule} from 'primeng/panel';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {CalendarModule} from 'primeng/calendar';
import {AccordionModule} from 'primeng/accordion';
import {ListboxModule} from 'primeng/listbox';
import {MultiSelectModule} from 'primeng/multiselect';
import {FileUploadModule} from 'primeng/fileupload';
import {TableModule} from 'primeng/table';
import {StepsModule} from 'primeng/steps';
import {DialogModule} from 'primeng/dialog';
import {AutoCompleteModule} from 'primeng/autocomplete';

import { from } from 'rxjs';

// COMPONENTES
import { FormRoutes } from './form.routing';
import { ProjectInfoComponent } from './project-Info/project-info.component';
import { FormsComponent } from './form.component';
import { AcademicStatusComponent } from './academic-status/academic-status.component';
import { BeneficiaryInstitutionComponent } from './beneficiary-institution/beneficiary-institution.component';
import { ContextualizacionComponent } from './contextualizacion/contextualizacion.component';
import { ParticipantsComponent } from './participants/participants.component';
import { ActividadesComponent } from './actividades/actividades.component';
import { CronogramasComponent } from './cronogramas/cronogramas.component';
import { ObservationsComponent } from './observations/observations.component'
import {CommunityService} from '../../../services/community/community.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(FormRoutes),
        DataViewModule,
        PanelModule,
        InputTextModule,
        ButtonModule,
        TabViewModule,
        DropdownModule,
        FormsModule,
        RadioButtonModule,
        InputTextareaModule,
        CalendarModule,
        AccordionModule,
        ListboxModule,
        MultiSelectModule,
        TableModule,
        FileUploadModule,
        StepsModule,
        DialogModule,
        AutoCompleteModule,
        ReactiveFormsModule,
    ],
    declarations: [
        ProjectInfoComponent,
        FormsComponent,
        AcademicStatusComponent,
        BeneficiaryInstitutionComponent,
        ContextualizacionComponent,
        ParticipantsComponent,
        ActividadesComponent,
        CronogramasComponent,
        ObservationsComponent,
    ],
    providers: [],
})
export class FormModule {
}
