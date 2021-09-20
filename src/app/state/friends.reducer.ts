import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { Friend } from '../friends.model';
import { FriendState } from './friend.state';
import * as FriendActions from './friends.actions';

export const adapter: EntityAdapter<Friend> = createEntityAdapter<Friend>();

export const initialState: FriendState = adapter.getInitialState();

export const friendsReducer = createReducer(
  initialState,

  on(FriendActions.addFriend, (state) => {
    const id = (Object.keys(state.entities).length + 1).toString();
    return adapter.addOne({ id, friends: [] }, state);
  }),

  on(FriendActions.nameChange, (state, { id, name }) => {
    return adapter.updateOne({ id, changes: { name } }, state);
  }),

  on(FriendActions.ageChange, (state, { id, age }) => {
    return adapter.updateOne({ id, changes: { age } }, state);
  }),

  on(FriendActions.weightChange, (state, { id, weight }) => {
    return adapter.updateOne({ id, changes: { weight } }, state);
  }),

  on(FriendActions.subFriendsChange, (state, { id, friends }) => {
    return adapter.updateOne({ id, changes: { friends } }, state);
  })
);
