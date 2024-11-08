import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, PopoverController, NavParams } from '@ionic/angular';

@Component({
    selector: 'app-changes-popover',
    templateUrl: './changes-popover.component.html',
    styleUrls: ['./changes-popover.component.scss'],
})
export class ChangesPopoverComponent implements OnInit {
    @ViewChild(IonContent, { static: false }) content: IonContent;

    public json: string;
    public formated_json: string

    constructor(
        private popover_controller: PopoverController,
        private nav_params: NavParams,
    ) {
        this.json = nav_params.get('json')

    }

    ngOnInit() {
        this.formated_json = JSON.stringify(JSON.parse(this.json),null,2)
    }
    ionViewWillEnter() {

    }

    async dismiss(){
        await this.popover_controller.dismiss();
    }

}
