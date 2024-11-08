import { NgModule } from '@angular/core';
import { BaseModule } from 'src/app/base/base.module';
import { CitiesMultipleSelectComponent } from './cities-multiple-select.component';

@NgModule({
    imports: [BaseModule],
    declarations: [CitiesMultipleSelectComponent],
    exports: [CitiesMultipleSelectComponent],
})
export class CitiesMultipleSelectModule {}
