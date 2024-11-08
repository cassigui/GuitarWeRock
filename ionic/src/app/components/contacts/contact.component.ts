import { OnInit, Component, Input, ViewChild } from '@angular/core';
import { HelperService } from 'src/app/base/helper.service';
import { Contact } from 'src/app/modules/contacts/contact';
import { ContactService } from 'src/app/modules/contacts/contact.service';

@Component({
    selector: 'contact',
    templateUrl: './contact.component.html',
})
export class ContactComponent implements OnInit {
    @Input() contact = new Contact();

    @ViewChild('number', {static: false}) number: any;
    constructor(
        private helperService: HelperService,
        private contactService: ContactService
    ) {}

    ngOnInit() {
        this.init();
    }
    
    async init(){
    }
}
