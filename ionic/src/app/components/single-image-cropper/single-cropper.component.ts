import { Component, OnInit, Input, Output } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';

import { Image } from 'src/app/modules/images/image';

import { HelperService } from 'src/app/base/helper.service';

@Component({
    selector: 'Single-Cropper',
    templateUrl: './single-cropper.component.html',
    styleUrls: ['./single-cropper.component.scss'],
})
export class SingleCropperComponent implements OnInit {
    @Input() @Output() public image: Image;
    @Input() public aspectRatio: number;

    public imageChangedEvent: Event = null;
    public croppedImage: string = '';

    public loading: Boolean = false;

    constructor(
        private helper_service: HelperService,
    ) { }

    ngOnInit() {
    }

    // IMAGE CROP
    pushImage() {
        this.image.base64 = this.croppedImage;
        this.imageChangedEvent = null;
        this.croppedImage = null;
    }

    fileChangeEvent(event: Event): void {
        this.imageChangedEvent = event;
    }

    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
    }

    imageLoaded() { }

    cropperReady() { }

    loadImageFailed() {
        this.helper_service.toast('danger', 'Formato de imagem não suportada.');
    }

}
