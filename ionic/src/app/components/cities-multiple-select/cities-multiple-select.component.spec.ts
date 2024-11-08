import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitiesMultipleSelectComponent } from './cities-multiple-select.component';

describe('CitiesMultipleSelectComponent', () => {
    let component: CitiesMultipleSelectComponent;
    let fixture: ComponentFixture<CitiesMultipleSelectComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CitiesMultipleSelectComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CitiesMultipleSelectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
