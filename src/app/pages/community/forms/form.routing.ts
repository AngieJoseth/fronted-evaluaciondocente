import {Routes} from '@angular/router';
import { FormsComponent } from './form.component';

export const FormRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: FormsComponent
            }]
    }
];
