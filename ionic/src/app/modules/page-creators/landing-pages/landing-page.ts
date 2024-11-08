import { Serializable } from 'src/app/base/serializable';
import * as moment from 'moment';
import { Image } from '../../images/image';
import { PostableSection } from '../postable-sections/postable-section';

export class LandingPage extends Serializable {

    id: number = null;
    title: string = null;
    active: boolean = true;
    subtitle: string = null;
    page_category_id: number = null;
    post_date: moment.Moment = moment();
    postable_sections: PostableSection[] = [];
    images: Image[] = [];
    image: Image = new Image;
    _image: Image = new Image;

    created_at: moment.Moment = null;
    updated_at: moment.Moment = null;
    deleted_at: moment.Moment = null;
    
    slug: string = null;


    constructor(data: Object = {}) {
        super();
        super.serialize(data);
    }

    get relations() {
        return {
            _image: Image,
            image: Image,
            images: Image,
            postable_sections: PostableSection,

        }
    }

    get dates() {
        return ['created_at', 'updated_at', 'deleted_at','post_date'];
    }

    get http_data() {
        return {
            title: this.title,
            active: this.active,
            post_date: this.post_date ? moment(this.post_date).format('YYYY-MM-DD') : null,
            subtitle: this.subtitle,
            postable_sections: this.postable_sections,
            image: this.image,
            images: this.images,
            page_category_id: this.page_category_id,
            slug: this.slug,
        }
    }
}
