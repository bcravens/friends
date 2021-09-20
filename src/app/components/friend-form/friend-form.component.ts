import {
  Input,
  Output,
  Component,
  EventEmitter,
  AfterViewInit,
} from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Friend } from 'src/app/friends.model';

@Component({
  selector: 'app-friend-form',
  templateUrl: './friend-form.component.html',
  styleUrls: ['./friend-form.component.scss'],
})
export class FriendFormComponent implements AfterViewInit {
  @Input() form: FormGroup | null = null;

  @Input() availableFriends: Friend[] | undefined = [];

  @Output() nameChange = new EventEmitter<string>();

  @Output() ageChange = new EventEmitter<number>();

  @Output() weightChange = new EventEmitter<number>();

  @Output() subFriendsChange = new EventEmitter<string[]>();

  private ngDestory = new Subject<void>();

  ngAfterViewInit(): void {
    if (this.form) {
      this.registerControlListener<string>(
        this.form.controls.name,
        this.nameChange
      );

      this.registerControlListener<number>(
        this.form.controls.age,
        this.ageChange
      );

      this.registerControlListener<number>(
        this.form.controls.weight,
        this.weightChange
      );

      this.registerControlListener<string[]>(
        this.form.controls.friends,
        this.subFriendsChange
      );
    }
  }

  ngOnDestroy(): void {
    this.ngDestory.next();
    this.ngDestory.complete();
  }

  getFriendById(id: string): Friend | undefined {
    return this.availableFriends?.find((f) => f.id === id);
  }

  private registerControlListener<T>(
    control: AbstractControl,
    event: EventEmitter<T>
  ): void {
    control.valueChanges
      .pipe(debounceTime(300), takeUntil(this.ngDestory))
      .subscribe((value: T) => event.emit(value));
  }
}
