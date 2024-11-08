import { Serializable } from 'src/app/base/serializable';
import { AccessLevel } from '../access-levels/access-level';
import * as moment from 'moment';

export class User extends Serializable {

    id: number = null;
    name: string = null;
    email: string = null;
    username: string = null;
    password: string = null;
    password_confirmation: string = null;
    active: boolean = true;
    authenticable_type: string = null;
    authenticable_id: number = null;
    authenticable: null;
    super_admin: boolean = false;
    created_at: moment.Moment = null;
    updated_at: moment.Moment = null;
    deleted_at: moment.Moment = null;
    access_level: AccessLevel = new AccessLevel;

    constructor(data: Object = {}) {
        super();
        super.serialize(data);
    }

    get relations() {
        return {
            access_level: AccessLevel,
        }
    }

    get dates() {
        return ['created_at', 'updated_at', 'deleted_at'];
    }

    get http_data() {
        return {
            name: this.name,
            email: this.email,
            username: this.username,
            password: this.password,
            password_confirmation: this.password_confirmation,
            access_level_id: this.access_level_id,
            active: this.active,
            authenticable_type: this.authenticable_type,
            authenticable_id: this.authenticable_id
        };
    }

    get access_level_id() {
        return this.access_level ? this.access_level.id : null;
    }
    set access_level_id(access_level_id) {
        this.access_level.id= access_level_id;
    }


    
    can(action: string, category: string) {
        if (this.super_admin === true) {
            return true;
        }
        if (!this.access_level) {
            return false;
        }

        var permission = this.access_level.permissions.find(permission =>
            (permission.type == action) &&
            (permission.category.type == category)
        );

        if (permission) {
            return permission.pivot.allow;
        }

        return false;
    }
}
