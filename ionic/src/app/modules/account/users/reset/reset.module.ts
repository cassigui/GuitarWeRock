import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResetPage } from './reset.page';
import { BaseModule } from 'src/app/base/base.module';

const routes: Routes = [
    {
        path: '',
        component: ResetPage
    }
];

@NgModule({
    imports: [
        BaseModule,
        RouterModule.forChild(routes)
    ],
    declarations: [ResetPage]
})
export class ResetPageModule { }
