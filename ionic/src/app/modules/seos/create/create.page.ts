import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { ImageCroppedEvent } from 'ngx-image-cropper';

import { Image } from '../../images/image';
import { Seo } from '../seo';

import { SeoService } from '../seo.service';
import { HelperService } from 'src/app/base/helper.service';
import { ImageService } from '../../images/image.service';

@Component({
    selector: 'app-create',
    templateUrl: './create.page.html',
    styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
    @ViewChild(IonContent, { static: false }) content: IonContent;

    id: number;
    seo: Seo = new Seo();
    loading: boolean = false;
    editing: boolean = false;

    imageChangedEvent: any = '';
    croppedImage: any = '';

    url_s3: string = this.seoService.url_s3;

    constructor(
        private helperService: HelperService,
        private imageService: ImageService,
        private seoService: SeoService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.seo = new Seo();
    }

    ngOnInit() {}

    ionViewWillEnter() {
        this.seo = new Seo();
        this.id = this.id = this.route.snapshot.paramMap.get('id')
            ? parseInt(this.route.snapshot.paramMap.get('id'))
            : null;
        if (this.id) {
            this.editing = true;
            this.get();
        }
    }

    get() {
        this.seoService.find(['image'], { id: this.id }).then(
            async (data: any) => {
                this.seo = new Seo(data.seo);
                if (this.seo.image == null) {
                    this.seo.image = new Image();
                }
            },
            (error: any) => {
                this.helperService.responseErrors(error);
            }
        );
    }

    save() {
        if (!this.seo.image.path && !this.seo.image.base64) {
            this.helperService.toast('danger', 'Imagem é obrigatório.');
            return;
        }

        this.helperService.loading('Salvando');

        if (this.seo.id > 0) {
            this.update();
        } else {
            this.store();
        }
    }

    store() {
        this.seoService.store(this.seo).then(
            (data: any) => {
                this.helperService.loading_dismiss();
                if (data.error) {
                    this.helperService.toast('danger', data.error_message);
                    return false;
                }
                this.helperService.toast('success', 'Salvo com sucesso!');
                this.router.navigate(['seos']);
            },
            (error: any) => {
                this.helperService.loading_dismiss();
                this.helperService.responseErrors(error);
            }
        );
    }

    update() {
        this.seoService.update(this.seo).then(
            (data: any) => {
                this.helperService.loading_dismiss();
                if (data.error) {
                    this.helperService.toast('danger', data.error_message);
                    return false;
                }
                this.helperService.toast('success', 'Alterado com sucesso!');
                this.router.navigate(['seos']);
            },
            (error: any) => {
                this.helperService.loading_dismiss();
                this.helperService.responseErrors(error);
            }
        );
    }

    pushImage() {
        this.seo.image = new Image({ base64: this.croppedImage });
        this.imageChangedEvent = null;
        this.croppedImage = null;
    }

    fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
    }

    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
    }

    imageLoaded() {}

    cropperReady() {}

    loadImageFailed() {
        this.helperService.toast('danger', 'Formato de imagem não suportada.');
    }

    get_thumb(image: any, prefix: string) {
        return image.path.replace(
            '/' + image.imageable_id + '_',
            '/' + prefix + image.imageable_id + '_'
        );
    }

    async removeImage(image: Image, index: number, eventPopover: any) {
        let popover = await this.helperService.listPopover(
            eventPopover,
            'Tem certeza?',
            [
                {
                    text: 'voltar',
                    color: 'grey',
                    value: false,
                },
                {
                    text: 'remover',
                    color: 'danger',
                    value: true,
                },
            ]
        );

        popover.onDidDismiss().then(async (popoverData) => {
            if (popoverData.data === true) {
                if (image.id > 0) {
                    this.destroyImage(image, index);
                } else {
                    this.helperService.toast('success', 'Removido com sucesso');
                    this.seo.image = new Image();
                }
            }
        });

        popover.present();
    }

    async destroyImage(image: Image, index: number) {
        this.imageService.destroy(image.id).then(
            (data: any) => {
                if (data.error) {
                    this.helperService.toast('error', data.message);
                }
                this.helperService.toast('success', 'Removido com sucesso');
                this.seo.image = new Image();
            },
            (error: any) => {
                this.helperService.responseErrors(error);
            }
        );
    }
}
