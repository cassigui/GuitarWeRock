import { Component, OnInit, Input } from '@angular/core';
import { HelperService } from 'src/app/base/helper.service';
import { ModalController} from '@ionic/angular';
import { Timeline } from 'src/app/modules/timelines/timeline';
import { TimelineService } from 'src/app/modules/timelines/timeline.service';
import * as moment from 'moment';

@Component({
    selector: 'timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnInit {
    @Input() timelines: Timeline[] = [];
    @Input() timelineable_type: string = null;
    @Input() timelineable_id: number = null;

    timeline_input: string = '';

    constructor(
        private helperService: HelperService,
        private modalController: ModalController,
        private timelineService: TimelineService
        ) {        
    }

    ngOnInit() {
    }

    async addTimelines(){

        if(this.timeline_input != ''){
            this.helperService.loading('Enviando');
            var timeline_temp = new Timeline({message: this.timeline_input, timelineable_type: this.timelineable_type, timelineable_id: this.timelineable_id, created_at: moment().format('YYYY-MM-DD HH:mm')});
            
            this.timelineService.store(timeline_temp).then(
                (data: any) => {
                    this.helperService.loading_dismiss();
                    if (data.error) {
                        this.helperService.toast('danger', data.error_message);
                        return false;
                    }

                    this.timelines.unshift(timeline_temp)
                    this.timeline_input = '';
                    timeline_temp = null;

                    this.helperService.toast('success', 'Notificação enviada com sucesso!');
                },
                (error: any) => {
                    this.helperService.loading_dismiss();
                    this.helperService.responseErrors(error);
                }
            )
        }else{
            this.helperService.toast('warning', 'A mensagem está vazia');
        }
    }

    async dismiss(value: any) {
        await this.modalController.dismiss(value);
    }
}
