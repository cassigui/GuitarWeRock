import { NgModule } from '@angular/core';
import { AddressFormComponent } from './address-form.component';
import { BaseModule } from 'src/app/base/base.module';

@NgModule({
    declarations: [AddressFormComponent],
    imports: [BaseModule],
    exports: [AddressFormComponent],
})
export class AddressingModule {}
