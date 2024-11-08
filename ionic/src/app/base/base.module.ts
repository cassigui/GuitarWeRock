import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { IfAuthModule } from '../modules/account/auth/if-auth/if-auth.module';

import { NgxMaskModule } from 'ngx-mask';
import {
    CurrencyMaskConfig,
    CURRENCY_MASK_CONFIG,
    CurrencyMaskModule,
} from 'ng2-currency-mask';
import { DocPipe } from '../pipes/doc.pipe';
import { PhonePipe } from '../pipes/phone.pipe';
import { ConfirmComponent } from '../components/confirm/confirm.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MultipleSelectComponent } from '../components/multiple-select/multiple-select.component';
import { UserMultipleSelectionComponent } from '../modules/account/users/user-muliple-selection/user-muliple-selection.component';
import { SelectComponent } from '../components/select/select.component';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
    align: 'right',
    allowNegative: true,
    decimal: ',',
    precision: 2,
    prefix: 'R$ ',
    suffix: '',
    thousands: '.',
};

@NgModule({
    declarations: [
        DocPipe,
        PhonePipe,
        ConfirmComponent,
        MultipleSelectComponent,
        UserMultipleSelectionComponent,
        SelectComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        IfAuthModule,
        NgxMaskModule.forRoot(),
        CurrencyMaskModule,
        FontAwesomeModule,
    ],
    entryComponents: [
        ConfirmComponent,
        MultipleSelectComponent,
        UserMultipleSelectionComponent,
        SelectComponent,
    ],
    exports: [
        CommonModule,
        FormsModule,
        IonicModule,
        IfAuthModule,
        NgxMaskModule,
        CurrencyMaskModule,
        DocPipe,
        PhonePipe,
        FontAwesomeModule,
    ],
    providers: [
        { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
    ],
})
export class BaseModule {}
