import { createAction, props } from '@ngrx/store';

import { Friend } from '../friends.model';

export const addFriend = createAction('[Friend] Add Friend');

export const nameChange = createAction(
  '[Friend] Name Change',
  props<{ id: string; name: string }>()
);

export const ageChange = createAction(
  '[Friend] Age Change',
  props<{ id: string; age: number }>()
);

export const weightChange = createAction(
  '[Friend] Weight Change',
  props<{ id: string; weight: number }>()
);

export const subFriendsChange = createAction(
  '[Friend] Friends Change',
  props<{ id: string; friends: string[] }>()
);

export const submitFriend = createAction(
  '[Friend] Submit Friend',
  props<{ friend: Friend }>()
);
