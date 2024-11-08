import { Serializable } from 'src/app/base/serializable';
import * as moment from 'moment';
import { PostableType } from '../postable-types/postable-type';
import { Image } from '../../images/image';

export class PostableColumn extends Serializable {

    id: number = null;
    postable_section_id: number = null;
    order: number = null;
    title: string = null;
    content: string = null;
    url: string = null;
    postable_type_id: number = 1;
    created_at: moment.Moment = null;
    updated_at: moment.Moment = null;
    deleted_at: moment.Moment = null;

    postable_type: PostableType = new PostableType;
    image: Image = new Image;
    _image: Image = new Image;

    constructor(data: Object = {}) {
        super();
        super.serialize(data);
    }

    get relations() {
        return {
            postable_type: PostableType,
            image: Image,
            _image: Image
        }
    }

    get dates() {
        return ['created_at', 'updated_at', 'deleted_at'];
    }

    get http_data() {
        return {
            postable_section_id: this.postable_section_id,
            order: this.order,
            title: this.title,
            image: this.image,
            content: this.content,
            url: this.url,
            postable_type_id: this.postable_type_id,
        }
    }

}
