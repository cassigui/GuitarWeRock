import { Injectable, Injector, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { BaseService } from 'src/app/base/base.service';
import { Serializable } from 'src/app/base/serializable';
import { User } from './user';

@Injectable({
    providedIn: 'root',
})
export class UserService extends BaseService {
    user: User = null;
    router: Router;
    prefix: string = 'wf-api';
    url: string = 'users';
    _userAllow = new EventEmitter();

    constructor(injector: Injector, router: Router) {
        super(injector);
        this.router = router;
    }

    get currrentUser(){
        return this.user;
    }

    get isLoggedIn() {
        return this.user != null;
    }

    login(credentials: any, relations: Array<string> = []): Promise<any> {
        return this.http
            .post(
                this.buildUrl('/authenticate', relations, { system: true }),
                credentials
            )
            .toPromise();
    }

    logout() {
        this.unsetUser();
        this.router.navigate(['/auth/login']);
    }

    validateToken(relations: Array<string> = []): Promise<any> {
        return this.http
            .get(this.buildUrl('/validate-token', relations), this.api_token)
            .toPromise();
    }

    newPassword(user: Serializable): Promise<any> {
        return this.http
            .put(
                this.buildUrl('/' + user.id + '/new-password'),
                user,
                this.api_token
            )
            .toPromise();
    }

    setUser(data: any, callback: any) {
        if (data.token) {
            this.setApiToken(data.token);
        }
        
        if (data.user) {
            this.user = new User(data.user);
        }

        this._userAllow.emit(this.isLoggedIn);

        if (callback) {
            callback(true);
        }
    }

    unsetUser(callback: any = null) {
        this.unsetApiToken();
        this.user = null;
        this._userAllow.emit(this.isLoggedIn);

        if (callback) {
            callback(true);
        }
    }

    getSupervisors(): Promise<any> {
        return this.http
            .get(this.buildUrl('/supervisors'), this.api_token)
            .toPromise();
    }

    sendForgotPasswordEmail(data: any): Promise<any> {
        return this.http
            .post(this.buildUrl('/forgot-password'), data.email_data)
            .toPromise();
    }

    validateResetToken(data: any): Promise<any> {
        return this.http
            .post(
                this.buildUrl('/validate-reset-token'),
                data.validate_token_data
            )
            .toPromise();
    }

    updatePassword(data: any, relations: Array<string> = []): Promise<any> {
        return this.http
            .put(
                this.buildUrl('/update-password', relations),
                data.update_password_data
            )
            .toPromise();
    }

    parseAuth(auth: Array<Object>) {
        if (this.user.super_admin == true) return true;
        return auth.map(permission =>
            this.user.can(Object.keys(permission)[0], Object.values(permission)[0])
        ).every(
            permission => (permission === true)
        );
    }
    
    get is_admin() {
        return this.user.access_level_id == 1;
    }
}
