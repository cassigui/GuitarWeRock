import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { IonicModule,} from '@ionic/angular';
import { DragulaModule } from 'ng2-dragula';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgxMaskModule, IConfig} from 'ngx-mask'

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

import {
    FontAwesomeModule,
    FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

import {
    HashLocationStrategy,
    LocationStrategy,
    registerLocaleData,
} from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CKEditorModule } from 'ng2-ckeditor';
import ptBr from '@angular/common/locales/pt';

registerLocaleData(ptBr);

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        FontAwesomeModule,
        CKEditorModule,
        DragulaModule.forRoot(),
        NgxMaskModule.forRoot(),
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: LOCALE_ID, useValue: 'pt' },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor(library: FaIconLibrary) {
        library.addIconPacks(fas, fab, far);
    }
}
