import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CKEditorModule } from 'ng2-ckeditor';
import { IonicModule } from '@ionic/angular';

import { AuthGuard } from '../account/auth/auth.guard';

import { ConfigsPage } from './configs.page';

const routes: Routes = [
    {
        path: '',
        data: {
            auth: [{ view: 'configs' }, { update: 'configs' }],
        },
        component: ConfigsPage,
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        CKEditorModule,
    ],
    declarations: [ConfigsPage],
})
export class ConfigsPageModule {}
