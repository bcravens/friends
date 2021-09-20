import { selectAllFriends, selectFriendsState } from './friends.selectors';
import { FriendState } from './friend.state';

describe('FriendsSelectors', () => {
  const initialState: FriendState = {
    entities: {
      '1': { id: '1', friends: [] },
      '2': { id: '2', friends: [] },
    },
    ids: ['1', '2'],
  };

  it('should select the friends state', () => {
    const result = selectFriendsState.projector(initialState);
    expect(result).toEqual(initialState);
  });

  it('should select all friends', () => {
    const result = selectAllFriends.projector(initialState);
    expect(result.length).toEqual(2);
    expect(result[0].id).toEqual('1');
    expect(result[1].id).toEqual('2');
  });
});
