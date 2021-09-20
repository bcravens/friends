import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpectatorHost, createHostFactory } from '@ngneat/spectator/jest';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { NodesPipe } from './nodes.pipe';
import { AppComponent } from './app.component';
import { FriendState } from './state/friend.state';
import { ConnectFormDirective } from './connect-form.directive';
import { FriendFormComponent } from './components/friend-form/friend-form.component';

@Component({
  selector: 'app-test-host',
  template: ``,
})
class HostComponent {}

describe('AppComponent', () => {
  let store: MockStore;
  const initialState: FriendState = {
    entities: {
      '1': { id: '1', friends: [] },
      '2': { id: '2', friends: [] },
    },
    ids: ['1', '2'],
  };

  const createHost = createHostFactory({
    component: AppComponent,
    host: HostComponent,
    imports: [FormsModule, ReactiveFormsModule],
    declarations: [
      ConnectFormDirective,
      FriendFormComponent,
      ConnectFormDirective,
      NodesPipe,
    ],
    schemas: [NO_ERRORS_SCHEMA],
    providers: [provideMockStore({ initialState })],
  });
  let spectator: SpectatorHost<AppComponent, HostComponent>;

  beforeEach(() => {
    spectator = createHost('<app-root></app-root>');
    store = spectator.inject(MockStore);
  });

  test('should exist', () => {
    expect(spectator).toExist();
  });
});
