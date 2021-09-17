import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Friend } from './friends.model';
import { AppState } from './state/app.state';
import { selectFriends } from './state/friends.selectors';
import { addFriend, removeFriend } from './state/friends.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  friends$: Observable<Friend[]> = this.store.pipe(select(selectFriends));

  constructor(private store: Store<AppState>) {}

  onAddFriend(friend: Friend): void {
    this.store.dispatch(addFriend({ friend }));
  }

  onRemoveFriend(friendId: string): void {
    this.store.dispatch(removeFriend({ friendId }));
  }
}
