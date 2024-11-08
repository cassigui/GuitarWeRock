import { OnInit, Component, Input, ViewChild } from '@angular/core';
import { City } from './cities/city';
import { StateService } from './states/state.service';
import { CityService } from './cities/city.service';
import { State } from './states/state';
import { Address } from './addresses/address';
import { AddressService } from './addresses/address.service';
import { HelperService } from 'src/app/base/helper.service';
import { SelectComponent } from 'src/app/components/select/select.component';
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'address-form',
    templateUrl: './address-form.component.html',
    providers: [StateService, CityService],
})
export class AddressFormComponent implements OnInit {
    @Input() address = new Address();
    @Input() disabled = false;
    @Input() is_customer = false;

    @ViewChild('number', {static: false}) number: any;

    public cities: City[] = [];
    public states: State[] = [];
    public state: State;

    public searching_city: boolean = false;
    public searching_cep: boolean = false;

    compareWithFn = (o1, o2) => {
        return o1 && o2 ? o1.id === o2.id : o1 === o2;
    };

    constructor(
        private addressService: AddressService,
        private helperService: HelperService,
        private modalController: ModalController,
        private stateService: StateService,
        private cityService: CityService
    ) {}

    ngOnInit() {
        this.init();
    }
    
    async init(){
        await this.getStates();
        await this.getCities(this.address.city_id);
    }

    async getStates() {
        this.stateService
            .get(['country'], { orderBy: 'name' })
            .then((response: any) => {
                if (!response.error) {
                    this.states = response.states.map(
                        (state) => new State(state)
                    );
                    this.setStateIfExists();
                }
            });
    }

    async setStateIfExists() {
        if (!this.address) {
            return;
        }

        if (this.address.city) {
            var index = this.states.findIndex(
                (state) => state.id == this.address.city.state.id
            );

            if (index > -1) {
                this.state = this.states[index];
                await this.getCities(this.address.city.id);
            }
        }
    }

    async getCities(city_id = null) {
        this.searching_city = true;
        var wheres: any;
        var state_id = this.state ? this.state.id : null;
        if (state_id) {
            wheres = {
                state_id: state_id,
            };
        } else {
            wheres = {};
        }
        this.address.city = null;
        await this.cityService.get(['state'], wheres).then(
            (response: any) => {
                this.searching_city = false;
                if (!response.error) {
                    this.cities = response.cities.map((city) => new City(city));
                    if (city_id) {
                        this.address.city = this.cities.find(
                            (city) => city.id == city_id
                        );
                    }
                }
            },
            (error: any) => {
                this.searching_city = false;
                this.cities = [];
            }
        );
    }

    async selectCity() {
        this.helperService.loading('Carregando');

        if (this.disabled) {
            return;
        }

        if (this.cities.length == 0) {
            await this.setStateIfExists();
        }

        const modal = await this.modalController.create({
            component: SelectComponent,
            componentProps: {
                title: 'Cidades',
                options: this.cities,
            },
        });

        await modal.present().then(
            response => {
                this.helperService.loading_dismiss();
            }
        )
        const { data } = await modal.onWillDismiss();

        if (data) {
            this.address.serialize({ city: data });
            this.address.city_id = data.id;
        }
    }

    async selectState() {
        if (this.disabled) {
            return;
        }

        const modal = await this.modalController.create({
            component: SelectComponent,
            componentProps: {
                title: 'Estados',
                options: this.states,
            },
        });

        await modal.present();

        const { data } = await modal.onWillDismiss();

        if (data) {
            this.state = data;
            this.getCities();
        }
    }

    searchCep() {
        if (this.disabled) {
            return;
        }

        this.searching_cep = true;
        this.addressService.viacep(this.address.cep, (response) => {
            this.searching_cep = false;
            if (response.error) {
                this.helperService.toast('warning', response.message);
            } else {
                this.parseViacep(response.data);
            }
        });
    }

    parseViacep(data) {
        var state = this.states.find((state) => state.initials == data.uf);
        this.address.street = data.logradouro;
        this.address.district = data.bairro;

        var city = this.cities.find((city) => city.code == data.ibge);

        if (city) {
            this.address.city = city;
            this.address.city_id = city.id;
        } else if (state) {
            this.state = state;
            this.getCities(data.ibge);
        }

        this.number.setFocus();
    }

    verifyCep(){
        if(this.address.cep){
            this.searchCep();
        }
    }
}
