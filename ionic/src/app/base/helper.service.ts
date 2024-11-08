import { Attribute, Injectable } from '@angular/core';
import { ToastController, LoadingController, PopoverController, AlertController } from '@ionic/angular';

import { Router } from '@angular/router';
import { UserService } from '../modules/account/users/user.service';
import { ConfirmComponent } from '../components/confirm/confirm.component';

@Injectable({
    providedIn: 'root'
})
export class HelperService {

    loader: any;

    constructor(
        private router: Router,
        private loadingController: LoadingController,
        private popoverController: PopoverController,
        private alertController: AlertController,
        private toastr: ToastController,
        private userService: UserService,
    ) {
    }

    responseErrors(error: any) {
        if (error.status == 401) {
            if (this.router.url == '/auth/login') {
                this.toast('danger', 'Usuário e/ou senha inválidos.');
            } else {
                this.userService.unsetUser();
                this.router.navigate(['/auth/login']);
                this.toast('primary', 'Sua sessão expirou, insira suas credenciais novamente.');
            }
        } else if (error.status == 429) {
            this.toast('warning', 'Muitas requisições em andamento. Aguarde.');
        } else if (error.error.error == 'token_not_provided') {
            this.toast('danger', 'Você não forneceu um token válido.');
            this.router.navigate(['/auth/login']);
        } else if (error) {
            this.toast('warning', error.error.message);
        } else {
            this.toast('danger', 'Erro ao processar solicitação!');
        }
    }

    async toast(color: string, message: string, duration: number = 2000, position: any = 'top') {
        const toast = await this.toastr.create({
            message: message,
            duration: duration,
            color: color,
            mode: 'ios',
            position: position,
            buttons: [
                {
                    icon: 'close',
                    role: 'cancel',
                    handler: () => {
                    }
                }
            ]
        });
        toast.present();
    }

    async toastResponse(response: any) {
        return this.toast(response.error ? 'warning' : 'success', response.message);
    }

    async listPopover(eventPopover: any, title: string, buttons: Array<Object>) {
        return await this.popoverController.create({
            component: ConfirmComponent,
            event: eventPopover,
            mode: 'ios',
            componentProps: {
                title: title,
                buttons: buttons,
            }
        });
    }

    async loading(message: string) {
        this.loader = true;
        await this.loadingController.create({
            spinner: 'lines',
            message: message,
            translucent: false,
        })
            .then(
                (l: any) => {
                    l.present().then(() => {
                        if (!this.loader) {
                            l.dismiss();
                        }
                    });
                }
            )
    }

    async loading_dismiss() {
        this.loader = false;
        return await this.loadingController.dismiss();
    }

    async handle_response(response: any, attribute: string = null): Promise<Object | Boolean >{
        if (response.error) {
            this.toast('danger', response.error_message)
            return false
        }
        return response[attribute] || false;
    }

}
