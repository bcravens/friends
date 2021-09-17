import { createReducer, on } from '@ngrx/store';

import { Friend } from '../friends.model';
import { addFriend, removeFriend } from './friends.actions';

export const initialState: Friend[] = [];

export const friendsReducer = createReducer(
  initialState,
  on(addFriend, (state, { friend }) => [...state, friend]),
  on(removeFriend, (state, { friendId }) =>
    state.filter((friend: Friend) => friend.id !== friendId)
  )
);
