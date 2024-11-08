import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/base/base.service';

@Injectable({
    providedIn: 'root'
})
export class AddressService extends BaseService {
    prefix = 'api';
    url = 'addresses';

    constructor(injector: Injector) {
        super(injector);
    }

    viacep(cep: string, callback) {

        if (!cep) {
            return callback({
                error: true,
                message: 'Por favor preencha o campo "CEP" para buscar o endereço.'
            });
        }

        if (cep.length != 8) {
            return callback({
                error: true,
                message: 'O cep inserido é inválido.'
            });
        }

        return this.http.get(
            'https://viacep.com.br/ws/' + cep + '/json',
        ).toPromise().then(
            (response: any) => {
                if (response.erro && response.erro === true) {
                    callback({
                        error: true,
                        message: 'Nenhum endereço encontrado com o cep inserido.'
                    });
                } else {
                    callback({
                        error: false,
                        data: response
                    });
                }
            },
            (error: any) => callback({
                error: true,
                data: error
            }),
        );
    }
}
