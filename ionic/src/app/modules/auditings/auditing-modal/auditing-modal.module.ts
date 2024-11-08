import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseModule } from 'src/app/base/base.module';

import { AuditingModalComponent } from './auditing-modal.component';
import { ChangesPopoverModule } from './changes-popover/changes-popover.module';
import { AuditSearchPipe } from './pipes/audit-search.pipe';

@NgModule({
    imports: [
        BaseModule,ChangesPopoverModule
    ],
    declarations: [
        AuditingModalComponent,AuditSearchPipe
    ],
    exports: [
        AuditingModalComponent
    ]
})
export class AuditingModalComponentModule { }
