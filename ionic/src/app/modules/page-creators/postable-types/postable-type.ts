import { Serializable } from 'src/app/base/serializable';

export class PostableType extends Serializable {

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
            name: this.name,
        }
    }

}
