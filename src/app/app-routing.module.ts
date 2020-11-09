// Angular Modules
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';

// Angular Components
import {AppMainComponent} from './shared/app.main.component';
import {AppBlankComponent} from './shared/app.blank.component';

// AuthGuard
import {AuthGuard} from './shared/auth.guard';
import {AppCrudComponent} from './pages/crud/app.crud.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppMainComponent,
                children: [
                    {
                        path: '',
                        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
                        canActivate: [AuthGuard]
                    },
                    {
                        path: 'dashboard',
                        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
                        canActivate: [AuthGuard]
                    },
                    {
                        path: 'crud',
                        component: AppCrudComponent,
                        canActivate: [AuthGuard]
                    },
                    {
                        path: 'community',
                        loadChildren: () => import('./pages/community/community.module').then(m => m.CommunityModule),
                        canActivate: [AuthGuard]
                    },
                    {
                        path: 'profile',
                        loadChildren: () => import('./pages/auth/profile/profile.module').then(m => m.ProfileModule),
                        canActivate: [AuthGuard]
                    },
                    {
                        path: 'teacher-eval',
                        loadChildren: () => import('./pages/teacher-eval/teacher-eval.module').then(m => m.TeacherEvalModule),
                        canActivate: [AuthGuard]
                    },
                ]
            },
            {
                path: 'auth',
                component: AppBlankComponent,
                loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
            },
            {path: '**', redirectTo: '/auth/not-found'},
        ], {scrollPositionRestoration: 'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
