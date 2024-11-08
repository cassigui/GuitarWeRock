import { NgModule } from '@angular/core';
import { BaseModule } from 'src/app/base/base.module';
import { MultipleSelectComponent } from './multiple-select.component';

@NgModule({
    imports: [BaseModule],
    declarations: [MultipleSelectComponent],
    exports: [MultipleSelectComponent],
})
export class SelectComponentModule {}
