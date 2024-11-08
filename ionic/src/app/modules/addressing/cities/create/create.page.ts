import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CityService } from '../city.service';
import { HelperService } from 'src/app/base/helper.service';
import { City } from '../city';

@Component({
    templateUrl: './create.page.html',
    styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
    public id: number;
    public city: City = new City();
    public editing: boolean = false;
    public sending_data: boolean = false;

    constructor(
        private cityService: CityService,
        private helperService: HelperService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        //
    }

    ionViewWillEnter() {
        this.id = this.route.snapshot.paramMap.get('id')
            ? parseInt(this.route.snapshot.paramMap.get('id'))
            : null;

        if (this.id) {
            this.getCity();
        }
    }

    ngOnInit() {
        //
    }

    getCity() {
        this.cityService.find([], { id: this.id }).then(
            (data: any) => {
                this.city = new City(data.city);
            },
            (error: any) => this.helperService.responseErrors(error)
        );
    }

    save() {
        this.sending_data = true;
        this.cityService.storeOrUpdate(this.city).then(
            (response: any) => {
                this.sending_data = false;
                if (!response.error) {
                    this.router.navigate(['cities'], {
                        state: { force: true },
                    });
                }

                this.helperService.toast(
                    response.erorr ? 'danger' : 'success',
                    response.message
                );
            },
            (error: any) => {
                this.sending_data = false;
                this.helperService.responseErrors(error);
            }
        );
    }
}
