import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'src/app/modules/account/auth/auth.guard';
import { FormGuard } from 'src/app/components/form.guard';

const routes: Routes = [
    {
        data: {
            auth: [{ view: 'cities' }],
        },
        path: '',
        loadChildren: () =>
            import('./index/index.module').then((mod) => mod.IndexPageModule),
        canActivate: [AuthGuard],
    },
    {
        data: {
            auth: [{ create: 'cities' }],
        },
        path: 'create',
        canActivate: [AuthGuard],
        canDeactivate: [FormGuard],
        loadChildren: () =>
            import('./create/create.module').then(
                (mod) => mod.CreatePageModule
            ),
    },
    {
        data: {
            auth: [{ update: 'cities' }],
        },
        path: ':id',
        canActivate: [AuthGuard],
        canDeactivate: [FormGuard],
        loadChildren: () =>
            import('./create/create.module').then(
                (mod) => mod.CreatePageModule
            ),
    },
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CityModule {}
