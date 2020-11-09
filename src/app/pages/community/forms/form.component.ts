import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-vinculacion-forms',
    templateUrl: './form.component.html',
})
export class FormsComponent implements OnInit {
    
    text: string = 'text';
    
    // tiene que venir con informacion de observaciones
    observacion: string = 'tiene que venir con informacion de observaciones';
    
    constructor() {
    }
    
    ngOnInit() {
    }
}
