import { Directive, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { Friend } from './friends.model';
import { AppState } from './state/app.state';
import { selectFriendsExcluding } from './state/friends.selectors';

@Directive({ selector: '[connectForm]', exportAs: 'connectForm' })
export class ConnectFormDirective implements OnDestroy {
  @Input() connectForm: Friend | null = null;

  private _ngDestroy$ = new Subject<void>();
  ngDestroy$ = this._ngDestroy$.asObservable();

  form: FormGroup = this.fb.group({
    name: ['', { validators: [Validators.required] }],
    age: ['', { validators: [Validators.required] }],
    weight: ['', { validators: [Validators.required] }],
    friends: [[]],
  });

  availableFriends: Friend[] | undefined;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  ngOnInit() {
    this.store
      .select(selectFriendsExcluding({ id: this.connectForm?.id }))
      .pipe(
        map((friends: Friend[]) => friends.filter((friend) => friend.name)),
        takeUntil(this.ngDestroy$)
      )
      .subscribe((friends: Friend[]) => {
        this.availableFriends = friends;
      });
  }

  ngOnDestroy(): void {
    this._ngDestroy$.next();
    this._ngDestroy$.complete();
  }
}
