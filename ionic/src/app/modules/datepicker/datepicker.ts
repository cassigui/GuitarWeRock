import { Serializable } from 'src/app/base/serializable';
import * as moment from 'moment';

export class Datepicker extends Serializable {

    dateFormat: string = "MMM, DD YYYY";
    closeOnSelect: boolean = true;
    showTodayButton: boolean = true;
    setLabel: string = "Set";
    todayLabel: string = 'Today';
    closeLabel: string = 'Close';
    titleLabel: string = "Select Date";
    monthsList: null;
    weeksList: null;
    clearButton: boolean = false;
    momentLocale: 'en-US'
    fromDate: null
    toDate: null
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
}
