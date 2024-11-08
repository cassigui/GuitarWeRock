import { Serializable } from 'src/app/base/serializable';
import * as moment from 'moment';
import { City } from '../cities/city';

export class Address extends Serializable {
    public id: number = null;
    public addressable_type: string = null;
    public addressable_id: number = null;
    public city_id: number = null;
    public cep: string = null;
    public street: string = null;
    public number: string = null;
    public district: string = null;
    public complement: string = null;
    public main: boolean = false;
    public created_at: moment.Moment = null;
    public updated_at: moment.Moment = null;
    public deleted_at: moment.Moment = null;

    public city: City = null;
    public addressable: any = null;

    constructor(data: Object = {}) {
        super();
        super.serialize(data);
    }

    get relations() {
        return {
            city: City,
        };
    }

    get dates() {
        return ['created_at', 'updated_at', 'deleted_at'];
    }

    get http_data() {
        return {
            id: this.id,
            addressable_type: this.addressable_type,
            cep: this.cep,
            district: this.district,
            street: this.street,
            number: this.number,
            complement: this.complement,
            city_id: this.city_id,
        };
    }

    toString() {
        var street = this.street ? this.street + ', ' : '';
        var number = (this.number ? this.number : 'S/N') + ' - ';
        var district = this.district ? this.district + ', ' : '';
        var city = this.city
            ? this.city.name + ' - ' + this.city.state.initials
            : '';
        return street + number + district + city;
    }

    toStringResume() {
        // var street = this.street ? this.street + ', ' : '';
        // var number = (this.number ? this.number : 'S/N') + ' - ';
        // var district = this.district ? (this.district + ', ') : '';
        var city = this.city
            ? this.city.name + ' - ' + this.city.state.initials
            : '';
        return city;
    }

    get name() {
        var street = 'Rua:' + (this.street ? this.street + '<br>' : ' -- <br>');
        var number =
            'Número: ' + (this.number ? this.number + '<br>' : 'S/N + -- <br>');
        var district =
            'Bairro: ' + (this.district ? this.district + '<br>' : '-- <br>');
        var city =
            'Cidade: ' +
            (this.city
                ? this.city.name + ' - ' + this.city.state.initials
                : '-- <br>');
        return street + number + district + city + '<br>';
    }

    get html_address() {
        var street = 'Rua:' + (this.street ? this.street + '<br>' : ' -- <br>');
        var number =
            'Número: ' + ((this.number ? this.number : 'S/N') + '<br>');
        var district =
            'Bairro: ' + (this.district ? this.district + '<br>' : '-- <br>');
        var city =
            'Cidade: ' +
            (this.city
                ? this.city.name + ' - ' + this.city.state.initials
                : '-- <br>');
        return street + number + district + city;
    }

    get simple_address() {
        let id = '#' + this.id + '\n';
        let street = this.street ? this.street : '';
        let number = this.number ? ', Número ' + this.number : 'S/N';
        let district = this.district ? ', ' + this.district : '';
        let city =
            ' - ' +
            (this.city
                ? this.city.name + ', ' + this.city.state.initials
                : ' aaa');
        return street + number + district + city;
    }
}
