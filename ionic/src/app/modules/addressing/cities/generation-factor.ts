import { Serializable } from 'src/app/base/serializable';

export class GenerationFactor extends Serializable {

    public id: number = null;
    public value: number = null;
    public city_id: number = null;

    constructor(data: Object = {}) {
        super();
        super.serialize(data);
    }

    get relations() {
        return {
        };
    }
}
