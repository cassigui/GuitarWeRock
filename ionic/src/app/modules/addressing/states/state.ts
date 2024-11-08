import { Serializable } from 'src/app/base/serializable';
import { Country } from '../countries/country';

export class State extends Serializable {
    public id: number = null;
    public initials: string = null;
    public name: string = null;

    public country: Country = null;

    constructor(data: Object = {}) {
        super();
        super.serialize(data);
        this.id = this.id
    }

    get relations() {
        return {
            country: Country
        };
    }




}
