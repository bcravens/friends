import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { friendsReducer } from './state/friends.reducer';
import { FriendFormComponent } from './components/friend-form/friend-form.component';
import { MaterialModule } from './material/material.module';
import { ConnectFormDirective } from './connect-form.directive';
import { environment } from '../environments/environment';
import { ChartComponent } from './components/chart/chart.component';
import { NodesPipe } from './nodes.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FriendFormComponent,
    ConnectFormDirective,
    ChartComponent,
    NodesPipe,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ friends: friendsReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
