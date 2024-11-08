import { NgModule } from '@angular/core';
import { SearchFilterPipe } from 'src/app/pipes/search-filter.pipe';
import { TagProjectPipe } from './tagProject.pipe';

@NgModule({
    declarations: [SearchFilterPipe,TagProjectPipe],
    exports: [SearchFilterPipe,TagProjectPipe],
    imports: [],
})
export class PipesModule {}
