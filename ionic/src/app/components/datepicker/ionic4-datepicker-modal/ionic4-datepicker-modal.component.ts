import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NavParams, ModalController, IonContent } from '@ionic/angular';

import * as moment_ from 'moment';
import { Ionic4DatepickerService } from '../ionic4-datepicker.service';
const moment = moment_;

@Component({
    selector: 'li-ionic4-datepicker-modal',
    templateUrl: './ionic4-datepicker-modal.component.html',
    styleUrls: ['./ionic4-datepicker-modal.component.scss']
})
export class Ionic4DatepickerModalComponent implements OnInit, OnDestroy {
    @ViewChild(IonContent, { static: false }) content: IonContent;

    currentDate: any;
    today: any;

    // inputs
    mainObj: any = {};
    selectedDate: any = {};

    // component variables
    selctedDateEpoch = 0;
    firstDayEpoch: any;
    lastDayEpoch: any;

    disabledDates = [];
    highlightedDates: any = {};

    fromDate: any;
    toDate: any;
    disableWeekdays = [];
    data: any = {
        currentMonth: '',
        currentYear: '',
        currentMonthSelected: ''
    };
    currentYearSelected: any;
    numColumns: any;

    rows = [0, 7, 14, 21, 28, 35];
    cols = [0, 1, 2, 3, 4, 5, 6];
    monthsList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    weeksList = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    yearsList = [];
    daysList = [];
    yearInAscending = false;
    momentLocale = 'pt-BR';
    selectedDateString: any;

    isMonthYearSelectorOpen = false;
    selectedYearOrMonth: any;
    isMonthSelect: any;
    scrollingMonthOrYearArray: any = [];

    isSelectedDateFound = false;

    constructor(
        private navParams: NavParams,
        private modalCtrl: ModalController,
        public datePickerService: Ionic4DatepickerService
    ) {
        this.today = this.resetHMSM(new Date()).getTime();
        if (this.navParams.get('selectedDate')) {
            this.selectedDate.date = moment(this.navParams.get('selectedDate')).format('YYYY-MM-DD');
            this.isSelectedDateFound = true;
        }
        this.mainObj = this.initDatePickerObj(this.navParams.get('objConfig'));
    }

    ngOnInit() {
        this.datePickerService.isModalOpen = true;
        this.initDatePicker();
    }

    ngOnDestroy() {
        this.datePickerService.isModalOpen = false;
    }

    resetHMSM(currentDate: any) {
        currentDate.setHours(0);
        currentDate.setMinutes(0);
        currentDate.setSeconds(0);
        currentDate.setMilliseconds(0);
        return currentDate;
    }

    changeToDateList() {
        this.isMonthYearSelectorOpen = false;
    }

    selectMonthYear(isMonthSelect: any) {
        this.isMonthYearSelectorOpen = true;

        this.isMonthSelect = isMonthSelect;
        this.scrollingMonthOrYearArray = isMonthSelect ? this.mainObj.monthsList : this.yearsList;
        this.selectedYearOrMonth = isMonthSelect ? this.data.currentMonth : this.data.currentYear;

        const index = this.scrollingMonthOrYearArray.indexOf(this.selectedYearOrMonth);
        const iditem = index + 'list';

        setTimeout(() => {
            document.getElementById(iditem).scrollIntoView();
        }, 100);
    }

    onChangeMonthYear(monthYear: any) {
        if (monthYear) {
            if (this.isMonthSelect) {
                this.data.currentMonth = monthYear;
                this.selectedYearOrMonth = this.data.currentMonth;
                const monthNumber = this.monthsList.indexOf(this.data.currentMonth);
                this.currentDate.setDate(1);
                this.currentDate.setMonth(monthNumber);
            } else {
                this.data.currentYear = monthYear;
                this.selectedYearOrMonth = this.data.currentYear;
                this.currentDate.setFullYear(this.data.currentYear);
                this.refreshDateList(this.currentDate);
            }

            this.refreshDateList(this.currentDate);
        }

        this.isMonthYearSelectorOpen = false;
    }

    prevMonth() {
        const currentMonth = this.currentDate.getMonth();
        const currentYear = this.currentDate.getFullYear();
        if (currentYear <= this.yearsList[(this.yearsList.length - 1)] && currentMonth === 0) {
            return;
        }
        if (currentMonth === 1) {
            this.currentDate.setFullYear(currentYear);
        }
        this.currentDate.setMonth(currentMonth - 1);
        this.data.currentMonth = this.mainObj.monthsList[currentMonth];
        this.data.currentYear = currentYear;
        this.refreshDateList(this.currentDate);
    }

