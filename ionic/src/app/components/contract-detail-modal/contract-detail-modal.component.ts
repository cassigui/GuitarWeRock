import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

import { Contract } from 'src/app/modules/contracts/contract';

@Component({
    selector: 'app-contract-detail-modal',
    templateUrl: './contract-detail-modal.component.html',
    styleUrls: ['./contract-detail-modal.component.scss'],
})
export class ContractDetailModalComponent implements OnInit {
    contract: Contract = new Contract();

    constructor(
        private navParams: NavParams,
        private modalController: ModalController
    ) {
        this.contract = this.navParams.get('contract')
            ? new Contract(this.navParams.get('contract'))
            : new Contract();
    }

    ngOnInit() {}

    close() {
        this.modalController.dismiss();
    }
}
