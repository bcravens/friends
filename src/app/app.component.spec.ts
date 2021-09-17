import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { SpectatorHost, createHostFactory } from '@ngneat/spectator/jest';
import { AppComponent } from './app.component';

@Component({
  selector: 'app-test-host',
  template: ``,
})
class HostComponent {}

describe('AppComponent', () => {
  const createHost = createHostFactory({
    component: AppComponent,
    host: HostComponent,
    schemas: [NO_ERRORS_SCHEMA],
  });
  let spectator: SpectatorHost<AppComponent, HostComponent>;

  beforeEach(() => {
    spectator = createHost('<app-root></app-root>');
  });

  test('should exist', () => {
    expect(spectator).toExist();
  });
});
