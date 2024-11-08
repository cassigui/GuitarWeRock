import { Serializable } from 'src/app/base/serializable';
import * as moment from 'moment';

export class Datepicker extends Serializable {

    language: string = 'pt';
    dateFormat: string = "YYYY-MM-DD";
    closeOnSelect: boolean = false;
    setLabel: string = "OK";
    clearButton: boolean = false;
    momentLocale: 'pt-BR';
    myDate: string = moment().format("YYYY-MM-DD")
    inputDate: string = moment().format("YYYY-MM-DD")
    yearInAscending: boolean = false
    btnProperties: any = {
        fill: 'solid',
        strong: true
    }

    constructor(data: Object = {}) {
        super();
        super.serialize(data);
    }

    setInputDateattribute(date) {
        this.inputDate = date
    }

    get monthsList() {
        switch (this.language) {
            case 'en':
                return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                break;

            case 'es':
                return ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
                break;

            case 'pt':
                return ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
                break;

            default:
                return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                break;
        }
    }

    get todayLabel() {
        switch (this.language) {
            case 'en':
                return 'Today';
                break;

            case 'es':
                return 'Hoy';
                break;

            case 'pt':
                return 'Hoje';
                break;

            default:
                return 'Today';
                break;
        }
    }

    get closeLabel() {
        switch (this.language) {
            case 'en':
                return 'Close';
                break;

            case 'es':
                return 'Cerrar';
                break;

            case 'pt':
                return 'Fechar';
                break;

            default:
                return 'Close';
                break;
        }
    }

    get titleLabel() {
        switch (this.language) {
            case 'en':
                return 'Select a date';
                break;

            case 'es':
                return 'Seleccionar una fecha';
                break;

            case 'pt':
                return 'Selecione uma data';
                break;

            default:
                return 'Select a date';
                break;
        }
    }

    get weeksList() {
        switch (this.language) {
            case 'en':
                return ["S", "M", "T", "W", "T", "F", "S"];
                break;

            case 'es':
                return ["D", "L", "M", "M", "J", "V", "S"];
                break;

            case 'pt':
                return ["D", "S", "T", "Q", "Q", "S", "S"];
                break;

            default:
                return ["S", "M", "T", "W", "T", "F", "S"];
                break;
        }
    }
}
