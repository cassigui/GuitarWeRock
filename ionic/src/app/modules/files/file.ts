import { Serializable } from 'src/app/base/serializable';
import * as moment from 'moment';

export class File extends Serializable {
    public id: number = null;

    public name: string = null;
    public path: string = null;
    public fileable_type: string = null;
    public fileable_id: number = null;
    public base64: string = null;

    public created_at: moment.Moment = null;
    public updated_at: moment.Moment = null;
    public deleted_at: moment.Moment = null;

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
            base64: this.base64,
            fileable_id: this.fileable_id,
            fileable_type: this.fileable_type,
        };
    }
}
