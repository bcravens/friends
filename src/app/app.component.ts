import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Friend } from './friends.model';
import { AppState } from './state/app.state';
import * as FriendsActions from './state/friends.actions';
import { selectAllFriends } from './state/friends.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  friends$: Observable<Friend[]> = this.store.pipe(select(selectAllFriends));

  constructor(private store: Store<AppState>) {}

  onAddFriend(): void {
    this.store.dispatch(FriendsActions.addFriend());
  }

  onNameChange(name: string, id: string): void {
    this.store.dispatch(FriendsActions.nameChange({ id, name }));
  }

  onAgeChange(age: number, id: string): void {
    this.store.dispatch(FriendsActions.ageChange({ id, age }));
  }

  onWeightChange(weight: number, id: string): void {
    this.store.dispatch(FriendsActions.weightChange({ id, weight }));
  }

  onSubFriendsChange(friends: string[], id: string): void {
    this.store.dispatch(FriendsActions.subFriendsChange({ id, friends }));
  }

  trackByFn(index: number): number {
    return index;
  }
}
