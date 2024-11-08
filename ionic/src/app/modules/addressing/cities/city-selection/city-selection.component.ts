import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { IonContent, IonInfiniteScroll, IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/base/helper.service';
import { City } from '../city';
import { CityService } from '../city.service';

@Component({
    templateUrl: './city-selection.component.html',
    styleUrls: ['./city-selection.component.css'],
})
export class CitySelectionComponent implements OnInit {
    public title = 'Fatores de Geração';
    public loading: boolean = true;
    public options: Array<City> = [];
    public items: Array<City> = [];
    public disabled: boolean = false;

    @ViewChild('search', { static: false }) search: any;
    @ViewChild(IonContent, { static: false }) content: IonContent;
    @ViewChild(IonInfiniteScroll, { static: false })
    infiniteScroll: IonInfiniteScroll;

    public showFilter: boolean;
    public filters: any = {
        name: null,
    };

    public total_of_data = 0;
    public _paginate: any = {
        count: 15,
        page: 1,
    };

    public trs: any = new Array(5);
    public tds: any = new Array(1);

    constructor(
        private modalController: ModalController,
        private helperService: HelperService,
        private cityService: CityService,
        private router: Router,
        private navParams: NavParams
    ) {
        this.disabled = this.navParams.get('disabled');
    }

    ionViewWillEnter() {}

    ngOnInit() {
        this.paginate(null, null);
    }

    getFilters() {
        var filters = {
            orderBy: 'name',
        };

        Object.keys(this.filters).forEach((key) => {
            if (this.filters[key]) {
                filters[key] = '%' + this.filters[key] + '%';
            }
        }, this);

        return filters;
    }

    async paginate(ionRefresher: any = null, ionInfiniteScroll: any = null) {
        if (
            ionRefresher !== null ||
            (ionRefresher == null && ionInfiniteScroll == null)
        ) {
            this.options = [];
            this.items = [];
            this._paginate.page = 1;
        }
        this.loading = true;
        this.cityService.get(['state'], this.getFilters(), this._paginate).then(
            async (response: any) => {
                this.total_of_data = response.cities.total;
                this._paginate.page = response.cities.current_page + 1;
                for (let city of response.cities.data) {
                    this.options.push(new City(city));
                    this.items.push(new City(city));
                }

                this.loading = false;
                if (ionRefresher) {
                    ionRefresher.target.complete();
                }
                if (ionInfiniteScroll) {
                    ionInfiniteScroll.target.complete();
                }
                if (this.total_of_data == this.options.length) {
                    // ionInfiniteScroll.target.disabled = true;
                }
            },
            (error: any) => {
                this.helperService.responseErrors(error);
            }
        );
    }

    dismiss(value: any) {
        if (value == false) {
            this.modalController.dismiss();
        }

        if (this.disabled == true) {
        } else {
            this.modalController.dismiss(value);
        }
    }

    filterList(event: any) {
        this.options = this.items.filter((option: any) => {
            return (
                option.name
                    .toLowerCase()
                    .indexOf(event.detail.value.toLowerCase()) > -1
            );
        });
    }
}
