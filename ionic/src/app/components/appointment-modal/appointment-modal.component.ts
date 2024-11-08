import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

import { Appointment } from 'src/app/modules/appointments/appointment';
import { Datepicker } from '../datepicker/datepicker';
// import { Modality } from 'src/app/modules/modalities/modality';
import { SelectComponent } from '../select/select.component';

import { AppointmentService } from 'src/app/modules/appointments/appointment.service';
import { HelperService } from 'src/app/base/helper.service';
// import { ModalityService } from 'src/app/modules/modalities/modality.service';
import { Customer } from 'src/app/modules/customers/customer';
// import { CustomerSelectComponent } from '../customer-select/customer-select.component';
// import { AppointmentCategory } from 'src/app/modules/appointment-categories/appointment-category';
// import { AppointmentCategoryService } from 'src/app/modules/appointment-categories/appointment-category.service';

@Component({
    selector: 'app-appointment-modal',
    templateUrl: './appointment-modal.component.html',
})
export class AppointmentModalComponent implements OnInit {
    appointment: Appointment = new Appointment();
    sending_data = false;
    datepicker: Datepicker = new Datepicker();
    // modalities: Array<Modality> = [];
    // categories: Array<AppointmentCategory> = [];

    constructor(
        private navParams: NavParams,
        private modal_controller: ModalController,
        private appointment_service: AppointmentService,
        private helper_service: HelperService // private modalityService: ModalityService, // private categoryService: AppointmentCategoryService
    ) {}

    ngOnInit() {
        this.appointment = this.navParams.get('appointment');
        // this.getModalities();
        // this.getCategories();
    }

    close() {
        this.modal_controller.dismiss();
    }

    // async selectClinicCustomer() {
    //     const modal = await this.modal_controller.create({
    //         component: CustomerSelectComponent,
    //     });

    //     await modal.present();

    //     const { data } = await modal.onWillDismiss();

    //     if (data) {
    //         console.log(data);
    //         this.appointment.appointable = new Customer(data);
    //         this.appointment.appointable_id = this.appointment.appointable.id;
    //         this.appointment.appointable_type = 'customers';
    //         this.appointment.appointment_status_id = 1;
    //     }
    // }

    save() {
        this.helper_service.loading('Salvando');

        this.appointment_service.storeOrUpdate(this.appointment).then(
            (response: any) => {
                if (!response.error) {
                    this.helper_service.loading_dismiss();
                    this.appointment = new Appointment(response.appointment);
                    this.dismiss(this.appointment);
                }
                this.helper_service.toast(
                    !response.error ? 'success' : 'warning',
                    response.message
                );
            },
            (error: any) => {
                this.helper_service.responseErrors(error);
                this.helper_service.loading_dismiss();
            }
        );
    }

    dismiss(appointment: Appointment = null) {
        this.modal_controller.dismiss(appointment);
    }

    cancel() {
        this.modal_controller.dismiss();
    }

    // getModalities() {
    //     this.modalityService.get([], {}).then(
    //         (response: any) =>
    //             (this.modalities = response.modalities.map(
    //                 (modality) => new Modality(modality)
    //             )),
    //         (error: any) => this.helper_service.responseErrors(error)
    //     );
    // }

    // getCategories() {
    //     this.categoryService.get([], {}).then(
    //         (response: any) =>
    //             (this.categories = response.appointment_categories.map(
    //                 (category) => new AppointmentCategory(category)
    //             )),
    //         (error: any) => this.helper_service.responseErrors(error)
    //     );
    // }

    // async showModalityModal() {
    //     const modal = await this.modal_controller.create({
    //         component: SelectComponent,
    //         componentProps: {
    //             options: this.modalities,
    //             title: 'Escolha uma modalidade',
    //         },
    //     });

    //     await modal.present();

    //     const { data } = await modal.onWillDismiss();

    //     if (data) {
    //         this.appointment.modality = new Modality(data);
    //         this.appointment.modality_id = data.id;
    //     }
    // }

    // async showCategoryModal() {
    //     const modal = await this.modal_controller.create({
    //         component: SelectComponent,
    //         componentProps: {
    //             options: this.categories,
    //             title: 'Escolha um tipo de agendamento',
    //         },
    //     });

    //     await modal.present();

    //     const { data } = await modal.onWillDismiss();

    //     if (data) {
    //         this.appointment.appointment_category = new AppointmentCategory(
    //             data
    //         );
    //         this.appointment.appointment_category_id = data.id;
    //     }
    // }
}
