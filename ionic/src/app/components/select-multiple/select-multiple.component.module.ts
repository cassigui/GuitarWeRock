
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SelectMultipleComponent } from './select-multiple.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  declarations: [SelectMultipleComponent],
  exports: [SelectMultipleComponent]
})

export class SelectMultipleComponentModule { }
