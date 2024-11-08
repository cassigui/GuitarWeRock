import { NgModule } from '@angular/core';
import { BaseModule } from 'src/app/base/base.module';
import { TimelineComponent } from './timeline.component';

@NgModule({
  imports: [
    BaseModule,
  ],
  declarations: [TimelineComponent],
  exports: [TimelineComponent]
})

export class TimelineComponentModule { }