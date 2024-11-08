import { Serializable } from 'src/app/base/serializable';
import * as moment from 'moment';
import { Image } from '../images/image';

export class Seo extends Serializable {
    id: number = null;
    slug: string = null;
    title: string = null;
    description: string = null;
    image: Image = new Image();
    created_at: moment.Moment = null;
    updated_at: moment.Moment = null;
    deleted_at: moment.Moment = null;

    constructor(data: Object = {}) {
        super();
        super.serialize(data);
    }

    get relations() {
        return {
            image: Image,
        };
    }

    get dates() {
        return ['created_at', 'updated_at', 'deleted_at'];
    }

    get http_data() {
        return {
            slug: this.slug,
            title: this.title,
            description: this.description,
            image: this.image,
        };
    }
}
