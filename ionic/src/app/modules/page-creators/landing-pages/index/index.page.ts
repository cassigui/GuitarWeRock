import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, IonInfiniteScroll, IonItemSliding } from '@ionic/angular';

import { LandingPage } from '../landing-page';

import { LandingPageService } from '../landing-page.service';
import { HelperService } from 'src/app/base/helper.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-index',
    templateUrl: './index.page.html',
    styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

    @ViewChild('search', { static: false }) search: any;
    @ViewChild(IonContent, { static: false }) content: IonContent;
    @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;

    landing_pages: Array<LandingPage> = [];
    loading: boolean = false;

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

    page_category_id: number;

    page_category: any = [
        'Base',
    ];

    constructor(
        private landing_pageService: LandingPageService,
        private helperService: HelperService,
        private route: ActivatedRoute,
        private router: Router,
    ) { }

    ngOnInit() {
        this.route.params.subscribe( params => { const id = +params['page_category_id']; this.getParams(id);} );
    }

    getParams(id: number) {
        this.page_category_id = id;

        if (!this.page_category_id) {
            this.router.navigateByUrl('dashboard');
            this.helperService.toast('danger', 'Rota não habilitada.');
        }
        this.paginate(null, null);
    }


    ionViewWillEnter() {
        // this.page_category_id = parseInt(this.route.snapshot.paramMap.get("page_category_id"));
        // if (!this.page_category_id) {
        //     this.router.navigateByUrl('dashboard');
        //     this.helperService.toast('danger', 'Rota não habilitada.');
        // }
        // this.paginate(null, null);
    }

    getFilters() {
        var filters = {};

        Object.keys(this.filters).forEach(key => {
            if (this.filters[key]) {
                filters[key] = "%" + this.filters[key] + "%";
            }
        }, this);

        filters['page_category_id'] = this.page_category_id

        return filters;
    }

    async paginate(ionRefresher: any = null, ionInfiniteScroll: any = null) {
        if (ionRefresher !== null || (ionRefresher == null && ionInfiniteScroll == null)) {
            this.landing_pages = [];
            this._paginate.page = 1;
        }
        this.loading = true;
        this.landing_pageService.get([], this.getFilters(), this._paginate)
            .then(
                async (response: any) => {
                    this.total_of_data = response.landing_pages.total;
                    this._paginate.page = response.landing_pages.current_page + 1;
                    for (let landing_page of response.landing_pages.data) {
                        this.landing_pages.push(new LandingPage(landing_page))
                    }
                    this.loading = false;
                    if (ionRefresher) {
                        ionRefresher.target.complete();
                    }
                    if (ionInfiniteScroll) {
                        ionInfiniteScroll.target.complete();
                    }
                    if (this.total_of_data == this.landing_pages.length) {
                        // ionInfiniteScroll.target.disabled = true;
                    }
                },
                (error: any) => {
                    this.helperService.responseErrors(error)
                }
            )
    }

    async remove(user: LandingPage, eventPopover: any) {
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

    destroy(model: LandingPage) {
        this.landing_pageService.destroy(model.id)
            .then((response) => {
                if (!response.error) {
                    var index = this.landing_pages.findIndex(ac => ac.id == model.id);
                    if (index > -1) {
                        this.landing_pages.splice(index, 1);
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

    debug() {
        //console.log(this.landing_pages);

    }
}
