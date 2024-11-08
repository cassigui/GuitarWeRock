import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'src/app/modules/account/auth/auth.guard';

const routes: Routes = [
    {
        path: '',
        data: {
            auth: [{ view: 'users' }]
        },
        loadChildren: () => import('./index/index.module').then(mod => mod.IndexPageModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'create',
        data: {
            auth: [{ create: 'users' }],
        },
        canActivate: [AuthGuard],
        loadChildren: () => import('./create/create.module').then(mod => mod.CreatePageModule),
    },
    {
        path: 'reset-password',
        loadChildren: () => import('./reset/reset.module').then(mod => mod.ResetPageModule),
    },
    {
        path: ':id',
        data: {
            auth: [{ update: 'users' }],
        },
        canActivate: [AuthGuard],
        loadChildren: () => import('./create/create.module').then(mod => mod.CreatePageModule),
    },
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserModule { }
