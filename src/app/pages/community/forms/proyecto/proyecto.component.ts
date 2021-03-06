import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {SelectItem} from 'primeng/api';
import {CommunityService} from '../../../../services/community/community.service';

@Component({
    selector: 'app-proyecto',
    templateUrl: './proyecto.component.html',
})
export class ProyectoComponent implements OnInit {

    // VARIABLES FORM CONTROL
    form: FormGroup;

    // AUTOCOMPLETE COMBO
    assignedLines: SelectItem[];

    // URLS
    urlcombo = 'combo';

    constructor(private vinculacionService: CommunityService,
                private formBuilder: FormBuilder) {
        this.buildForm();
    }

    ngOnInit(): void {
    }

    private buildForm() {
        this.form = this.formBuilder.group({
            titulo: [''],
            codigo: [''],
            assigned_line: [''],
            campo: [''],
        });
    }

    filterAssignedLines(event) {
        this.vinculacionService.get(this.urlcombo).subscribe(
            response => {
                this.assignedLines = [];
                const assignedLines = response['assignedLine'];
                for (const item of assignedLines) {
                    const assignedLine = item.name;
                    if (assignedLine.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
                        this.assignedLines.push(assignedLine);
                    }
                }
            },
            error => {
                console.log(error);
            });
    }

}
