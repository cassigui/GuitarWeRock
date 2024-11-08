import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, NavParams, PopoverController} from '@ionic/angular';

import { Auditing } from '../auditing';
import { HelperService } from 'src/app/base/helper.service';
import { BaseService } from 'src/app/base/base.service';
import { ChangesPopoverComponent } from './changes-popover/changes-popover.component';

@Component({
    selector: 'app-index',
    templateUrl: './auditing-modal.component.html',
    styleUrls: ['./auditing-modal.component.scss'],
})
export class AuditingModalComponent implements OnInit {

    @ViewChild('search', { static: false }) search: any;
    @ViewChild(IonContent, { static: false }) content: IonContent;

    public id: number;
    public service: BaseService;
    public auditings: Auditing[] = [];
    public element: string;
    public loading: boolean = false;

    public action: string= ''
    public causer: string= ''

    public showFilter: boolean;
    public filters: any = {
        name: null,
        comment: null
    };

    public total_of_data = 0;
    public _paginate: any = {
        take: 40,
        page: 1
    };

    constructor(
        private nav_params: NavParams,
        private popover_controller: PopoverController,
        private helper_service: HelperService,
    ) {
        this.service = nav_params.get('service');
        this.element = nav_params.get('element');
        this.id = nav_params.get('id')
     }

    ngOnInit() {
    }

    ionViewWillEnter() {
        this.paginate(null, null);
    }

    getFilters() {
        var filters = {};

        Object.keys(this.filters).forEach(key => {
            if (this.filters[key]) {
                filters[key] = "%" + this.filters[key] + "%";
            }
        }, this);

        filters['orderBy'] = '!id';

        return filters;
    }

    async paginate(ionRefresher: any = null, ionInfiniteScroll: any = null) {
        if (ionRefresher !== null || (ionRefresher == null && ionInfiniteScroll == null)) {
            this.auditings = [];
            this._paginate.page = 1;
        }
        this.loading = true;
        this.service.find(['auditings.causer'],{ id:this.id})
            .then(
                async (response: any) => {
                    this.auditings = response[this.element].auditings.map((auditing) => new Auditing(auditing))
                    this.loading = false;
                },
                (error: any) => {
                    this.helper_service.responseErrors(error)
                }
            )
    }

    async showChanges(properties: string,event: Event) {
        const checklistPopover = await this.popover_controller.create({
            component: ChangesPopoverComponent,
            mode: 'ios',
            event: event,
            componentProps:{
                json: properties
            }
        })

        await checklistPopover.present();
    }

    toggleSearch() {
        this.showFilter = !this.showFilter;
        if (this.showFilter) {
            setTimeout(() => {
                this.search.setFocus();
            }, 100)
        }
    }
}
