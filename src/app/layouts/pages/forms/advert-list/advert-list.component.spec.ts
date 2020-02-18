/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdvertListComponent } from './advert-list.component';

describe('AdvertListComponent', () => {
  let component: AdvertListComponent;
  let fixture: ComponentFixture<AdvertListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