    nextMonth() {
        const currentMonth = this.currentDate.getMonth();
        const currentYear = this.currentDate.getFullYear();
        if (currentYear >= this.yearsList[0] && currentMonth === 11) {
            return;
        }
        if (currentMonth === 11) {
            this.currentDate.setFullYear(currentYear);
        }
        this.currentDate.setDate(1);
        this.currentDate.setMonth(currentMonth + 1);
        this.data.currentMonth = this.mainObj.monthsList[currentMonth];
        this.data.currentYear = currentYear;
        this.refreshDateList(this.currentDate);
    }

    changeDaySelected() {
        const newSelectedDate: any = new Date(this.selctedDateEpoch);
        newSelectedDate.setMonth(this.currentDate.getMonth());
        newSelectedDate.setYear(this.currentDate.getFullYear());
        this.selctedDateEpoch = newSelectedDate.getTime();
        this.selectedDateString = this.formatDate();
    }

    dateSelected(selectedDate: any) {
        if (selectedDate && !selectedDate.disabled) {
            if (!selectedDate || Object.keys(selectedDate).length === 0) { return; }
            this.isSelectedDateFound = true;
            this.selctedDateEpoch = selectedDate.epoch;
            this.selectedDateString = this.formatDate();
            if (this.mainObj.closeOnSelect) {
                this.closeModal(this.selctedDateEpoch);
            }
        }
    }

    setIonicDatePickerTodayDate() {
        const today = new Date(this.today);
        const today_obj = {
            date: today.getDate(),
            month: today.getMonth(),
            year: today.getFullYear(),
            day: today.getDay(),
            epoch: today.getTime(),
            disabled: false
        };
        this.dateSelected(today_obj);
        this.refreshDateList(new Date());
        this.selctedDateEpoch = this.resetHMSM(today).getTime();
        this.selectedDateString = this.formatDate();
    }

    setIonicDatePickerDate() {
        this.closeModal(this.selctedDateEpoch);
    }

    setDisabledDates(obj: any) {
        if (!obj.disabledDates || obj.disabledDates.length === 0) {
            this.disabledDates = [];
        } else {
            this.disabledDates = [];
            for (let i = 0; i < obj.disabledDates.length; i++) {
                this.disabledDates.push(this.resetHMSM(new Date(obj.disabledDates[i])).getTime());
            }
        }
    }

    setHightlightedDates(obj: any) {
        if (!obj.highlightedDates || obj.highlightedDates.length === 0) {
            this.highlightedDates = {};
        } else {
            this.highlightedDates = {};
            for (let i = 0; i < obj.highlightedDates.length; i++) {
                const hDate = obj.highlightedDates[i].date;
                const hColor = obj.highlightedDates[i].color;
                const hFontColor = obj.highlightedDates[i].fontColor;
                const hDateTime = this.resetHMSM(new Date(hDate)).getTime();
                this.highlightedDates[hDateTime] = { color: hColor, fontColor: hFontColor };
            }
        }
    }

