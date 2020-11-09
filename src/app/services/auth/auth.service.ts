import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Role, Token, User} from '../../models/auth/models.index';
import {Router} from '@angular/router';
import {SYSTEMS} from '../../../environments/catalogues';
import {URL} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    headers: HttpHeaders;
    
    constructor(private _http: HttpClient, private router: Router) {
    }
    
    login(credentials: any) {
        const url = URL + 'oauth/token';
        this.headers = new HttpHeaders().set('Content-Type', 'application/json').append('Accept', 'application/json');
        return this._http.post(url, credentials, {headers: this.headers});
    }
    
    forgotPassword(username: any) {
        const url = environment.API_URL_AUTHENTICATION + 'auth/forgot_password';
        this.headers = new HttpHeaders().set('Accept', 'application/json');
        return this._http.post(url, {username}, {headers: this.headers});
    }
    
    resetPassword(credentials: any) {
        console.log(credentials);
        const url = environment.API_URL_AUTHENTICATION + 'auth/reset_password';
        this.headers = new HttpHeaders().set('Accept', 'application/json');
        return this._http.post(url, credentials, {headers: this.headers});
    }
    
    getUser(username: string) {
        const url = environment.API_URL_AUTHENTICATION
            + 'users/' + username + '?system_code=' + SYSTEMS.IGNUG;
        this.headers = new HttpHeaders().set('Accept', 'application/json')
            .append('Authorization', 'Bearer ' + (JSON.parse(localStorage.getItem('token')) as Token).access_token);
        return this._http.get(url, {headers: this.headers});
    }
    
    logout() {
        this.headers = new HttpHeaders().set('Accept', 'application/json')
            .append('Authorization', 'Bearer ' + (JSON.parse(localStorage.getItem('token')) as Token).access_token);
        const url = environment.API_URL_AUTHENTICATION + 'auth/logout';
        const role = (JSON.parse(localStorage.getItem('role')) as Role).code;
        
        return this._http.get(url, {headers: this.headers});
    }
    
    logoutAll() {
        this.headers = new HttpHeaders().set('Accept', 'application/json');
        const url = environment.API_URL_AUTHENTICATION + 'auth/logout_all?user_id=' + (JSON.parse(localStorage.getItem('user')) as User).id;
        const role = (JSON.parse(localStorage.getItem('role')) as Role).code;
        return this._http.get(url, {headers: this.headers}).subscribe(response => {
            this.removeLogin();
            this.router.navigate(['/auth/login-' + role]);
        }, error => {
            alert(error);
        });
    }
    
    get(url: string) {
        this.headers = new HttpHeaders()
            .set('Accept', 'application/json')
            .append('Authorization', 'Bearer ' + (JSON.parse(localStorage.getItem('token')) as Token).access_token);
        url = environment.API_URL_AUTHENTICATION + url;
        return this._http.get(url, {headers: this.headers});
    }
    
    post(url: string, data: any) {
        this.headers = new HttpHeaders()
            .set('X-Requested-With', 'XMLHttpRequest')
            .append('Content-Type', 'application/json')
            .append('Accept', 'application/json')
            .append('Authorization', 'Bearer ' + (JSON.parse(localStorage.getItem('token')) as Token).access_token);
        url = environment.API_URL_AUTHENTICATION + url;
        return this._http.post(url, data, {headers: this.headers});
    }
    
    update(url: string, data: any) {
        this.headers = new HttpHeaders()
            .set('X-Requested-With', 'XMLHttpRequest')
            .append('Content-Type', 'application/json')
            .append('Accept', 'application/json')
            .append('Authorization', 'Bearer ' + (JSON.parse(localStorage.getItem('token')) as Token).access_token);
        url = environment.API_URL_AUTHENTICATION + url;
        return this._http.put(url, data, {headers: this.headers});
    }
    
    delete(url: string) {
        this.headers = new HttpHeaders()
            .set('X-Requested-With', 'XMLHttpRequest')
            .append('Content-Type', 'application/json')
            .append('Accept', 'application/json')
            .append('Authorization', 'Bearer ' + (JSON.parse(localStorage.getItem('token')) as Token).access_token);
        url = environment.API_URL_AUTHENTICATION + url;
        return this._http.delete(url, {headers: this.headers});
    }
    
    changePassword(url: string, data: any) {
        this.headers = new HttpHeaders()
            .set('Accept', 'application/json')
            .append('Authorization', 'Bearer ' + (JSON.parse(localStorage.getItem('token')) as Token).access_token);
        url = environment.API_URL_AUTHENTICATION + url;
        return this._http.put(url, data, {headers: this.headers});
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
}
