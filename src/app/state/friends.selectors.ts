import { createSelector } from '@ngrx/store';

import { Friend } from '../friends.model';
import { AppState } from './app.state';

export const selectFriends = createSelector(
  (state: AppState) => state.friends,
  (friends: Friend[]) => friends
);
