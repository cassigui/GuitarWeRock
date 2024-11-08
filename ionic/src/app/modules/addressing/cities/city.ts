import { Serializable } from 'src/app/base/serializable';
import { State } from '../states/state';

export class City extends Serializable {
    id: number = null;
    name: string = null;
    code: string = null;
    state_id: number = null;
    region_id: number = null;

    state: State = null;

    constructor(data: Object = {}) {
        super();
        super.serialize(data);
    }

    get relations() {
        return {
            state: State,
        };
    }

    get http_data() {
        return {
            id: this.id,
            name: this.name,
        };
    }
}
