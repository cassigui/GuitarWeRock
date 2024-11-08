import { Serializable } from 'src/app/base/serializable';

export class Country extends Serializable {
    public id: number = null;
    public name: string = null;
    public ibge: string = null;
    public sescomex: string = null;

    constructor(data) {
        super();
        super.serialize(data);
    }
}
