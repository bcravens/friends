import { createSelector, createFeatureSelector } from '@ngrx/store';

import { Friend } from '../friends.model';
import { FriendState } from './friend.state';
import { adapter } from './friends.reducer';

const { selectAll } = adapter.getSelectors();

export const selectFriendsState = createFeatureSelector<FriendState>('friends');

export const selectAllFriends = createSelector(selectFriendsState, selectAll);

export const selectFriendsExcluding = (props: { id: string | undefined }) =>
  createSelector(selectAllFriends, (friends: Friend[]) => {
    return friends.filter((friend: Friend) => friend.id !== props.id);
  });
