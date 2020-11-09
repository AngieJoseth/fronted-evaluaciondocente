import {Injectable} from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
} from '@angular/router';
import {User} from '../models/auth/user';
import {Role} from '../models/auth/role';
import {AuthService} from '../services/auth/auth.service';
import {Permission} from '../models/auth/permission';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {
    user: User;
    role: Role;
    authPermissions: Permission[];
    
    constructor(private router: Router, private _authenticationService: AuthService) {
    }
    
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return true;
        const requestURL = next['_routerState']['url'];
        console.log(requestURL);
        localStorage.setItem('requestURL', requestURL);
        this.user = localStorage.getItem('user') === 'undefined' ? null : JSON.parse(localStorage.getItem('user')) as User;
        this.role = localStorage.getItem('role') === 'undefined' ? null : JSON.parse(localStorage.getItem('role')) as Role;
        this.authPermissions = JSON.parse(localStorage.getItem('permissions')) as Permission[];
        
        if (this.user && this.role && this.authPermissions && localStorage.getItem('isLoggedin') === 'true') {
            if (requestURL === '/dashboard' || requestURL === '/') {
                return true;
            }
            const authRouteIndex = this.authPermissions.findIndex(element => element.route.uri === requestURL);
            console.log(authRouteIndex);
            if (authRouteIndex >= 0) {
                return true;
            }
            
        }
        
        this.router.navigate(['/auth/access-denied']);
    }
}