    refreshDateList(currentDate: any) {
        currentDate = this.resetHMSM(currentDate);
        this.currentDate = currentDate;

        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDate();
        const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

        this.monthsList = [];
        if (this.mainObj.monthsList && this.mainObj.monthsList.length === 12) {
            this.monthsList = this.mainObj.monthsList;
        } else {
            this.monthsList = this.monthsList;
        }

        this.yearsList = this.getYearsList(this.mainObj.from, this.mainObj.to);

        this.daysList = [];
        let tempDate: any, disabled: any;
        this.firstDayEpoch = this.resetHMSM(new Date(currentDate.getFullYear(), currentDate.getMonth(), firstDay)).getTime();
        this.lastDayEpoch = this.resetHMSM(new Date(currentDate.getFullYear(), currentDate.getMonth(), lastDay)).getTime();

        for (let i = firstDay; i <= lastDay; i++) {
            tempDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
            disabled = false;
            const day = tempDate.getDay();
            if (this.disableWeekdays.length > 0) {
                if (this.disableWeekdays.indexOf(day) >= 0) {
                    disabled = this.disableWeekdays.indexOf(day) >= 0;
                } else {
                    disabled = false;
                }
            }

            if (this.disabledDates.length > 0) {
                if (this.disabledDates.indexOf(tempDate.getTime()) >= 0) {
                    disabled = true;
                }
            }

            if (this.fromDate && !disabled) {
                disabled = (tempDate.getTime() < this.fromDate)
                    || this.mainObj.disableWeekDays.indexOf(tempDate.getDay()) >= 0;
            }
            if (this.toDate && !disabled) {
                disabled = (tempDate.getTime() > this.toDate)
                    || this.mainObj.disableWeekDays.indexOf(tempDate.getDay()) >= 0;
            }

            const hightLightDate = this.highlightedDates[tempDate.getTime()];

            let fontColor = null;

            if (tempDate.getDay() === 0 && this.mainObj.isSundayHighlighted && this.mainObj.isSundayHighlighted.fontColor) {
                fontColor = this.mainObj.isSundayHighlighted.fontColor;
            } else if (hightLightDate && hightLightDate.fontColor) {
                fontColor = hightLightDate.fontColor;
            }

            this.daysList.push({
                date: tempDate.getDate(),
                month: tempDate.getMonth(),
                year: tempDate.getFullYear(),
                day: tempDate.getDay(),
                epoch: tempDate.getTime(),
                disabled: disabled,
                color: hightLightDate && hightLightDate.color ? hightLightDate.color : null,
                fontColor: fontColor
                // fontColor: hightLightDate && hightLightDate.fontColor ? hightLightDate.fontColor : null
            });
        }

        // To set Monday as the first day of the week.
        let firstDayMonday = this.daysList[0].day - this.mainObj.mondayFirst;
        firstDayMonday = (firstDayMonday < 0) ? 6 : firstDayMonday;
        for (let j = 0; j < firstDayMonday; j++) {
            this.daysList.unshift({});
        }
        this.rows = [0, 7, 14, 21, 28, 35];
        this.cols = [0, 1, 2, 3, 4, 5, 6];
        this.data.currentMonth = this.mainObj.monthsList[currentDate.getMonth()];
        this.data.currentYear = currentDate.getFullYear();
        this.data.currentMonthSelected = this.data.currentMonth;
        this.currentYearSelected = this.data.currentYear;
        this.numColumns = 7;
    }

    setInitialObj(ipObj: any) {
        this.mainObj = ipObj;
        if (this.isSelectedDateFound) {
            this.isSelectedDateFound = true;
            this.selctedDateEpoch = this.resetHMSM(this.mainObj.inputDate).getTime();
        }

        this.selectedDateString = this.formatDate();

        if (this.mainObj.weeksList && this.mainObj.weeksList.length === 7) {
            this.weeksList = this.mainObj.weeksList;
        }
        if (this.mainObj.mondayFirst) {
            this.weeksList.push(this.mainObj.weeksList.shift());
        }
        if (this.mainObj.yearInAscending) {
            this.yearInAscending = this.mainObj.yearInAscending;
        }
        if (this.mainObj.momentLocale) {
            this.momentLocale = this.mainObj.momentLocale;
        }
        this.disableWeekdays = this.mainObj.disableWeekDays;
        this.setDisabledDates(this.mainObj);
        this.refreshDateList(this.mainObj.inputDate);
    }

    // for dismiss modal
    closeModal(selectedDate: any) {
        this.modalCtrl.getTop();
        const formattedDate = moment(selectedDate).format(this.mainObj.dateFormat);
        this.modalCtrl.dismiss({ 'date': formattedDate });
    }

    closeIonicDatePickerModal() {
        this.closeModal(null);
    }

    getYearsList(from: any, to: any) {
        const yearsList = [];
        let minYear = new Date().getFullYear() - 130;
        let maxYear = new Date().getFullYear() + 10;
        minYear = from ? new Date(from).getFullYear() - 10 : minYear;
        maxYear = to ? new Date(to).getFullYear() + 10 : maxYear;

        if (this.yearInAscending) {
            for (let i = minYear; i <= maxYear; i++) {
                yearsList.push(i);
            }
        } else {
            for (let i = maxYear; i >= minYear; i--) {
                yearsList.push(i);
            }
        }
        return yearsList;
    }

    initDatePicker() {
        this.fromDate = '';
        this.toDate = '';
        if (this.mainObj.from) {
            this.fromDate = this.resetHMSM(new Date(this.mainObj.from)).getTime();
        }
        if (this.mainObj.to) {
            this.toDate = this.resetHMSM(new Date(this.mainObj.to)).getTime();
        }
        this.setInitialObj(this.mainObj);
    }

