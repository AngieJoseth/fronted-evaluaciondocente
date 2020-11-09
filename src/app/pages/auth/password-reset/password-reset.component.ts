import {Component, OnInit} from '@angular/core';
import {ConfirmationService, Message} from 'primeng/api';
import {User} from '../../../models/auth/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth/auth.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ActivatedRoute, Router} from '@angular/router';
import {delay} from 'rxjs/operators';

@Component({
    selector: 'app-password-reset',
    templateUrl: './password-reset.component.html',
    styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {
    dark: boolean;
    checked: boolean;
    msgs: Message[];
    user: User;
    formPasswordReset: FormGroup;
    flagShowPassword: boolean;
    
    constructor(private _authService: AuthService,
                private _spinner: NgxSpinnerService,
                private _router: Router,
                private _fb: FormBuilder,
                private _activatedRoute: ActivatedRoute,
                private _confirmationService: ConfirmationService) {
    }
    
    ngOnInit(): void {
        this.buildFormPasswordReset();
    }
    
    buildFormPasswordReset() {
        this.formPasswordReset = this._fb.group({
            token: [this._activatedRoute.snapshot.queryParams.token, Validators.required],
            username: [this._activatedRoute.snapshot.queryParams.username, Validators.required],
            password: ['12345678', [Validators.required, Validators.minLength(6)]],
            password_confirm: ['12345678', [Validators.required, Validators.minLength(6)]],
        });
    }
    
    onSubmitResetPassword(event: Event) {
        event.preventDefault();
        if (this.formPasswordReset.valid) {
            this.resetPassword();
        } else {
            this.formPasswordReset.markAllAsTouched();
        }
    }
    
    resetPassword() {
        if (this.checkPasswords()) {
            this.msgs = [];
            this._spinner.show();
            const credentials = {
                password: this.formPasswordReset.controls['password'].value,
                password_confirm: this.formPasswordReset.controls['password_confirm'].value,
                token: this.formPasswordReset.controls['token'].value,
            };
            this._authService.resetPassword(credentials).subscribe(
                response => {
                    this._spinner.hide();
                    this.msgs = [{
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Change Password'
                    }];
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
                    if (error.status === 400) {
                        this.msgs = [{
                            severity: 'error',
                            summary: error.error.detail,
                            detail: 'El token no es válido'
                        }];
                        return;
                    }
                    if (error.status === 403) {
                        this.msgs = [{
                            severity: 'error',
                            summary: error.error.detail,
                            detail: 'El token ya fue utilizado o expiró el tiempo de uso'
                        }];
                        return;
                    }
                    if (error.status === 404) {
                        this.msgs = [{
                            severity: 'error',
                            summary: error.error.detail,
                            detail: 'El usuario no fue encontrado'
                        }];
                    }
                });
        }
    }
    
    checkPasswords() {
        return this.formPasswordReset.controls['password'].value === this.formPasswordReset.controls['password_confirm'].value;
    }
}
