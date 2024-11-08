import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
    selector: 'app-select',
    templateUrl: './multiple-select.component.html',
    styleUrls: ['./multiple-select.component.scss'],
})
export class MultipleSelectComponent implements OnInit {
    @ViewChild('search', { static: false }) search: any;

    title = 'Opções';
    options: any = [];
    items: any = [];
    values: any = [];

    constructor(
        private modalController: ModalController,
        private navParams: NavParams,
    ) {
        this.title = this.navParams.get('title');
        this.options = this.navParams.get('options');
    }

    ngOnInit() {
    }

    ionViewWillEnter() {
        this.items = this.options;
        setTimeout(() => {
            this.search.setFocus();
        }, 100)
    }

    async dismiss() {
        await this.modalController.dismiss({
            confirmed: false,
            data: this.values
        });
    }

    async confirm() {
        await this.modalController.dismiss({
            confirmed: true,
            data: this.values
        });
    }

    async select(value: any) {
        var index = this.values.findIndex(
            ac => ac.id == value.id
        );
        if (index > -1) {
            this.values.splice(index, 1);
        } else {
            this.values.push(value);
        }
    }

    filterList(event: any) {
        this.items = this.options.filter((item: any) => {
            return item.name.toLowerCase().indexOf(event.detail.value.toLowerCase()) > -1;
        });
    }

}