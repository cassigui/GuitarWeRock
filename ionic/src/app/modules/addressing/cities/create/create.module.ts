import { NgModule } from '@angular/core';
import { BaseModule } from 'src/app/base/base.module';
import { Routes, RouterModule } from '@angular/router';

import { CreatePage } from './create.page';
// import { AutocompleteModule } from 'ng2-input-autocomplete';

const routes: Routes = [
    {
        path: '',
        component: CreatePage
    }
];

@NgModule({
    imports: [
        BaseModule,
        RouterModule.forChild(routes),
        // AutocompleteModule.forRoot()
    ],
    declarations: [CreatePage],
})
export class CreatePageModule { }
