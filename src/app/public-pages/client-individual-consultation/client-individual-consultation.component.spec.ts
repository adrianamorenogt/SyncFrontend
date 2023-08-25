import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientIndividualConsultationComponent } from './client-individual-consultation.component';

describe('ClientIndividualConsultationComponent', () => {
  let component: ClientIndividualConsultationComponent;
  let fixture: ComponentFixture<ClientIndividualConsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientIndividualConsultationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientIndividualConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
