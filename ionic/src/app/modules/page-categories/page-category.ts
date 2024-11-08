import { Serializable } from 'src/app/base/serializable';
import * as moment from 'moment';

export class PageCategory extends Serializable {

    id: number = null;
    name: string = null;

    constructor(data: Object = {}) {
        super();
        super.serialize(data);
    }

    get relations() {
        return {
        }
    }

    get dates() {
        return [];
    }

    get http_data() {
        return {
        }
    }

}
