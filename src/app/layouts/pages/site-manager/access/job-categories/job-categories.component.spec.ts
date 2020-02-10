/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JobCategoriesComponent } from './job-categories.component';

describe('JobCategoriesComponent', () => {
  let component: JobCategoriesComponent;
  let fixture: ComponentFixture<JobCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
