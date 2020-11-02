import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluginTesterComponent } from './plugin-tester.component';

describe('PluginTesterComponent', () => {
  let component: PluginTesterComponent;
  let fixture: ComponentFixture<PluginTesterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PluginTesterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PluginTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
