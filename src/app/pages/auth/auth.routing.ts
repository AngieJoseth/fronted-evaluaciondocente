// Angular Router
import {Routes} from '@angular/router';

// My Components
import {AppNotfoundComponent} from './app.notfound.component';
import {AppAccessdeniedComponent} from './app.accessdenied.component';
import {AppErrorComponent} from './app.error.component';
import {PasswordResetComponent} from './password-reset/password-reset.component';
import {PasswordForgotComponent} from './password-forgot/password-forgot.component';
import {AppLoginComponent} from './login/app.login.component';

export const AuthRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'not-found',
                component: AppNotfoundComponent
            },
            {
                path: 'access-denied',
                component: AppAccessdeniedComponent
            },
            {
                path: 'error',
                component: AppErrorComponent
            },
            {
                path: 'login',
                component: AppLoginComponent
            },
            {
                path: 'password-reset',
                component: PasswordResetComponent
            },
            {
                path: 'password-forgot',
                component: PasswordForgotComponent
            }
        
        ]
    }
];
