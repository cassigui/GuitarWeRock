import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, IonInfiniteScroll, ModalController } from '@ionic/angular';

import { Datepicker } from 'src/app/components/datepicker/datepicker';

import { DashboardService } from './dashboard.service';
import { HelperService } from 'src/app/base/helper.service';
import { Ionic4DatepickerModalComponent } from 'src/app/components/datepicker/ionic4-datepicker-modal/ionic4-datepicker-modal.component';
import { LegendPosition } from '@swimlane/ngx-charts';
import * as Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
    @ViewChild(IonContent, { static: false }) content: IonContent;
    @ViewChild(IonInfiniteScroll, { static: false })
    trs: any = new Array(5);
    tds: any = new Array(1);

    loading: boolean = true;

    triage_infos = [];
    lots_info = [];
    
    notications = {
        queue: 0,
        sended: 0,
    };

    config: any[] = [];

    filters: any = {
        start_date: moment().subtract(6, 'month'),
        end_date: moment(),
    };

    triage_filters: any = {
        start_date: moment().subtract(6, 'month'),
        end_date: moment(),
    }

    view:any[] = [500, 500];

    legendPosition: LegendPosition = LegendPosition.Below;
    
    // options
    colorScheme = {
        domain: [],
    };

    lotTitle: string = `Lotes em cada etapa`;
    lotsLabels = [];
    lotGraphSingle = [];
    lotGraphCustomersInfo = [];
    
    lotSecondGraph = [];
    lotSecondScheme = {
        domain: [
            '#3880ff',
            '#FEA200',
            '#005508',
        ],
    };

    customerWithouLotGraph = [];
    customerWithouLotScheme = {
        domain: [
            '#00880d',
            '#ffc409',
            '#b20005',
        ],
    };

    triageStatusGraph = [];
    triageStatusScheme = {
        domain:[]
    }


    lotByTimeGraph = [];
    lotByTimeScheme = {
        domain:[
            '#fe391a',
            '#feab1a',
            '#dffe1a'
        ]
    };

    datepicker: Datepicker = new Datepicker();

    constructor(
        private helperService: HelperService,
        private modalController: ModalController,
        private dashboardService: DashboardService
    ) {
        Object.assign(this, this.lotGraphSingle);
        Object.assign(this, this.lotSecondGraph);
    }

    ngOnInit() {}

    ionViewWillEnter() {
        this.loading = true;
        this.getInfos();
    }

    treatDates(obj:string) {
        var filters = [];

        filters.push({'start_date': this[obj].start_date.format('YYYY-MM-DD')});
        filters.push({'end_date': this[obj].end_date.format('YYYY-MM-DD')});
        
        return filters;
    }

    async getInfos() {
        this.loading = false;
    }

    async getNotifications() {
        await this.dashboardService.getNotificationQueue().then(
            async (response: any) => {
                this.notications = response.notifications;
            },
            (error: any) => {
                this.helperService.responseErrors(error);
            }
        );
    }

}
