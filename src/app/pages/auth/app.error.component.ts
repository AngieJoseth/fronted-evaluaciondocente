import {Component} from '@angular/core';
import {Role} from '../../models/auth/role';

@Component({
    selector: 'app-error',
    template: `
		<div class="exception-body error">
			<div class="exception-content">
				<div class="moon">
					<img src="../../../assets/layout/images/pages/asset-moon.svg" alt="mirage-layout"/>
				</div>
				<div class="exception-panel">
					<div class="exception-panel-content">
						<span class="tag"><i class="pi pi-exclamation-triangle" style="vertical-align: bottom"> 500</i></span>
						<h1>Ocurrió un Error</h1>
						<div class="seperator"></div>
						<p>Algo salió mal.</p>
						<button pButton type="button" icon="pi pi-sign-in" class="p-mr-6"
								[routerLink]="['/auth/login']"
								label="Ir Login"></button>
						<button pButton type="button" icon="pi pi-home" *ngIf="role"
								[routerLink]="['/dashboard']" label="Ir Dashboard"></button>
					</div>
				</div>
				<div class="desert"></div>
			</div>
		</div>
    `,
})
export class AppErrorComponent {
    role: Role;
    
    constructor() {
        this.role = JSON.parse(localStorage.getItem('role')) as Role;
    }
}
