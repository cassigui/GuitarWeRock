import { NgModule } from '@angular/core';
import { BaseModule } from 'src/app/base/base.module';
import { Routes, RouterModule } from '@angular/router';

import { CreatePage } from './create.page';

import { CKEditorModule } from 'ng2-ckeditor';
import { ImageCropperModule } from 'ngx-image-cropper';
import { SelectComponentModule } from 'src/app/components/select/select.component.module';
import { SelectMultipleComponentModule } from 'src/app/components/select-multiple/select-multiple.component.module';
import { Ionic4DatepickerModule } from 'src/app/components/datepicker/ionic4-datepicker.module';

const routes: Routes = [
    {
        path: '',
        component: CreatePage
    }
];

@NgModule({
    imports: [
        BaseModule,
        SelectComponentModule,
        SelectMultipleComponentModule,
        RouterModule.forChild(routes),
        CKEditorModule,
        ImageCropperModule,
        Ionic4DatepickerModule
    ],
    declarations: [CreatePage]
})
export class CreatePageModule { }
