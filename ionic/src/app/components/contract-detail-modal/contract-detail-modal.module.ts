import { NgModule } from '@angular/core';
import { BaseModule } from 'src/app/base/base.module';

import { ContractDetailModalComponent } from './contract-detail-modal.component';

@NgModule({
    declarations: [ContractDetailModalComponent],
    exports: [ContractDetailModalComponent],
    imports: [BaseModule],
})
export class ContractDetailModalModule {}
