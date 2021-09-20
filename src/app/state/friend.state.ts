import { EntityState } from '@ngrx/entity';

import { Friend } from '../friends.model';

export interface FriendState extends EntityState<Friend> {}
