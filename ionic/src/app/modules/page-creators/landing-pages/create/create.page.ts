import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent, ModalController } from '@ionic/angular';
import { ImageCroppedEvent } from 'ngx-image-cropper';

import { Image } from 'src/app/modules/images/image';
import { LandingPage } from '../landing-page';
import { PostableColumn } from '../../postable-columns/postable-column';
import { PostableSection } from '../../postable-sections/postable-section';
import { PostableType } from '../../postable-types/postable-type';
import { HelperService } from 'src/app/base/helper.service';
import { ImageService } from 'src/app/modules/images/image.service';
import { LandingPageService } from '../landing-page.service';
import { PostableColumnService } from '../../postable-columns/postable-column.service';
import { PostableSectionService } from '../../postable-sections/postable-section.service';
import { PostableTypeService } from '../../postable-types/postable-type.service';

import { Datepicker } from 'src/app/components/datepicker/datepicker';
import { Ionic4DatepickerModalComponent } from 'src/app/components/datepicker/ionic4-datepicker-modal/ionic4-datepicker-modal.component';
import * as moment from 'moment';
import { SelectComponent } from 'src/app/components/select/select.component';
import { SelectMultipleComponent } from 'src/app/components/select-multiple/select-multiple.component';

@Component({
    selector: 'app-create',
    templateUrl: './create.page.html',
    styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
    @ViewChild(IonContent, { static: false }) content: IonContent;

    id: number;
    page_category_id: number;
    landing_page: LandingPage;
    postable_types: PostableType[] = [];
    datepicker: Datepicker = new Datepicker;
    section_index: number;

    page = 'general';
    max_section_columns = 3;
    api_url: string;
    editing: boolean = false;
    loading: boolean = false;

    ckeditor_config: any = {
        allowedContent: true,
        toolbar: [
            ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', 'RemoveFormat', '-', 'NumberedList', 'BulletedList'],
            ['Table', 'FontSize', 'TextColor', 'BGColor'],
            ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
            ['Link', 'Unlink', 'Source'],
        ],
        removePlugins: 'elementspath',
        resize_enabled: false,
        extraPlugins: 'font,divarea,placeholder',
        contentsCss: ["body {font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;}"],
        autoParagraph: false,
        enterMode: 2
    };

    imageChangedEvent: any = '';
    croppedImage: any = '';

    url_s3: string = this.landingPageService.url_s3;

    page_category: any = [
        '-',
        'Base',
    ];

    constructor(
        private helperService: HelperService,
        private imageService: ImageService,
        private landingPageService: LandingPageService,
        private modalController: ModalController,
        private postableColumnService: PostableColumnService,
        private postableSectionService: PostableSectionService,
        private postableTypeService: PostableTypeService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        this.api_url = this.landingPageService.api_url;
        this.landing_page = new LandingPage;
        this.datepicker = new Datepicker({ language: "pt" });
    }

    ngOnInit() {
    }

    ionViewWillEnter() {
        this.landing_page = new LandingPage;

        this.landing_page.page_category_id = this.page_category_id = parseInt(this.route.snapshot.paramMap.get("page_category_id"));
        if (!this.page_category_id) {
            this.router.navigateByUrl('dashboard');
            this.helperService.toast('danger', 'Rota não habilitada.');
        }

        this.id = this.route.snapshot.paramMap.get("id") ? parseInt(this.route.snapshot.paramMap.get("id")) : null;
        if (this.id) {
            this.editing = true;
            this.get();
        }

        this.getPostableTypes();
        this.addSection();
    }

    changeSegment(event: any) {
        this.page = event.detail.value;
    }

    addSection() {
        let section_index = this.landing_page.postable_sections.length;
        this.landing_page.postable_sections.push(new PostableSection)
        this.landing_page.postable_sections[section_index].postable_columns.push(new PostableColumn)
        setTimeout(() => {
            this.content.scrollToBottom();
        }, 200)
    }

    async removeSection(eventPopover: any, section_index: number) {
        let popover = await this.helperService.listPopover(eventPopover, 'Tem certeza?', [
            {
                text: 'voltar',
                color: 'medium',
                value: false
            },
            {
                text: 'remover',
                color: 'danger',
                value: true
            },
        ]);

        popover.onDidDismiss().then(async (popoverData) => {
            if (popoverData.data === true) {
                if (this.landing_page.postable_sections[section_index].id > 0) {
                    this.helperService.loading('Removendo');
                    let response = await this.destroySection(this.landing_page.postable_sections[section_index].id);
                    if (response) {
                        this.landing_page.postable_sections.splice(section_index, 1);
                    }
                } else {
                    this.landing_page.postable_sections.splice(section_index, 1);
                }
                this.helperService.toast('success', 'Removido com sucesso');
            }
        });

        popover.present();
    }

    async destroySection(section_id: number) {
        return await this.postableSectionService.destroy(section_id)
            .then(
                (data: any) => {
                    this.helperService.loading_dismiss();
                    if (data.error) {
                        this.helperService.toast('error', data.message);
                        return false;
                    }
                    return true;
                },
                (error: any) => {
                    this.helperService.loading_dismiss();
                    this.helperService.responseErrors(error);
                    return false;
                }
            )
    }

    moveSection(from: number, to: number) {
        if (to < 0 || to >= this.landing_page.postable_sections.length) return false;
        let obj = this.landing_page.postable_sections[to];
        this.landing_page.postable_sections[to] = this.landing_page.postable_sections[from];
        this.landing_page.postable_sections[from] = obj;
    }

    addColumn(section_index: number) {
        if (this.landing_page.postable_sections[section_index].postable_columns.length == this.max_section_columns) {
            this.helperService.toast('secondary', 'Permitido no máximo ' + this.max_section_columns + ' colunas por seção.')
            return;
        }
        this.landing_page.postable_sections[section_index].postable_columns.push(new PostableColumn);
    }

    async removeColumn(eventPopover: any, section_index: number, column_index: number) {
        let popover = await this.helperService.listPopover(eventPopover, 'Tem certeza?', [
            {
                text: 'voltar',
                color: 'grey',
                value: false
            },
            {
                text: 'remover',
                color: 'danger',
                value: true
            },
        ]);

        popover.onDidDismiss().then(async (popoverData) => {
            if (popoverData.data === true) {
                if (this.landing_page.postable_sections[section_index].postable_columns[column_index].id > 0) {
                    this.helperService.loading('Removendo');
                    let response = await this.destroyColumn(this.landing_page.postable_sections[section_index].postable_columns[column_index].id);
                    if (response) {
                        this.landing_page.postable_sections[section_index].postable_columns.splice(column_index, 1);
                    }
                } else {
                    this.landing_page.postable_sections[section_index].postable_columns.splice(column_index, 1);
                }
                this.helperService.toast('success', 'Removido com sucesso');
            }
        });

        popover.present();
    }

    async destroyColumn(column_id: number) {
        return await this.postableColumnService.destroy(column_id)
            .then(
                (data: any) => {
                    this.helperService.loading_dismiss();
                    if (data.error) {
                        this.helperService.toast('error', data.message);
                        return false;
                    }
                    return true;
                },
                (error: any) => {
                    this.helperService.loading_dismiss();
                    this.helperService.responseErrors(error);
                    return false;
                }
            )
    }

    moveColumn(section_index: number, from: number, to: number) {
        if (to < 0 || to >= this.landing_page.postable_sections[section_index].postable_columns.length) return false;
        let obj = this.landing_page.postable_sections[section_index].postable_columns[to];
        this.landing_page.postable_sections[section_index].postable_columns[to] = this.landing_page.postable_sections[section_index].postable_columns[from];
        this.landing_page.postable_sections[section_index].postable_columns[from] = obj;
    }

    async menuColumns($eventPopover: any, section_index: number, column_index: number) {
        let popover = await this.helperService.listPopover($eventPopover, 'Opções', await this.setMenuColumns());

        popover.onDidDismiss().then((response) => {
            if (response.data) {
                switch (response.data) {
                    case 'remove':
                        this.removeColumn($eventPopover, section_index, column_index);
                        break;

                    default:
                        this.landing_page.postable_sections[section_index].postable_columns[column_index].postable_type_id = response.data;
                        break;
                }
            }
        });

        popover.present();
    }

    async get() {
        await this.landingPageService.find(['postable_sections.postable_columns.image', 'image', 'tags', 'autor'], { id: this.id })
            .then(
                (data: any) => {
                    this.landing_page = new LandingPage(data.landing_page);
                    if (this.landing_page.image == null) {
                        this.landing_page.image = new Image;
                    }
                },
                (error: any) => {
                    this.helperService.responseErrors(error)
                }
            );
    }

    getPostableTypes() {
        this.postableTypeService.get()
            .then(
                (data: any) => {
                    if (data.error) {
                        this.helperService.toast('error', data.message);
                        return;
                    }
                    this.postable_types = data.postable_types;
                },
                (error: any) => {
                    this.helperService.responseErrors(error);
                }
            )
    }
   

    save() {
        if (!this.landing_page.image.path && !this.landing_page.image.base64 && (this.landing_page.page_category_id) === 1) {
            this.helperService.toast('danger', 'Imagem é obrigatório.');
            return;
        }
        this.landing_page.array_tags = []
        if(this.landing_page.tags.length > 0){
            for(let tag of this.landing_page.tags){
                this.landing_page.array_tags.push(tag.id)
            }
        }
        this.helperService.loading('Salvando');
        if (this.landing_page.id > 0) {
            this.update();
        } else {
            this.store();
        }

    }

    store() {
        this.landingPageService.store(this.landing_page)
            .then(
                (data: any) => {
                    console.log(data);
                    this.helperService.loading_dismiss();
                    if (data.error) {
                        this.helperService.toast('danger', data.error_message);
                        return false;
                    }
                    this.helperService.toast('success', 'Salvo com sucesso!');
                    // this.landing_page = new LandingPage(data.landing_page);
                    this.router.navigate(['landing-pages/' + this.page_category_id]);
                },
                (error: any) => {
                    this.helperService.loading_dismiss();
                    this.helperService.responseErrors(error);
                }
            );
    }

    update() {
        this.landingPageService.update(this.landing_page)
            .then(
                (data: any) => {
                    console.log(data);
                    this.helperService.loading_dismiss();
                    if (data.error) {
                        this.helperService.toast('danger', data.error_message);
                        return false;
                    }
                    this.helperService.toast('success', 'Alterado com sucesso!');
                    // this.landing_page = new LandingPage(data.landing_page);


                    this.router.navigate(['landing-pages/' + this.page_category_id]);


                },
                (error: any) => {
                    this.helperService.loading_dismiss();
                    this.helperService.responseErrors(error);
                }
            );
    }

    async setMenuColumns() {
        let _items = this.postable_types.map(i => {
            return {
                id: i.id,
                value: i.id.toString(),
                color: '#777777',
                text: i.name,
            }
        });

        _items.push({
            id: 1,
            value: 'remove',
            color: '#FF0000',
            text: 'Remover coluna'
        });

        return _items;
    }

    // IMAGE
    setImage(section_index: number = null, column_index: number = null) {
        if (section_index != null && column_index != null) {
            this.landing_page.postable_sections[section_index].postable_columns[column_index].image = new Image({ base64: this.landing_page.postable_sections[section_index].postable_columns[column_index]._image.croppedImage });
            this.landing_page.postable_sections[section_index].postable_columns[column_index]._image.imageChangedEvent = null;
            this.landing_page.postable_sections[section_index].postable_columns[column_index]._image.croppedImage = null;
        } else {
            this.landing_page.image = new Image({ base64: this.landing_page._image.croppedImage });
            this.landing_page._image.imageChangedEvent = null;
            this.landing_page._image.croppedImage = null;
        }
    }


    fileChangeEvent(event: any, section_index: number = null, column_index: number = null): void {
        if (section_index != null && column_index != null) {
            this.landing_page.postable_sections[section_index].postable_columns[column_index]._image.imageChangedEvent = event;
        } else {
            this.landing_page._image.imageChangedEvent = event;
        }
    }

    imageCropped(event: ImageCroppedEvent, section_index: number = null, column_index: number = null) {
        if (section_index != null && column_index != null) {
            this.landing_page.postable_sections[section_index].postable_columns[column_index]._image.croppedImage = event.base64;
        } else {
            this.landing_page._image.croppedImage = event.base64;
        }
    }

    imageLoaded() { }

    cropperReady() { }

    loadImageFailed() {
        // this.helperService.toast('danger', 'Formato de imagem não suportada.');
        console.log('formato de imagem não suportada.')
    }

    async removeImage(image: Image, index: number, eventPopover: any) {
        let popover = await this.helperService.listPopover(eventPopover, 'Tem certeza?', [
            {
                text: 'voltar',
                color: 'success',
                value: false
            },
            {
                text: 'remover',
                color: 'danger',
                value: true
            },
        ]);

        popover.onDidDismiss().then(async (popoverData) => {
            if (popoverData.data === true) {
                if (image.id > 0) {
                    this.destroyImage(image, index);
                } else {
                    this.helperService.toast('success', 'Removido com sucesso');
                }
            }
        });

        popover.present();
    }

    async destroyImage(image: Image, index: number) {
        this.imageService.destroy(image.id)
            .then(
                (data: any) => {
                    if (data.error) {
                        this.helperService.toast('error', data.message);
                    }
                    this.helperService.toast('success', 'Removido com sucesso');
                },
                (error: any) => {
                    this.helperService.responseErrors(error);
                }
            )
    }

    async openDatePicker(input: any) {
        const datePickerModal = await this.modalController.create({
            component: Ionic4DatepickerModalComponent,
            cssClass: 'li-ionic4-datePicker',
            componentProps: {
                'objConfig': this.datepicker,
                'selectedDate': this.landing_page[input] || moment(),
            }
        });
        await datePickerModal.present();

        datePickerModal.onDidDismiss()
            .then((response) => {
                if (response.data.date != 'Invalid date') {
                    this.landing_page[input] = moment(response.data.date);
                }
            });
    }

    debug() {
        // console.log(this.postable_types)
    }

}
