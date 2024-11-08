import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';
import { BaseModule } from 'src/app/base/base.module';
import { AuthGuard } from '../account/auth/auth.guard';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: DashboardPage
    }
];

@NgModule({
    imports: [
        BaseModule,
        NgxChartsModule,
        RouterModule.forChild(routes),
    ],
    declarations: [DashboardPage]
})
export class DashboardPageModule { }
