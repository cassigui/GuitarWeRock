import { NgModule } from '@angular/core';
import { BaseModule } from 'src/app/base/base.module';


import { ChangesPopoverComponent } from './changes-popover.component';

@NgModule({
    declarations: [ChangesPopoverComponent],
    exports: [ChangesPopoverComponent],
    imports: [BaseModule]
})
export class ChangesPopoverModule {}
