import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'iot-client';
  lastTimeFed = '';
  amount = 0;

  constructor(private db: AngularFireDatabase) {}
  ngOnInit(): void {
    this.db.object('last_time_fed').valueChanges()
    .subscribe(x => {
      let date = new Date(x as string);
      this.lastTimeFed = date.toLocaleString();
    });
    this.db.object('amount').valueChanges()
    .subscribe(x => {
      this.amount = x as number
    })
  }
  feedFish() {
    this.db.object('should_feed').set(true);
    this.db.object('last_time_fed').set(new Date().toString());
  }
  resetAmount() {
    this.db.object('amount').set(0);
  }
}
