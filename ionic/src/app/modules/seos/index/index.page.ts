import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, IonInfiniteScroll, IonItemSliding } from '@ionic/angular';

import { Seo } from '../seo';

import { SeoService } from '../seo.service';
import { HelperService } from 'src/app/base/helper.service';

@Component({
    selector: 'app-index',
    templateUrl: './index.page.html',
    styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

    @ViewChild('search', { static: false }) search: any;
    @ViewChild(IonContent, {static: false}) content: IonContent;
    @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;

    seos: Array<Seo> = [];
    loading: boolean = false;
    url_s3: string;

    showFilter: boolean;
    filters: any = {
        name: null
    };

    total_of_data = 0;
    _paginate: any = {
        take: 20,
        page: 1
    };

    trs: any = new Array(5);
    tds: any = new Array(1);

    constructor(
        private seoService: SeoService,
        private helperService: HelperService,
    ) {
        this.url_s3 = this.seoService.url_s3;
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

        return filters;
    }

    async paginate(ionRefresher: any = null, ionInfiniteScroll: any = null) {
        if (ionRefresher !== null || (ionRefresher==null && ionInfiniteScroll==null)) {
            this.seos = [];
            this._paginate.page = 1;
        }
        this.loading = true;
        this.seoService.get(['image'], this.getFilters(), this._paginate)
            .then(
                async (response: any) => {
                    this.total_of_data = response.seos.total;
                    this._paginate.page = response.seos.current_page + 1;
                    for (let seo of response.seos.data) {
                        this.seos.push(new Seo(seo))
                    }

                    this.loading = false;
                    if (ionRefresher) {
                        ionRefresher.target.complete();
                    }
                    if (ionInfiniteScroll) {
                        ionInfiniteScroll.target.complete();
                    }
                    if (this.total_of_data == this.seos.length) {
                        // ionInfiniteScroll.target.disabled = true;
                    }
                },
                (error: any) => {
                    this.helperService.responseErrors(error)
                }
            )
    }

    async remove(user: Seo, eventPopover: any) {
        let popover = await this.helperService.listPopover(eventPopover, 'Tem certeza?', [
            {
                text: 'voltar',
                color: 'grey',
                value: false
            },
            {
                text: 'remover',
                color: 'danger',
                value: true
            },
        ]);

        popover.onDidDismiss().then((popoverData) => {
            if (popoverData.data === true) {
                this.helperService.loading('Removendo');
                this.destroy(user);
            }
        });

        popover.present();
    }

    destroy(model: Seo) {
        this.seoService.destroy(model.id)
            .then((response) => {
                if (!response.error) {
                    var index = this.seos.findIndex(ac => ac.id == model.id);
                    if (index > -1) {
                        this.seos.splice(index, 1);
                    }
                }
                this.helperService.toast(response.error ? 'warning' : 'success', response.message);
            }, (error) => {
                this.helperService.responseErrors(error);
            })
            .then(() => this.helperService.loading_dismiss())
    }

    toggleSearch() {
        this.showFilter = !this.showFilter;
        if (this.showFilter) {
            setTimeout(() => {
                this.search.setFocus();
            }, 100)
        }
    }

    get_thumb(image: any, prefix: string) {
        return image.path.replace('/' + image.imageable_id + '_', '/' + prefix + image.imageable_id + '_');
    }
}
