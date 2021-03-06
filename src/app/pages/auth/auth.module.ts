// Angular Modules
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AuthRoutes} from './auth.routing';

// PrimeNG Modules
import {PasswordModule} from 'primeng/password';
import {ButtonModule} from 'primeng/button';
import {MessagesModule} from 'primeng/messages';
import {InputTextModule} from 'primeng/inputtext';
import {MessageModule} from 'primeng/message';
import {DropdownModule} from 'primeng/dropdown';
import {ConfirmationService, MessageService} from 'primeng/api';

// My Components
import {AppNotfoundComponent} from './app.notfound.component';
import {AppAccessdeniedComponent} from './app.accessdenied.component';
import {AppErrorComponent} from './app.error.component';
import {TooltipModule} from 'primeng/tooltip';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { PasswordForgotComponent } from './password-forgot/password-forgot.component';
import {AppLoginComponent} from './login/app.login.component';
import {AutoCompleteModule} from 'primeng/autocomplete';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AuthRoutes),
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        PasswordModule,
        ButtonModule,
        MessagesModule,
        MessageModule,
        DropdownModule,
        TooltipModule,
        AutoCompleteModule,
    ],
    declarations: [
        AppNotfoundComponent,
        AppAccessdeniedComponent,
        AppErrorComponent,
        AppLoginComponent,
        PasswordResetComponent,
        PasswordForgotComponent,
    ],
    providers: [ConfirmationService, MessageService]
})
export class AuthModule {
}
