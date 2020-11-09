import {Component} from '@angular/core';
import {ConfirmationService, Message} from 'primeng/api';
import {Permission, Role, User} from '../../../models/auth/models.index';
import {AuthService} from '../../../services/auth/auth.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Router} from '@angular/router';
import {IgnugService} from '../../../services/ignug/ignug.service';
import {environment} from '../../../../environments/environment';
import {FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {Institution} from '../../../models/ignug/models.index';
import {ROLES, STATES, SYSTEMS} from '../../../../environments/catalogues';

@Component({
    selector: 'app-login',
    templateUrl: './app.login.component.html',
    styleUrls: ['./login.component.scss']
})
export class AppLoginComponent {
    dark: boolean;
    checked: boolean;
    msgs: Message[];
    user: User;
    formLogin: FormGroup;
    formPasswordReset: FormGroup;
    formInstitutionRole: FormGroup;
    formChangePassword: FormGroup;
    roles: Role[];
    institutions: Institution[];
    permissions: Permission[];
    flagShowPassword: boolean;
    flagShowPasswordReset: boolean;
    STORAGE_URL: string = environment.STORAGE_URL;
    flagChangePassword: boolean;
    
    constructor(private authService: AuthService,
                private ignugService: IgnugService,
                private spinner: NgxSpinnerService,
                private router: Router,
                private _fb: FormBuilder,
                private _confirmationService: ConfirmationService) {
        this.buildFormLogin();
        this.buildFormInstitutionRole();
        this.buildFormChangePassword();
        this.roles = [];
        this.institutions = [];
        this.user = {};
    }
    
    buildFormLogin() {
        this.formLogin = this._fb.group({
            username: ['1234567890', Validators.required],
            password: ['12345678', Validators.required],
        });
    }
    
    buildFormChangePassword() {
        this.formChangePassword = this._fb.group({
            new_password: ['12345678', [Validators.required, Validators.minLength(6)]],
            password_confirm: ['12345678', [Validators.required, Validators.minLength(6)]],
        });
    }
    
    checkPasswords() {
        return this.formChangePassword.controls['new_password'].value === this.formChangePassword.controls['password_confirm'].value;
    }
    
    buildFormInstitutionRole() {
        this.formInstitutionRole = this._fb.group({
            institution: ['', Validators.required],
            role: ['', Validators.required],
        });
    }
    
    onLoggedin() {
        this.msgs = [];
        const credentials = {
            client_id: environment.CLIENT_ID,
            client_secret: environment.CLIENT_SECRET,
            grant_type: environment.GRANT_TYPE,
            username: this.formLogin.controls['username'].value,
            password: this.formLogin.controls['password'].value
        };
        this.spinner.show();
        this.authService.login(credentials).subscribe(
            response => {
                localStorage.setItem('token', JSON.stringify(response));
                this.getUser();
            }, error => {
                this.spinner.hide();
                this.removeLogin();
                if (error.status === 0) {
                    this.msgs = [{
                        severity: 'error',
                        summary: 'Oops! Problemas con el servidor',
                        detail: 'Vuelve a intentar más tarde'
                    }];
                } else {
                    this.msgs = [{
                        severity: 'error',
                        summary: 'Credenciales no válidas',
                        detail: 'Usuario y/o contraseña incorrectas'
                    }];
                }
            });
    }
    
    getUser() {
        this.authService.getUser(this.formLogin.controls['username'].value).subscribe(
            response => {
                this.spinner.hide();
                let errors = false;
                this.user = response['data'];
                this.roles = this.user['roles'];
                this.institutions = this.user['institutions'];
                this.msgs = [];
                // Error cuando el usuario no esta activo para el sistema
                if (this.user.state.code !== STATES.ACTIVE) {
                    this.removeLogin();
                    // Error cuando el usuario esta inactivo
                    if (response['user']['state']['code'] === STATES.INACTIVE) {
                        this.msgs.push({
                            severity: 'error',
                            summary: 'Tú usuario se encuentra INACTIVO',
                            detail: 'Comunícante con el Administrador!'
                        });
                        errors = true;
                    }
                    // Error cuando el usuario esta eliminad
                    if (response['user']['state']['code'] === STATES.DELETED) {
                        this.msgs.push({
                            severity: 'error',
                            summary: 'Tú usuario se encuentra ELIMINADO',
                            detail: 'Comunícante con el Administrador!'
                        });
                        errors = true;
                    }
                    // Error cuando el usuario esta bloqueado
                    if (response['user']['state']['code'] === STATES.LOCKED) {
                        this.msgs.push({
                            severity: 'error',
                            summary: 'Tú usuario se encuentra BLOQUEADO',
                            detail: 'Comunícante con el Administrador!'
                        });
                        errors = true;
                    }
                }
                // Error cuando no tiene asiganda una institucion
                if (this.institutions.length === 0) {
                    this.removeLogin();
                    this.msgs.push({
                        severity: 'warn',
                        summary: 'No tienes una institucion asignada!',
                        detail: 'Comunícate con el administrador!'
                    });
                    errors = true;
                }
                // Error cuando no tiene asigando roles
                if (this.roles.length === 0) {
                    this.msgs.push({
                        severity: 'warn',
                        summary: 'No tienes un rol asignado!',
                        detail: 'Comunícate con el administrador!'
                    });
                    this.removeLogin();
                    errors = true;
                }
                if (errors) {
                    return;
                }
                
                if (this.institutions.length === 1) {
                    this.formInstitutionRole.controls['institution'].setValue(this.institutions[0]);
                }
                
                if (this.roles.length === 1) {
                    this.formInstitutionRole.controls['role'].setValue(this.roles[0]);
                }
                this.flagChangePassword = !this.user['change_password'];
                localStorage.setItem('user', JSON.stringify(this.user));
                localStorage.setItem('isLoggedin', 'true');
            },
            error => {
                this.spinner.hide();
                this.removeLogin();
                this.msgs.push({
                    severity: 'error',
                    summary: 'Tenemos problemas con el servidor!',
                    detail: 'Inténtalo de nuevo más tarde!'
                });
                return;
            });
    }
    
    changePassword() {
        if (this.checkPasswords()) {
            this.user.password = this.formLogin.controls['password'].value;
            this.user.new_password = this.formChangePassword.controls['new_password'].value;
            this.user.password_confirm = this.formChangePassword.controls['password_confirm'].value;
            this.spinner.show();
            this.authService.changePassword('auth/change_password', {user: this.user}).subscribe(
                response => {
                    this.spinner.hide();
                    this.flagChangePassword = false;
                },
                error => {
                    this.spinner.hide();
                    this.msgs.push({
                        severity: 'error',
                        summary: 'Tenemos problemas con el servidor!',
                        detail: 'Inténtalo de nuevo más tarde!'
                    });
                    return;
                });
        }
    }
    
    onSubmitLogin(event: Event) {
        event.preventDefault();
        if (this.formLogin.valid) {
            this.onLoggedin();
        } else {
            this.formLogin.markAllAsTouched();
        }
    }
    
    onSubmitChangePassword(event: Event) {
        event.preventDefault();
        if (this.formChangePassword.valid) {
            this.changePassword();
        } else {
            this.formChangePassword.markAllAsTouched();
        }
    }
    
    onSubmitContinue(event: Event) {
        event.preventDefault();
        if (this.formInstitutionRole.valid) {
            this.continueLogin();
        } else {
            this.formInstitutionRole.markAllAsTouched();
        }
    }
    
    removeLogin() {
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        localStorage.removeItem('institution');
        localStorage.removeItem('permissions');
        localStorage.removeItem('isLoggedin');
        localStorage.removeItem('token');
        localStorage.removeItem('requestURL');
    }
    
    continueLogin() {
        this.selectInstitution();
        localStorage.setItem('institution', JSON.stringify(this.formInstitutionRole.controls['institution'].value));
        localStorage.setItem('role', JSON.stringify(this.formInstitutionRole.controls['role'].value));
        this.router.navigate(['/dashboard']);
    }
    
    resetFormInstitutionRole() {
        this.roles = [];
        this.institutions = [];
        this.buildFormInstitutionRole();
    }
    
    selectInstitution() {
        const allPermissions = this.formInstitutionRole.controls['role'].value['permissions'];
        const permissions = [];
        allPermissions.forEach(permission => {
            console.log(permission.institution.id);
            console.log(this.formInstitutionRole.controls['institution'].value['id']);
            if (permission.institution.id === this.formInstitutionRole.controls['institution'].value['id']) {
                permissions.push(permission);
            }
        });
        console.log(permissions);
        localStorage.setItem('permissions', JSON.stringify(permissions));
        
        
    }
    
    // filterInstitution(event) {
    //     const filtered: any[] = [];
    //     const query = event.query;
    //     this.institutions.forEach(institution => {
    //         if (institution.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
    //             filtered.push(institution);
    //         }
    //     });
    //     this.filteredCountries = filtered;
    // }
}
