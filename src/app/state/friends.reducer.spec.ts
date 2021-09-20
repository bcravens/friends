import * as fromReducer from './friends.reducer';
import * as FriendActions from './friends.actions';
import { FriendState } from './friend.state';

describe('FriendsRudcer', () => {
  describe('addFriend action', () => {
    it('should create a new friend an id and friends list then update the state', () => {
      const { initialState } = fromReducer;
      const newState: FriendState = {
        entities: { '1': { friends: [], id: '1' } },
        ids: ['1'],
      };
      const action = FriendActions.addFriend();
      const state = fromReducer.friendsReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('nameChange action', () => {
    it('should update name state in an immutable way', () => {
      const initialState: FriendState = {
        entities: { '1': { friends: [], id: '1' } },
        ids: ['1'],
      };
      const newState: FriendState = {
        entities: { '1': { friends: [], id: '1', name: 'foo-bar' } },
        ids: ['1'],
      };

      const action = FriendActions.nameChange({ id: '1', name: 'foo-bar' });
      const state = fromReducer.friendsReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('ageChange action', () => {
    it('should update weight state in an immutable way', () => {
      const initialState: FriendState = {
        entities: { '1': { friends: [], id: '1' } },
        ids: ['1'],
      };
      const newState: FriendState = {
        entities: { '1': { friends: [], id: '1', age: 21 } },
        ids: ['1'],
      };

      const action = FriendActions.ageChange({ id: '1', age: 21 });
      const state = fromReducer.friendsReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('weightChange action', () => {
    it('should update weight state in an immutable way', () => {
      const initialState: FriendState = {
        entities: { '1': { friends: [], id: '1' } },
        ids: ['1'],
      };
      const newState: FriendState = {
        entities: { '1': { friends: [], id: '1', weight: 100 } },
        ids: ['1'],
      };

      const action = FriendActions.weightChange({ id: '1', weight: 100 });
      const state = fromReducer.friendsReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('subFriendsChange action', () => {
    it('should update friends state in an immutable way', () => {
      const initialState: FriendState = {
        entities: {
          '1': { id: '1', friends: [] },
          '2': { id: '2', friends: [] },
        },
        ids: ['1', '2'],
      };
      const newState: FriendState = {
        entities: {
          '1': { id: '1', friends: ['2'] },
          '2': { id: '2', friends: [] },
        },
        ids: ['1', '2'],
      };

      const action = FriendActions.subFriendsChange({
        id: '1',
        friends: ['2'],
      });
      const state = fromReducer.friendsReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });
});
