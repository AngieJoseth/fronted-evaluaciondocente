import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfirmationService, Message} from 'primeng/api';

@Component({
    selector: 'app-password-forgot',
    templateUrl: './password-forgot.component.html',
    styleUrls: ['./password-forgot.component.scss']
})
export class PasswordForgotComponent implements OnInit {
    dark: boolean;
    checked: boolean;
    msgs: Message[];
    formPasswordReset: FormGroup;
    
    constructor(private _authService: AuthService,
                private _spinner: NgxSpinnerService,
                private _router: Router,
                private _fb: FormBuilder,
                private _confirmationService: ConfirmationService) {
    }
    
    ngOnInit(): void {
        this.buildFormPasswordReset();
    }
    
    buildFormPasswordReset() {
        this.formPasswordReset = this._fb.group({
            username: ['1234567890', Validators.required]
        });
    }
    
    onSubmitForgotPassword(event: Event) {
        event.preventDefault();
        if (this.formPasswordReset.valid) {
            this.forgotPassword();
        } else {
            this.formPasswordReset.markAllAsTouched();
        }
    }
    
    forgotPassword() {
        this._spinner.show();
        this._authService.forgotPassword(this.formPasswordReset.controls['username'].value).subscribe(response => {
            this.msgs = [{
                severity: 'info',
                summary: 'Check your email:',
                detail: response['data']
            }];
            this._spinner.hide();
        }, error => {
            this._spinner.hide();
            if (error.status === 500) {
                this.msgs = [{
                    severity: 'error',
                    summary: 'Oops! Problemas con el servidor',
                    detail: 'Vuelve a intentar más tarde'
                }];
                return;
            }
            if (error.status === 404) {
                this.msgs = [{
                    severity: 'error',
                    summary: error.error.detail,
                    detail: 'El usuario no fue encontrado'
                }];
            } else {
                this.msgs = [{
                    severity: 'error',
                    summary: error.error.detail,
                    detail: 'Intenta de nuevo más tarde'
                }];
            }
            
        });
    }
}
