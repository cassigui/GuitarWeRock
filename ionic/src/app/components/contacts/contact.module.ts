import { NgModule } from '@angular/core';
import { ContactComponent } from './contact.component';
import { BaseModule } from 'src/app/base/base.module';

@NgModule({
    declarations: [ContactComponent],
    imports: [BaseModule],
    exports: [ContactComponent],
})
export class ContactModule {}
