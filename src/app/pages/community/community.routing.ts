import { Routes } from '@angular/router';
import { ProjectsComponent } from './projects/projects-list.component';
import { FormsComponent } from './forms/form.component'

export const CommunityRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'projects',
                component: ProjectsComponent
            },
            {
                path: 'forms',
                loadChildren: () => import('./forms/form.module').then(m => m.FormModule)
            },
        ]
    }
];

// community/projcts
// community/forms
