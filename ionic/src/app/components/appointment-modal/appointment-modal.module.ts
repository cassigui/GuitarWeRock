import { NgModule } from '@angular/core';
import { BaseModule } from 'src/app/base/base.module';
import { Ionic4DatepickerModule } from '../datepicker/ionic4-datepicker.module';
import { AppointmentModalComponent } from './appointment-modal.component';

@NgModule({
    declarations: [
        AppointmentModalComponent
    ],
    entryComponents: [
        AppointmentModalComponent
    ],
    imports: [
        BaseModule,
        Ionic4DatepickerModule
    ],
    exports: [AppointmentModalComponent]
})
export class AppointmentModalModule { }
