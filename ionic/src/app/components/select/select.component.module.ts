import { NgModule } from '@angular/core';
import { BaseModule } from 'src/app/base/base.module';
import { SelectComponent } from './select.component';

@NgModule({
  imports: [
    BaseModule,
  ],
  declarations: [SelectComponent],
  exports: [SelectComponent]
})

export class SelectComponentModule { }