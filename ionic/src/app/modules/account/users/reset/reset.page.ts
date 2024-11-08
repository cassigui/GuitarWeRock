import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HelperService } from 'src/app/base/helper.service';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
    selector: 'app-reset',
    templateUrl: './reset.page.html',
    styleUrls: ['./reset.page.scss'],
})
export class ResetPage implements OnInit {

    user: User;
    hide: boolean = true;
    hide_conf: boolean = true;

    constructor(
        private router: Router,
        private helperService: HelperService,
        private user_service: UserService,
    ) {
        this.user = new User;
    }

    ngOnInit() {
        this.getUser();
    }

    getUser() {
        this.user = this.user_service.user
    }

    save() {
        this.update();
    }

    update() {
        this.helperService.loading('Alterando Senha')
        this.user_service.update(this.user)
            .then(
                (data: any) => {
                    if (data.error) {
                        this.helperService.toast('danger', data.message);
                        return false;
                    }
                    this.helperService.loading_dismiss();
                    this.helperService.toast('success', data.message);
                },
                (error: any) => {
                    this.helperService.responseErrors(error);
                }
            );
    }
}
