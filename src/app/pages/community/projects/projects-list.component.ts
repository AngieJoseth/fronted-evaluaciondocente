import { Component, OnInit } from '@angular/core';
import { CommunityService } from '../../../services/community/community.service'
import {Project} from '../../../models/community/models.index';
import {User} from '../../../models/auth/user';
import {Role} from '../../../models/auth/role';

@Component({
    selector: 'app-projects-list',
    templateUrl: './projects-list.component.html',
})
export class ProjectsComponent implements OnInit {

    projects:Project[];
    user:User;
    role:Role;
    permission:Role;

    constructor(private communityService: CommunityService) {
        // this.user = JSON.parse(localStorage.getItem('user')) as User;
        // this.role = JSON.parse(localStorage.getItem('role')) as Role;
        this.role = {};
    }

    ngOnInit() {
        const params = '?user_id=' + 1 + '&role_id=' + 1;
        this.communityService.get('projects' + params).subscribe(
            response => {
                console.log(response);
                this.projects = [];
                response['data'].forEach(project=>{
                    /*
                    this.projects.push({

                    }); */
                });
            },
            error => {
                console.log(error);
            });

    }

}
