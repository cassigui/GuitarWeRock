import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
    selector: 'app-select',
    templateUrl: './cities-multiple-select.component.html',
    styleUrls: ['./cities-multiple-select.component.scss'],
})
export class CitiesMultipleSelectComponent implements OnInit {
    @ViewChild('search', { static: false }) search: any;

    title = 'Opções';
    options: any = [];
    items: any = [];
    region_id: number = null;
    selecteds: any = [];
    values: Array<any> = [];
    regions: Array<any> = [];

    constructor(
        private modalController: ModalController,
        private navParams: NavParams
    ) {
        this.title = this.navParams.get('title');
        this.options = this.navParams.get('options');
        this.selecteds = this.navParams.get('selecteds');
        this.region_id = this.navParams.get('region_id');
        this.regions = this.navParams.get('regions');
    }

    ngOnInit() {}

    ionViewWillEnter() {
        if (this.selecteds && this.selecteds.length > 0) {
            this.selecteds.forEach((item) => {
                this.options.forEach((option) => {
                    if (option.id == item) {
                        option.selected = 1;
                        this.values.push(option.id);
                    }
                });
            });
        }

        this.items = this.options;

        setTimeout(() => {
            this.search.setFocus();
        }, 100);
    }

    async dismiss() {
        await this.modalController.dismiss(this.values);
    }

    async select(value: any) {
        let index = this.values.indexOf(value.id);
        if (index > -1) {
            value.selected = 0;
            this.values.splice(index, 1);
        } else {
            value.selected = 1;
            this.values.push(value.id);
        }
    }

    filterList(event: any) {
        this.items = this.options.filter((item: any) => {
            return (
                item.name
                    .toLowerCase()
                    .indexOf(event.detail.value.toLowerCase()) > -1
            );
        });
    }

    getRegionName(region_id: number) {
        let region = this.regions.find((el) => region_id == el.id);

        if (region) {
            return region.name;
        } else {
            return '';
        }
    }
}
