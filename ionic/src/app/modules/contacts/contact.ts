import { Serializable } from 'src/app/base/serializable';
import * as moment from 'moment';

export class Contact extends Serializable {
    id: number = null;
    name: string = null;
    phone: string = null;
    email: string = null;
    customer_id: number = null;

    created_at: moment.Moment = null;
    updated_at: moment.Moment = null;
    deleted_at: moment.Moment = null;

    constructor(data: Object = {}) {
        super();
        super.serialize(data);
    }

    get dates() {
        return ['created_at', 'updated_at', 'deleted_at'];
    }

    get http_data() {
        return {
            id: this.id,
            name: this.name,
            phone: this.phone,
            email: this.email,
            customer_id: this.customer_id
        };
    }
}
