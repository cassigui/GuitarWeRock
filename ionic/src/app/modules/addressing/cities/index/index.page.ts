import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, IonInfiniteScroll, IonItemSliding } from '@ionic/angular';

import { HelperService } from 'src/app/base/helper.service';
import { CityService } from '../city.service';
import { City } from '../city';

@Component({
    selector: 'app-index',
    templateUrl: './index.page.html',
})
export class IndexPage implements OnInit {
    @ViewChild('search', { static: false }) search: any;
    @ViewChild(IonContent, { static: false }) content: IonContent;
    @ViewChild(IonInfiniteScroll, { static: false })
    infiniteScroll: IonInfiniteScroll;

    public cities: Array<City> = [];
    public loading: boolean = false;

    public showFilter: boolean;
    public filters: any = {
        name: null,
    };

    public total_of_data = 0;
    public _paginate: any = {
        count: 30,
        page: 1,
    };

    public trs: any = new Array(5);
    public tds: any = new Array(1);

    constructor(
        private cityService: CityService,
        private helperService: HelperService
    ) {}

    ngOnInit() {
        //
    }

    ionViewWillEnter() {
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
            this.cities = [];
            this._paginate.page = 1;
        }
        this.loading = true;
        this.cityService.get(['state'], this.getFilters(), this._paginate).then(
            async (response: any) => {
                this.total_of_data = response.cities.total;
                this._paginate.page = response.cities.current_page + 1;
                for (let city of response.cities.data) {
                    this.cities.push(new City(city));
                }

                this.loading = false;
                if (ionRefresher) {
                    ionRefresher.target.complete();
                }
                if (ionInfiniteScroll) {
                    ionInfiniteScroll.target.complete();
                }
                if (this.total_of_data == this.cities.length) {
                    // ionInfiniteScroll.target.disabled = true;
                }
            },
            (error: any) => {
                this.helperService.responseErrors(error);
            }
        );
    }

    async remove(city: City, eventPopover: any, slidingItem: IonItemSliding) {
        let popover = await this.helperService.listPopover(
            eventPopover,
            'Tem certeza?',
            [
                {
                    text: 'voltar',
                    color: 'gray',
                    value: false,
                },
                {
                    text: 'remover',
                    color: 'danger',
                    value: true,
                },
            ]
        );

        popover.onDidDismiss().then((popoverData) => {
            if (popoverData.data === true) {
                this.helperService.loading('Removendo');
                this.destroy(city, slidingItem);
            } else {
                slidingItem.close();
            }
        });

        popover.present();
    }

    destroy(model: City, slidingItem: IonItemSliding) {
        this.cityService
            .destroy(model.id)
            .then(
                (response) => {
                    if (!response.error) {
                        var index = this.cities.findIndex(
                            (ac) => ac.id == model.id
                        );
                        if (index > -1) {
                            this.cities.splice(index, 1);
                        }
                    }
                    this.helperService.toast(
                        response.error ? 'warning' : 'success',
                        response.message
                    );
                    slidingItem.close;
                },
                (error) => {
                    this.helperService.responseErrors(error);
                }
            )
            .then(() => this.helperService.loading_dismiss());
    }

    toggleSearch() {
        this.showFilter = !this.showFilter;
        if (this.showFilter) {
            setTimeout(() => {
                this.search.setFocus();
            }, 100);
        }
    }
}
