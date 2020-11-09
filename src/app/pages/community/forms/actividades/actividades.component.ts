import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { CommunityService } from '../../../../services/community/community.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
})
export class ActividadesComponent implements OnInit {

  //VARIABLES FORM CONTROL
  form: FormGroup;

  fraquencyOfActivities: SelectItem[];
  bondingActivities: SelectItem[];
  bondingActivitiesListbox: SelectItem[];
  linkageAxes: SelectItem[];
  linkageAxesListbox: SelectItem[];
  researchAreas: SelectItem[];
  researchAreasListbox: SelectItem[];
  urlcombo = "combo";

  constructor(private vinculacionService: CommunityService,
    private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.listbox();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      frecuenciaActiv: [''],
      actividadesVincu: [''],
      ejesEstrategicos: [''],
      areasAplicacion: [''],
      descripGeneral: [''],
    });
  }

  filterAssignedLines(event) {
    this.vinculacionService.get(this.urlcombo).subscribe(
      response => {
        this.fraquencyOfActivities = [];
        const fraquencyOfActivities = response['fraquencyOfActivity'];
        for (const item of fraquencyOfActivities) {
          const brand = item.name;
          if (brand.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
            this.fraquencyOfActivities.push(brand);
          }
        }
      },
      error => {
        console.log(error);
      });
  }

  listbox() {
    this.vinculacionService.get(this.urlcombo).subscribe(
      response => {
        this.bondingActivities = [{ label: 'Seleccione', value: '' }];
        this.linkageAxes = [{ label: 'Seleccione', value: '' }];
        this.researchAreas = [{ label: 'Seleccione', value: '' }];
        const bondingActivities = response['bondingActivities'];
        const linkageAxes = response['linkageAxes'];
        const researchAreas = response['research_areas'];
        bondingActivities.forEach(bondingActivity => {
          this.bondingActivities.push({ 'label': bondingActivity.name, 'value': bondingActivity.id });
        });
        linkageAxes.forEach(linkageAxe => {
          this.linkageAxes.push({ 'label': linkageAxe.name, 'value': linkageAxe.id });
        });
        researchAreas.forEach(research_area => {
          this.researchAreas.push({ 'label': research_area.name, 'value': research_area.id });
        });
        this.bondingActivitiesListbox = this.bondingActivities.slice(1);
        this.linkageAxesListbox = this.linkageAxes.slice(1);
        this.researchAreasListbox = this.researchAreas.slice(1);
      },
      error => {
        console.log(error);
      });
  }
}
