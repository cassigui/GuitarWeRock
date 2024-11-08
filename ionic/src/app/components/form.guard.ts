import { Injectable } from '@angular/core';
import { CanDeactivate, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Injectable({
    providedIn: 'root',
})
export class FormGuard implements CanDeactivate<any> {
    constructor(
        private alertController: AlertController,
        private router: Router
    ) {}

    async canDeactivate(): Promise<any> {
        return true;
        var current = this.router.getCurrentNavigation();

        if (
            current.extras &&
            current.extras.state &&
            current.extras.state.force
        ) {
            return true;
        }

        return await this.confirmLeave();
    }

    async confirmLeave(): Promise<Boolean> {
        let resolveLeaving;
        const canLeave = new Promise<Boolean>(
            (resolve) => (resolveLeaving = resolve)
        );

        let alert = await this.alertController.create({
            header: 'Sair da página',
            message:
                'Quaisquer informações não salvas serão perdidas, deseja sair mesmo assim ?',
            buttons: [
                {
                    text: 'Continuar na página',
                    cssClass: 'text-primary-i',
                    handler: () => resolveLeaving(false),
                },
                {
                    text: 'Sair',
                    cssClass: 'text-danger-i',
                    handler: () => resolveLeaving(true),
                },
            ],
        });

        await alert.present();

        return canLeave;
    }
}
