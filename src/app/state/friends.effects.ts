import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ofType, Actions, createEffect } from '@ngrx/effects';
import { tap, map } from 'rxjs/operators';

import * as FriendActions from './friends.actions';

@Injectable()
export class FriendEffects {
  constructor(private actions$: Actions) {}

  logActions$ = createEffect(
    () => this.actions$.pipe(tap((action) => console.log(action))),
    { dispatch: false }
  );
}
