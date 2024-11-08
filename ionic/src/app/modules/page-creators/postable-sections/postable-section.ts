import { Serializable } from 'src/app/base/serializable';
import * as moment from 'moment';
import { PostableColumn } from '../postable-columns/postable-column';

export class PostableSection extends Serializable {

    id: number = null;
    postable_id: number = null;
    postable_type: string = null;
    order: number = null;
    created_at: moment.Moment = null;
    updated_at: moment.Moment = null;
    deleted_at: moment.Moment = null;

    postable_columns: PostableColumn[] = [];

    constructor(data: Object = {}) {
        super();
        super.serialize(data);
    }

    get relations() {
        return {
            postable_columns: PostableColumn
        }
    }

    get dates() {
        return ['created_at', 'updated_at', 'deleted_at'];
    }

    get http_data() {
        return {
            order: this.order,
        }
    }

}