    initDatePickerObj(config: any) {
        if (config.inputDate && !this.selectedDate.date) {
            this.isSelectedDateFound = true;
            this.selectedDate.date = config.inputDate;
        }

        const objConfig: any = {};
        objConfig.from = config.fromDate ? config.fromDate : '';
        objConfig.to = config.toDate ? config.toDate : '';
        objConfig.showTodayButton = config.showTodayButton === undefined ? true : config.showTodayButton;
        objConfig.closeOnSelect = config.closeOnSelect ? config.closeOnSelect : false;
        objConfig.disableWeekDays = config.disableWeekDays ? config.disableWeekDays : [];
        objConfig.mondayFirst = config.mondayFirst ? config.mondayFirst : false;
        objConfig.setLabel = config.setLabel ? config.setLabel : 'Set';
        objConfig.todayLabel = config.todayLabel ? config.todayLabel : 'Today';
        objConfig.closeLabel = config.closeLabel ? config.closeLabel : 'Close';
        objConfig.disabledDates = config.disabledDates ? config.disabledDates : [];
        objConfig.titleLabel = config.titleLabel ? config.titleLabel : null;

        objConfig.monthsList = config.monthsList ? config.monthsList : this.monthsList;
        objConfig.monthsList = [...objConfig.monthsList];

        objConfig.weeksList = config.weeksList ? config.weeksList : this.weeksList;
        objConfig.weeksList = [...objConfig.weeksList];

        objConfig.dateFormat = config.dateFormat ? config.dateFormat : 'DD MMM YYYY';

        objConfig.clearButton = config.clearButton ? config.clearButton : false;

        objConfig.yearInAscending = config.yearInAscending ? config.yearInAscending : false;
        objConfig.momentLocale = config.momentLocale ? config.momentLocale : 'en-US';

        moment.locale(objConfig.momentLocale);
        objConfig.inputDate = this.selectedDate.date ? moment(this.selectedDate.date, objConfig.dateFormat).toDate() : new Date();

        objConfig.btnCloseSetInReverse = config.btnCloseSetInReverse ? config.btnCloseSetInReverse : false;

        objConfig.btnProperties = {};

        if (config.btnProperties) {
            const btnProperties = config.btnProperties;
            objConfig.btnProperties.expand = btnProperties.expand ? btnProperties.expand : 'block';
            objConfig.btnProperties.fill = btnProperties.fill ? btnProperties.fill : 'solid';
            objConfig.btnProperties.size = btnProperties.size ? btnProperties.size : 'default';
            objConfig.btnProperties.color = btnProperties.color ? btnProperties.color : '';
            objConfig.btnProperties.disabled = btnProperties.disabled ? btnProperties.disabled : false;
            objConfig.btnProperties.strong = btnProperties.strong ? btnProperties.strong : false;
        } else {
            objConfig.btnProperties.expand = 'block';
            objConfig.btnProperties.fill = 'solid';
            objConfig.btnProperties.size = 'default';
            objConfig.btnProperties.disabled = false;
            objConfig.btnProperties.strong = false;
        }

        objConfig.arrowNextPrev = {};

        if (config.arrowNextPrev) {
            const arrowNextPrev = config.arrowNextPrev;
            objConfig.arrowNextPrev.nextArrowSrc = arrowNextPrev.nextArrowSrc ? arrowNextPrev.nextArrowSrc : false;
            objConfig.arrowNextPrev.prevArrowSrc = arrowNextPrev.prevArrowSrc ? arrowNextPrev.prevArrowSrc : false;
        }

        objConfig.highlightedDates = [];

        if (config.highlightedDates && config.highlightedDates.length > 0) {
            objConfig.highlightedDates = config.highlightedDates;

            this.setHightlightedDates(objConfig);
        }

        objConfig.isSundayHighlighted = {};

        if (config.isSundayHighlighted) {
            const isSundayHighlighted = config.isSundayHighlighted;
            objConfig.isSundayHighlighted.fontColor = isSundayHighlighted.fontColor ? isSundayHighlighted.fontColor : null;
        }

        return objConfig;
    }

    formatDate() {
        return moment(this.selctedDateEpoch).format(this.mainObj.dateFormat);
    }
}

