import { NgModule } from '@angular/core';
import { BaseModule } from 'src/app/base/base.module';
import { SingleCropperComponent } from './single-cropper.component';

import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
    imports: [BaseModule,ImageCropperModule],
    declarations: [SingleCropperComponent],
    exports: [SingleCropperComponent],
})
export class SingleCropperComponentModule {}
