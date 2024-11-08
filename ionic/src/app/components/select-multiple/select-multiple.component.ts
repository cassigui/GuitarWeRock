import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
    selector: 'app-select',
    templateUrl: './select-multiple.component.html',
    styleUrls: ['./select-multiple.component.scss'],
})
export class SelectMultipleComponent implements OnInit {
    @ViewChild('search', { static: false }) search: any;

    title = 'Opções';
    options: any = [];
    items: any = [];
    selecteds: any = [];
    values: Array<any> = [];
    attribute: string = 'name';

    constructor(
        private modalController: ModalController,
        private navParams: NavParams,
    ) {
        this.title = this.navParams.get('title');
        this.options = this.navParams.get('options');
        this.selecteds = this.navParams.get('selecteds');
        this.attribute = this.navParams.get('attribute') || 'name';
    }

    ngOnInit() {
    }

    ionViewWillEnter(){
        this.init()
    }

    async init() {
        for(let option of this.options){
            option.selected = 0;
        };

        if(this.selecteds && this.selecteds.length > 0) {
            for(let item of this.selecteds) {
                for(let option of this.options){
                    if(option.id == item.id) {
                        option.selected = 1;
                        this.values.push(option.id);
                    }
                };
            };
        }
        
        this.items = this.options;
        setTimeout(() => {
            this.search.setFocus();
        }, 100)
    }

    async dismiss() {
        await this.modalController.dismiss(this.values)
    }

    async select(value: any) {
        let index = this.values.indexOf(value.id);
        if (index > -1) {
            value.selected = 0;
            this.values.splice(index, 1);
        }else{
            value.selected = 1;
            this.values.push(value.id);
        }
    }

    filterList(event: any) {
        this.items = this.options.filter((item: any) => {
            return item[this.attribute].toLowerCase().indexOf(event.detail.value.toLowerCase()) > -1;
        });
    }

}