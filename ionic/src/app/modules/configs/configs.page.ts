import { Component, OnInit } from '@angular/core';

import { ConfigService } from './config.service';
import { HelperService } from 'src/app/base/helper.service';

@Component({
    selector: 'app-configs',
    templateUrl: './configs.page.html',
    styleUrls: ['./configs.page.scss'],
})
export class ConfigsPage implements OnInit {
    config: any = {
        contract_threshold: null,
    };
    ckeditor_config: any = {
        allowedContent: true,
        toolbar: [
            [
                'Bold',
                'Italic',
                'Underline',
                'Strike',
                'Subscript',
                'Superscript',
                'RemoveFormat',
                '-',
                'NumberedList',
                'BulletedList',
            ],
            ['Table', 'FontSize', 'TextColor', 'BGColor'],
            ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
            ['Link', 'Unlink', 'Source'],
        ],
        removePlugins: 'elementspath',
        resize_enabled: false,
        extraPlugins: 'font,divarea,placeholder',
        contentsCss: [
            "body {font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;}",
        ],
        autoParagraph: false,
        enterMode: 2,
        height: 100,
    };
    ckeditor_config2: any = {
        allowedContent: true,
        toolbar: [],
        removePlugins: 'elementspath',
        resize_enabled: false,
        extraPlugins: 'font,divarea,placeholder',
        contentsCss: [
            "body {font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;}",
        ],
        autoParagraph: false,
        enterMode: 2,
        height: 50,
    };
    ckeditor_config3: any = {
        allowedContent: true,
        toolbar: [
            [
                'Bold',
                'Italic',
                'Underline',
                'Strike',
                'Subscript',
                'Superscript',
                'RemoveFormat',
                '-',
                'NumberedList',
                'BulletedList',
            ],
            ['Table', 'FontSize', 'TextColor', 'BGColor'],
            ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
            ['Link', 'Unlink', 'Source'],
        ],
        removePlugins: 'elementspath',
        resize_enabled: false,
        extraPlugins: 'font,divarea,placeholder',
        contentsCss: [
            "body {font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;}",
        ],
        autoParagraph: false,
        enterMode: 2,
        height: 130,
    };
    page = 'general';

    constructor(
        private config_service: ConfigService,
        private helperService: HelperService
    ) {}

    ngOnInit() {
        this.get();
    }

    onToggleColorTheme(change: string){
        if(change == 'dark'){
            document.body.setAttribute('color-theme', 'dark');
        }
        else{
            document.body.setAttribute('color-theme', '');
        }
      }

    get() {
        this.config_service.get().then(
            (data: any) => {
                if (data.error) {
                    this.helperService.toast('danger', data.message);
                    return;
                }
                this.config = data.config;
            },
            (error: any) => {
                this.helperService.responseErrors(error);
            }
        );
    }

    save() {
        this.config_service.update(this.config).then(
            (data: any) => {
                if (data.error) {
                    this.helperService.toast('danger', data.message);
                    return;
                }
                this.config = data.config;
                this.helperService.toast('success', data.message);
            },
            (error: any) => {
                this.helperService.responseErrors(error);
            }
        );
    }
}
