import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../users/user.service';
import { HelperService } from 'src/app/base/helper.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    credentials: any;
    showPassword: boolean = false;
    public hide :boolean = true;
    public hide_conf :boolean = true;

    constructor(
        private router: Router,
        private userService: UserService,
        private helperService: HelperService,
    ) {
    }

    ngOnInit() {

        this.credentials = {
            username: null,
            password: null
        }

        if (this.userService.isLoggedIn) {
            return this.router.navigate(['/dashboard']);
        }

        if (localStorage.getItem(this.userService.api_token_name)) {
            return this.router.navigate(['/auth/attempt']);
        }
    }


    login() {

        if (!this.credentials.username || !this.credentials.password) {
            this.helperService.toast('warning', 'Nome de usuário ou senha inválidos.');
            return;
        }
        this.helperService.loading('Aguarde');
        this.userService.login(this.credentials, ['access_level.permissions']).then(
            (data: any) => {
                if (data.token) {
                    this.userService.setUser(data, null);
                    this.router.navigate(['/dashboard']);
                } else {
                    this.helperService.toast('danger', 'Nome de usuário ou senha inválidos.');
                }
                this.helperService.loading_dismiss();
            },
            (error: any) => {
                this.helperService.loading_dismiss();
                this.helperService.responseErrors(error);
            }
        )
    }
}
