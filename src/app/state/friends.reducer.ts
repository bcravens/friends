import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { v4 as uuidv4 } from 'uuid';

import { Friend } from '../friends.model';
import { FriendState } from './friend.state';
import * as FriendActions from './friends.actions';

export const adapter: EntityAdapter<Friend> = createEntityAdapter<Friend>();

export const initialState: FriendState = adapter.getInitialState();

export const friendsReducer = createReducer(
  initialState,

  on(FriendActions.addFriend, (state) => {
    return adapter.addOne({ id: uuidv4(), friends: [] }, state);
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
  }),

  on(FriendActions.submitFriend, (state, { friend }) => {
    return adapter.addOne(friend, state);
  })
);
