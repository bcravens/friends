import { createAction, props } from '@ngrx/store';

import { Friend } from '../friends.model';

export const addFriend = createAction(
  '[Friend List] Add Friend',
  props<{ friend: Friend }>()
);

export const removeFriend = createAction(
  '[Friend List] Remove Friend',
  props<{ friendId: string }>()
);
